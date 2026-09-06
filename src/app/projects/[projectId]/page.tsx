import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, Users } from "lucide-react";
import { requireUser } from "@/lib/pm/auth";
import { getProject, listMembers, listTasks } from "@/lib/pm/queries";
import { Board } from "@/components/pm/Board";
import { AvatarStack } from "@/components/pm/Avatar";
import { COLOR_CLASSES } from "@/lib/pm/types";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ projectId: string }> };

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { projectId } = await params;
  const project = await getProject(projectId);
  return { title: project?.name ?? "Project" };
};

export default async function ProjectBoardPage({ params }: Props) {
  await requireUser();
  const { projectId } = await params;

  const [project, tasks, members] = await Promise.all([
    getProject(projectId),
    listTasks(projectId),
    listMembers(),
  ]);

  if (!project) notFound();

  const progress =
    project.taskCount > 0
      ? Math.round((project.doneCount / project.taskCount) * 100)
      : 0;

  return (
    <div className="mx-auto w-full max-w-[100rem] px-4 py-8 sm:px-6 sm:py-10">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-slate-gray transition-colors hover:text-accent"
      >
        <ArrowLeft className="size-4" aria-hidden />
        All projects
      </Link>

      <header className="mt-6 flex flex-wrap items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          <span
            className={`flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${
              COLOR_CLASSES[project.color] ?? COLOR_CLASSES.blue
            } text-xl font-bold text-white shadow-lg`}
          >
            {project.name.charAt(0).toUpperCase()}
          </span>

          <div className="min-w-0">
            <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {project.name}
              {project.isArchived ? (
                <span className="ml-3 rounded-md border border-line px-2 py-0.5 align-middle text-xs font-medium uppercase tracking-wider text-slate-gray">
                  Archived
                </span>
              ) : null}
            </h1>
            {project.description ? (
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-gray">
                {project.description}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="min-w-[9rem]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-gray">Progress</span>
              <span className="font-semibold">{progress}%</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-1.5 text-xs text-slate-gray">
              {project.doneCount} of {project.taskCount} tasks done
            </p>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <AvatarStack people={project.members} max={5} />
            <span className="flex items-center gap-1 text-xs text-slate-gray">
              <Users className="size-3" aria-hidden />
              {project.members.length}{" "}
              {project.members.length === 1 ? "member" : "members"}
            </span>
          </div>
        </div>
      </header>

      <div className="mt-8">
        <Suspense
          fallback={<div className="h-96 animate-pulse rounded-2xl bg-surface" />}
        >
          <Board
            projectId={project.id}
            initialTasks={tasks}
            members={
              project.members.length > 0 ? project.members : members
            }
          />
        </Suspense>
      </div>
    </div>
  );
}
