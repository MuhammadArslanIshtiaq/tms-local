import "server-only";
import postgres from "postgres";

/**
 * A single pooled Postgres client, cached across hot reloads in development
 * and across warm serverless invocations in production.
 */
const globalForDb = globalThis as unknown as {
  pmSql?: ReturnType<typeof postgres>;
  pmSchemaReady?: Promise<void>;
};

const connectionString = process.env.DATABASE_URL;

const createClient = () => {
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local (see .env.example)."
    );
  }

  const isLocal =
    connectionString.includes("localhost") ||
    connectionString.includes("127.0.0.1");

  return postgres(connectionString, {
    ssl: isLocal ? false : "require",
    max: isLocal ? 10 : 1,
    idle_timeout: 20,
    connect_timeout: 15,
    /* Required for pgBouncer / Supabase transaction pooling. */
    prepare: false,
    /* "already exists, skipping" is expected — ensureSchema is idempotent. */
    onnotice: (notice) => {
      if (notice.code !== "42P07" && notice.code !== "42P06") {
        console.warn(`[db] ${notice.message}`);
      }
    },
  });
};

type Sql = ReturnType<typeof postgres>;

let client: Sql | null = null;

const getClient = (): Sql => {
  if (client) return client;
  client = globalForDb.pmSql ?? createClient();
  if (process.env.NODE_ENV !== "production") globalForDb.pmSql = client;
  return client;
};

/**
 * Lazily-connected client. The connection is only opened on first query, so
 * `next build` (which evaluates these modules while collecting page data)
 * succeeds even when DATABASE_URL is absent from the build environment.
 */
export const sql = new Proxy(function () {} as unknown as Sql, {
  apply: (_target, _thisArg, args: unknown[]) =>
    (getClient() as unknown as (...a: unknown[]) => unknown)(...args),
  get: (_target, prop: string | symbol) => {
    const instance = getClient() as unknown as Record<
      string | symbol,
      unknown
    >;
    const value = instance[prop];
    return typeof value === "function"
      ? (value as (...a: unknown[]) => unknown).bind(instance)
      : value;
  },
}) as Sql;

/**
 * Creates every table the tool needs, if they do not already exist.
 * Runs at most once per process — the promise is memoised.
 */
export const ensureSchema = (): Promise<void> => {
  globalForDb.pmSchemaReady ??= migrate();
  return globalForDb.pmSchemaReady;
};

const migrate = async (): Promise<void> => {
  await sql`
    CREATE TABLE IF NOT EXISTS pm_users (
      id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name          text NOT NULL,
      email         text NOT NULL UNIQUE,
      password_hash text NOT NULL,
      role          text NOT NULL DEFAULT 'member',
      job_title     text,
      created_at    timestamptz NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS pm_projects (
      id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name        text NOT NULL,
      description text,
      color       text NOT NULL DEFAULT 'blue',
      is_archived boolean NOT NULL DEFAULT false,
      created_by  uuid REFERENCES pm_users(id) ON DELETE SET NULL,
      created_at  timestamptz NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS pm_project_members (
      project_id uuid NOT NULL REFERENCES pm_projects(id) ON DELETE CASCADE,
      user_id    uuid NOT NULL REFERENCES pm_users(id) ON DELETE CASCADE,
      added_at   timestamptz NOT NULL DEFAULT now(),
      PRIMARY KEY (project_id, user_id)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS pm_tasks (
      id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      project_id  uuid NOT NULL REFERENCES pm_projects(id) ON DELETE CASCADE,
      title       text NOT NULL,
      description text,
      status      text NOT NULL DEFAULT 'todo',
      priority    text NOT NULL DEFAULT 'medium',
      assignee_id uuid REFERENCES pm_users(id) ON DELETE SET NULL,
      due_date    date,
      position    double precision NOT NULL DEFAULT 1000,
      created_at  timestamptz NOT NULL DEFAULT now(),
      updated_at  timestamptz NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS pm_checklist_items (
      id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      task_id    uuid NOT NULL REFERENCES pm_tasks(id) ON DELETE CASCADE,
      content    text NOT NULL,
      is_done    boolean NOT NULL DEFAULT false,
      position   double precision NOT NULL DEFAULT 1000,
      created_at timestamptz NOT NULL DEFAULT now()
    )
  `;

  await sql`CREATE INDEX IF NOT EXISTS pm_tasks_project_idx ON pm_tasks (project_id, status, position)`;
  await sql`CREATE INDEX IF NOT EXISTS pm_checklist_task_idx ON pm_checklist_items (task_id, position)`;
  await sql`CREATE INDEX IF NOT EXISTS pm_members_user_idx ON pm_project_members (user_id)`;

  await seedAdmin();
};

/** Creates the built-in admin account on first run. */
const seedAdmin = async (): Promise<void> => {
  const email = (process.env.PM_ADMIN_EMAIL ?? "").trim().toLowerCase();
  const password = process.env.PM_ADMIN_PASSWORD ?? "";

  if (!email || !password) return;

  const [existing] = await sql<{ id: string }[]>`
    SELECT id FROM pm_users WHERE email = ${email} LIMIT 1
  `;
  if (existing) return;

  const { hashPassword } = await import("./password");
  const passwordHash = await hashPassword(password);

  await sql`
    INSERT INTO pm_users (name, email, password_hash, role, job_title)
    VALUES ('TMS Admin', ${email}, ${passwordHash}, 'admin', 'Administrator')
    ON CONFLICT (email) DO NOTHING
  `;
};
