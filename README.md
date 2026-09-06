# TMS DigitalHub

Marketing site **and** internal project tracker, built with Next.js 16 (App
Router), React 19, Tailwind CSS v4, Framer Motion, and Postgres.

- `/` — public marketing site
- `/projects` — internal, password-protected project management tool

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server                 |
| `npm run build` | Production build                     |
| `npm run start` | Serve the production build           |
| `npm run lint`  | ESLint                               |

## Configuration

### Environment variables

| Variable                       | Required | Purpose                                                      |
| ------------------------------ | -------- | ------------------------------------------------------------ |
| `DATABASE_URL`                 | Yes      | Postgres connection string for the project tool               |
| `PM_SESSION_SECRET`            | Yes      | Signs the session cookie — use a random string of 32+ chars   |
| `PM_ADMIN_EMAIL`               | Yes      | Seeds the first admin account on first run                    |
| `PM_ADMIN_PASSWORD`            | Yes      | Password for that admin account                               |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | No       | Where the marketing contact forms post                        |

Generate a session secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Database

Any Postgres 13+ works — Neon and Supabase are both good serverless fits. Use
the **pooled** connection string on Vercel.

The schema is created automatically on first request (`ensureSchema()` in
`src/lib/pm/db.ts` runs idempotent `CREATE TABLE IF NOT EXISTS` statements and
seeds the admin account), so there is no migration step to run.

For local development you can run Postgres in Docker:

```bash
docker run -d --name tms-pm-postgres \
  -e POSTGRES_PASSWORD=devpass -e POSTGRES_DB=tms_pm \
  -p 55432:5432 postgres:16-alpine
```

…then set `DATABASE_URL=postgres://postgres:devpass@localhost:55432/tms_pm`.

### Contact forms

The marketing contact forms post through `src/lib/contact.ts`. Set
`NEXT_PUBLIC_CONTACT_ENDPOINT` to a URL that accepts a JSON `POST`; without it
the form falls back to opening the visitor's mail client with the enquiry
pre-filled.

## The project tool (`/projects`)

Everything under `/projects` is gated by `src/proxy.ts`, which checks a signed
JWT session cookie and is excluded from search engines.

**What it does**

- **Projects** — create, edit, colour-code, and archive projects; each card
  shows live task progress and its team.
- **Team** — add people with name, email, password, job title, and role. They
  can immediately sign in with those credentials. Admins can remove people;
  members cannot.
- **Board** — a four-column kanban (To do → In progress → In review → Done).
  Drag cards between columns or reorder within one; the new position is saved
  immediately.
- **Tasks** — title, description, assignee, priority, and due date. Overdue
  dates turn red.
- **Checklists** — break a task into steps and tick them off. Updates are
  optimistic, so they feel instant.
- **Assigned to you** — the dashboard lists your open tasks, soonest due first.

**Roles**

| Capability                | Member | Admin |
| ------------------------- | :----: | :---: |
| Projects, tasks, checklists |   ✅   |  ✅   |
| Add team members          |   ✅   |  ✅   |
| Remove members / delete projects |   —    |  ✅   |

Deep link straight to a task with `/projects/<projectId>?task=<taskId>`.

## Project structure

```
src/
├── app/
│   ├── layout.tsx              Fonts, metadata, JSON-LD, theme bootstrap
│   ├── page.tsx                Marketing home page
│   ├── globals.css             Design tokens + utility layer
│   ├── services/[slug]/        Statically generated service pages
│   ├── privacy-policy/
│   ├── terms-of-service/
│   └── projects/               Internal tool (login, dashboard, board, team)
│       └── actions.ts          Server actions for every mutation
├── components/
│   ├── pm/                     Project-tool UI (board, dialogs, avatars)
│   └── …                       Marketing sections
├── contexts/ThemeContext.tsx   Dark/light theme store
├── data/services.ts            Service catalogue
├── hooks/useSpotlight.ts       Pointer-tracked spotlight custom properties
├── lib/
│   ├── contact.ts              Marketing form validation + submission
│   └── pm/                     Schema, queries, auth, session, types
└── proxy.ts                    Auth gate for /projects
```

## Design system

Tokens live at the top of `src/app/globals.css` and are exposed to Tailwind via
`@theme inline`. Both themes define the same variable names, so components stay
theme-agnostic. The project tool reuses the same tokens as the marketing site.

Key tokens: `--background`, `--foreground`, `--accent`, `--accent-2`,
`--accent-3`, `--surface`, `--line`, `--glow`.

Reusable classes:

- `.shell` — page container and responsive gutters
- `.card`, `.halo` — glass surface and animated gradient border
- `.btn`, `.btn-primary`, `.btn-ghost` — buttons
- `.field` — form inputs
- `.aurora`, `.grid-field`, `.dot-field`, `.grain`, `.spotlight-field` — ambient background layers
- `.text-gradient`, `.eyebrow`, `.link-underline` — typography treatments

All motion is disabled under `prefers-reduced-motion`.

### Theming

A blocking script in `<head>` sets `data-theme` on `<html>` before first paint
using `localStorage` then the OS preference, which avoids a flash. The React
side reads that attribute through `useSyncExternalStore`, so there is no
hydration mismatch. Logo variants are swapped in CSS rather than JavaScript.

## Deploying to Vercel

1. Create a Postgres database (Neon or Supabase) and copy the **pooled**
   connection string.
2. Add `DATABASE_URL`, `PM_SESSION_SECRET`, `PM_ADMIN_EMAIL`, and
   `PM_ADMIN_PASSWORD` in Project Settings → Environment Variables.
3. Deploy. The schema and admin account are created on the first request to
   `/projects`.

## Content to replace

The case studies in `src/components/CaseStudies.tsx` are placeholders. Swap in
real engagements, metrics, and links before launch.
