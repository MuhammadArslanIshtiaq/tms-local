import Link from "next/link";
import { CalendarClock, CheckCircle2 } from "lucide-react";
import { requireUser } from "@/lib/pm/auth";
import { listMembers, listProjects, listTasksForUser } from "@/lib/pm/queries";
import { ProjectsGrid } from "@/components/pm/ProjectsGrid";
import { COLOR_CLASSES, PRIORITY_META, STATUS_META } from "@/lib/pm/types";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const user = await requireUser();
  const [projects, members, myTasks] = await Promise.all([
    listProjects(),
    listMembers(),
    listTasksForUser(user.id),
  ]);

  return (
    <div className="mx-auto w-full max-w-[100rem] px-4 py-8 sm:px-6 sm:py-10">
      <ProjectsGrid projects={projects} members={members} />

      {myTasks.length > 0 ? (
        <section className="mt-14" aria-labelledby="my-tasks-heading">
          <h2
            id="my-tasks-heading"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-gray"
          >
            Assigned to you
          </h2>

          <ul className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {myTasks.map((task) => {
              const overdue =
                task.dueDate && new Date(task.dueDate) < new Date(todayISO());

              return (
                <li key={task.id}>
                  <Link
                    href={`/projects/${task.projectId}?task=${task.id}`}
                    className="card group flex h-full flex-col p-4"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className={`size-2 rounded-full bg-gradient-to-br ${
                          COLOR_CLASSES[task.projectColor] ?? COLOR_CLASSES.blue
                        }`}
                        aria-hidden
                      />
                      <span className="truncate text-slate-gray">
                        {task.projectName}
                      </span>
                    </div>

                    <p className="mt-2.5 font-medium leading-snug transition-colors group-hover:text-accent">
                      {task.title}
                    </p>

                    <div className="mt-auto flex flex-wrap items-center gap-2 pt-4 text-xs">
                      <span
                        className={`flex items-center gap-1.5 ${STATUS_META[task.status].accent}`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${STATUS_META[task.status].dot}`}
                          aria-hidden
                        />
                        {STATUS_META[task.status].label}
                      </span>
                      <span
                        className={`rounded-md border px-1.5 py-0.5 ${PRIORITY_META[task.priority].className}`}
                      >
                        {PRIORITY_META[task.priority].label}
                      </span>
                      {task.dueDate ? (
                        <span
                          className={`ml-auto flex items-center gap-1 ${
                            overdue ? "text-red-400" : "text-slate-gray"
                          }`}
                        >
                          <CalendarClock className="size-3.5" aria-hidden />
                          {formatDate(task.dueDate)}
                        </span>
                      ) : null}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ) : projects.length > 0 ? (
        <p className="mt-14 flex items-center justify-center gap-2 text-sm text-slate-gray">
          <CheckCircle2 className="size-4 text-emerald-400" aria-hidden />
          Nothing assigned to you right now.
        </p>
      ) : null}
    </div>
  );
}

const todayISO = () => new Date().toISOString().slice(0, 10);

const formatDate = (value: string) =>
  new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
