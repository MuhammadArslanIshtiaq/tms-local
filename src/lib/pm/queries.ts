import "server-only";
import { ensureSchema, sql } from "./db";
import type {
  ChecklistItem,
  Member,
  Project,
  ProjectColor,
  Task,
  TaskPriority,
  TaskStatus,
} from "./types";

type MemberRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  job_title: string | null;
  created_at: Date;
};

const toMember = (row: MemberRow): Member => ({
  id: row.id,
  name: row.name,
  email: row.email,
  role: row.role === "admin" ? "admin" : "member",
  jobTitle: row.job_title,
  createdAt: row.created_at.toISOString(),
});

/* -------------------------------------------------------------------------- */
/* Members                                                                     */
/* -------------------------------------------------------------------------- */

export const listMembers = async (): Promise<Member[]> => {
  await ensureSchema();
  const rows = await sql<MemberRow[]>`
    SELECT id, name, email, role, job_title, created_at
    FROM pm_users
    ORDER BY role = 'admin' DESC, name ASC
  `;
  return rows.map(toMember);
};

export const findUserByEmail = async (email: string) => {
  await ensureSchema();
  const [row] = await sql<
    { id: string; name: string; email: string; role: string; password_hash: string }[]
  >`
    SELECT id, name, email, role, password_hash
    FROM pm_users
    WHERE email = ${email.trim().toLowerCase()}
    LIMIT 1
  `;
  return row ?? null;
};

export const createMember = async (input: {
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "member";
  jobTitle?: string | null;
}): Promise<Member> => {
  await ensureSchema();
  const [row] = await sql<MemberRow[]>`
    INSERT INTO pm_users (name, email, password_hash, role, job_title)
    VALUES (
      ${input.name},
      ${input.email.trim().toLowerCase()},
      ${input.passwordHash},
      ${input.role},
      ${input.jobTitle ?? null}
    )
    RETURNING id, name, email, role, job_title, created_at
  `;
  return toMember(row);
};

export const emailExists = async (email: string): Promise<boolean> => {
  await ensureSchema();
  const [row] = await sql<{ id: string }[]>`
    SELECT id FROM pm_users WHERE email = ${email.trim().toLowerCase()} LIMIT 1
  `;
  return Boolean(row);
};

export const deleteMember = async (id: string): Promise<void> => {
  await ensureSchema();
  await sql`DELETE FROM pm_users WHERE id = ${id}`;
};

export const updateMemberPassword = async (
  id: string,
  passwordHash: string
): Promise<void> => {
  await ensureSchema();
  await sql`UPDATE pm_users SET password_hash = ${passwordHash} WHERE id = ${id}`;
};

/* -------------------------------------------------------------------------- */
/* Projects                                                                    */
/* -------------------------------------------------------------------------- */

type ProjectRow = {
  id: string;
  name: string;
  description: string | null;
  color: string;
  is_archived: boolean;
  created_at: Date;
  task_count: string;
  done_count: string;
  members: MemberRow[] | null;
};

const toProject = (row: ProjectRow): Project => ({
  id: row.id,
  name: row.name,
  description: row.description,
  color: row.color as ProjectColor,
  isArchived: row.is_archived,
  createdAt: row.created_at.toISOString(),
  taskCount: Number(row.task_count),
  doneCount: Number(row.done_count),
  members: (row.members ?? []).map((m) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    role: m.role === "admin" ? "admin" : "member",
    jobTitle: m.job_title,
    createdAt:
      m.created_at instanceof Date
        ? m.created_at.toISOString()
        : String(m.created_at),
  })),
});

/** Fresh fragment per call — postgres.js query objects are not reusable. */
const projectSelect = () => sql`
  SELECT
    p.id,
    p.name,
    p.description,
    p.color,
    p.is_archived,
    p.created_at,
    (SELECT count(*) FROM pm_tasks t WHERE t.project_id = p.id) AS task_count,
    (SELECT count(*) FROM pm_tasks t WHERE t.project_id = p.id AND t.status = 'done') AS done_count,
    COALESCE(
      (
        SELECT json_agg(
          json_build_object(
            'id', u.id, 'name', u.name, 'email', u.email,
            'role', u.role, 'job_title', u.job_title, 'created_at', u.created_at
          ) ORDER BY u.name
        )
        FROM pm_project_members pmm
        JOIN pm_users u ON u.id = pmm.user_id
        WHERE pmm.project_id = p.id
      ),
      '[]'::json
    ) AS members
  FROM pm_projects p
`;

export const listProjects = async (): Promise<Project[]> => {
  await ensureSchema();
  const rows = await sql<ProjectRow[]>`
    ${projectSelect()}
    ORDER BY p.is_archived ASC, p.created_at DESC
  `;
  return rows.map(toProject);
};

export const getProject = async (id: string): Promise<Project | null> => {
  await ensureSchema();
  const rows = await sql<ProjectRow[]>`
    ${projectSelect()}
    WHERE p.id = ${id}
    LIMIT 1
  `;
  return rows[0] ? toProject(rows[0]) : null;
};

export const createProject = async (input: {
  name: string;
  description?: string | null;
  color: ProjectColor;
  createdBy: string;
  memberIds: string[];
}): Promise<Project> => {
  await ensureSchema();

  const [row] = await sql<{ id: string }[]>`
    INSERT INTO pm_projects (name, description, color, created_by)
    VALUES (${input.name}, ${input.description ?? null}, ${input.color}, ${input.createdBy})
    RETURNING id
  `;

  await setProjectMembers(row.id, input.memberIds);

  const project = await getProject(row.id);
  if (!project) throw new Error("Project could not be created.");
  return project;
};

export const updateProject = async (
  id: string,
  input: { name: string; description: string | null; color: ProjectColor }
): Promise<void> => {
  await ensureSchema();
  await sql`
    UPDATE pm_projects
    SET name = ${input.name},
        description = ${input.description},
        color = ${input.color}
    WHERE id = ${id}
  `;
};

export const setProjectArchived = async (
  id: string,
  archived: boolean
): Promise<void> => {
  await ensureSchema();
  await sql`UPDATE pm_projects SET is_archived = ${archived} WHERE id = ${id}`;
};

export const deleteProject = async (id: string): Promise<void> => {
  await ensureSchema();
  await sql`DELETE FROM pm_projects WHERE id = ${id}`;
};

export const setProjectMembers = async (
  projectId: string,
  memberIds: string[]
): Promise<void> => {
  await ensureSchema();
  await sql`DELETE FROM pm_project_members WHERE project_id = ${projectId}`;

  if (memberIds.length === 0) return;

  const unique = [...new Set(memberIds)];
  await sql`
    INSERT INTO pm_project_members ${sql(
      unique.map((userId) => ({ project_id: projectId, user_id: userId })),
      "project_id",
      "user_id"
    )}
    ON CONFLICT DO NOTHING
  `;
};

/* -------------------------------------------------------------------------- */
/* Tasks                                                                       */
/* -------------------------------------------------------------------------- */

type TaskRow = {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  due_date: Date | null;
  position: number;
  assignee_id: string | null;
  assignee_name: string | null;
  assignee_email: string | null;
  checklist:
    | { id: string; content: string; is_done: boolean; position: number }[]
    | null;
};

const toTask = (row: TaskRow): Task => ({
  id: row.id,
  projectId: row.project_id,
  title: row.title,
  description: row.description,
  status: row.status as TaskStatus,
  priority: row.priority as TaskPriority,
  dueDate: row.due_date ? toDateString(row.due_date) : null,
  position: Number(row.position),
  assignee:
    row.assignee_id && row.assignee_name
      ? {
          id: row.assignee_id,
          name: row.assignee_name,
          email: row.assignee_email ?? "",
        }
      : null,
  checklist: (row.checklist ?? []).map((item) => ({
    id: item.id,
    taskId: row.id,
    content: item.content,
    isDone: item.is_done,
    position: Number(item.position),
  })),
});

const toDateString = (value: Date | string): string =>
  typeof value === "string" ? value.slice(0, 10) : value.toISOString().slice(0, 10);

export const listTasks = async (projectId: string): Promise<Task[]> => {
  await ensureSchema();
  const rows = await sql<TaskRow[]>`
    SELECT
      t.id, t.project_id, t.title, t.description, t.status, t.priority,
      t.due_date, t.position, t.assignee_id,
      u.name AS assignee_name,
      u.email AS assignee_email,
      COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'id', c.id, 'content', c.content,
              'is_done', c.is_done, 'position', c.position
            ) ORDER BY c.position, c.created_at
          )
          FROM pm_checklist_items c
          WHERE c.task_id = t.id
        ),
        '[]'::json
      ) AS checklist
    FROM pm_tasks t
    LEFT JOIN pm_users u ON u.id = t.assignee_id
    WHERE t.project_id = ${projectId}
    ORDER BY t.position ASC, t.created_at ASC
  `;
  return rows.map(toTask);
};

export const createTask = async (input: {
  projectId: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string | null;
  dueDate: string | null;
}): Promise<Task> => {
  await ensureSchema();

  const [{ next }] = await sql<{ next: number }[]>`
    SELECT COALESCE(MAX(position), 0) + 1000 AS next
    FROM pm_tasks
    WHERE project_id = ${input.projectId} AND status = ${input.status}
  `;

  const [row] = await sql<{ id: string }[]>`
    INSERT INTO pm_tasks
      (project_id, title, description, status, priority, assignee_id, due_date, position)
    VALUES (
      ${input.projectId}, ${input.title}, ${input.description ?? null},
      ${input.status}, ${input.priority}, ${input.assigneeId},
      ${input.dueDate}, ${Number(next)}
    )
    RETURNING id
  `;

  const task = await getTask(row.id);
  if (!task) throw new Error("Task could not be created.");
  return task;
};

export const getTask = async (id: string): Promise<Task | null> => {
  await ensureSchema();
  const rows = await sql<TaskRow[]>`
    SELECT
      t.id, t.project_id, t.title, t.description, t.status, t.priority,
      t.due_date, t.position, t.assignee_id,
      u.name AS assignee_name,
      u.email AS assignee_email,
      COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'id', c.id, 'content', c.content,
              'is_done', c.is_done, 'position', c.position
            ) ORDER BY c.position, c.created_at
          )
          FROM pm_checklist_items c
          WHERE c.task_id = t.id
        ),
        '[]'::json
      ) AS checklist
    FROM pm_tasks t
    LEFT JOIN pm_users u ON u.id = t.assignee_id
    WHERE t.id = ${id}
    LIMIT 1
  `;
  return rows[0] ? toTask(rows[0]) : null;
};

export const updateTask = async (
  id: string,
  input: {
    title: string;
    description: string | null;
    priority: TaskPriority;
    assigneeId: string | null;
    dueDate: string | null;
  }
): Promise<void> => {
  await ensureSchema();
  await sql`
    UPDATE pm_tasks
    SET title = ${input.title},
        description = ${input.description},
        priority = ${input.priority},
        assignee_id = ${input.assigneeId},
        due_date = ${input.dueDate},
        updated_at = now()
    WHERE id = ${id}
  `;
};

/** Moves a task to a status, placing it between its new neighbours. */
export const moveTask = async (
  id: string,
  status: TaskStatus,
  position: number
): Promise<void> => {
  await ensureSchema();
  await sql`
    UPDATE pm_tasks
    SET status = ${status}, position = ${position}, updated_at = now()
    WHERE id = ${id}
  `;
};

export const deleteTask = async (id: string): Promise<void> => {
  await ensureSchema();
  await sql`DELETE FROM pm_tasks WHERE id = ${id}`;
};

/* -------------------------------------------------------------------------- */
/* Checklist                                                                   */
/* -------------------------------------------------------------------------- */

export const addChecklistItem = async (
  taskId: string,
  content: string
): Promise<ChecklistItem> => {
  await ensureSchema();

  const [{ next }] = await sql<{ next: number }[]>`
    SELECT COALESCE(MAX(position), 0) + 1000 AS next
    FROM pm_checklist_items
    WHERE task_id = ${taskId}
  `;

  const [row] = await sql<
    { id: string; content: string; is_done: boolean; position: number }[]
  >`
    INSERT INTO pm_checklist_items (task_id, content, position)
    VALUES (${taskId}, ${content}, ${Number(next)})
    RETURNING id, content, is_done, position
  `;

  return {
    id: row.id,
    taskId,
    content: row.content,
    isDone: row.is_done,
    position: Number(row.position),
  };
};

export const setChecklistItemDone = async (
  id: string,
  isDone: boolean
): Promise<void> => {
  await ensureSchema();
  await sql`UPDATE pm_checklist_items SET is_done = ${isDone} WHERE id = ${id}`;
};

export const deleteChecklistItem = async (id: string): Promise<void> => {
  await ensureSchema();
  await sql`DELETE FROM pm_checklist_items WHERE id = ${id}`;
};

/* -------------------------------------------------------------------------- */
/* Dashboard                                                                   */
/* -------------------------------------------------------------------------- */

export type MyTask = Task & { projectName: string; projectColor: ProjectColor };

export const listTasksForUser = async (userId: string): Promise<MyTask[]> => {
  await ensureSchema();
  const rows = await sql<(TaskRow & { project_name: string; project_color: string })[]>`
    SELECT
      t.id, t.project_id, t.title, t.description, t.status, t.priority,
      t.due_date, t.position, t.assignee_id,
      u.name AS assignee_name,
      u.email AS assignee_email,
      p.name AS project_name,
      p.color AS project_color,
      '[]'::json AS checklist
    FROM pm_tasks t
    JOIN pm_projects p ON p.id = t.project_id
    LEFT JOIN pm_users u ON u.id = t.assignee_id
    WHERE t.assignee_id = ${userId} AND t.status <> 'done' AND p.is_archived = false
    ORDER BY
      CASE WHEN t.due_date IS NULL THEN 1 ELSE 0 END,
      t.due_date ASC,
      t.position ASC
    LIMIT 12
  `;

  return rows.map((row) => ({
    ...toTask(row),
    projectName: row.project_name,
    projectColor: row.project_color as ProjectColor,
  }));
};
