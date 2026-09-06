"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Archive, ArchiveRestore, FolderPlus, Pencil, Plus } from "lucide-react";
import { AvatarStack } from "./Avatar";
import { ProjectDialog } from "./ProjectDialog";
import { archiveProjectAction } from "@/app/projects/actions";
import { COLOR_CLASSES, type Member, type Project } from "@/lib/pm/types";

export const ProjectsGrid = ({
  projects,
  members,
}: {
  projects: Project[];
  members: Member[];
}) => {
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);

  const active = projects.filter((p) => !p.isArchived);
  const archived = projects.filter((p) => p.isArchived);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Projects
          </h1>
          <p className="mt-1.5 text-sm text-slate-gray">
            {active.length} active
            {archived.length > 0 ? ` · ${archived.length} archived` : ""}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setCreating(true)}
          className="btn btn-primary px-5 py-2.5 text-sm"
        >
          <Plus className="size-4" aria-hidden />
          New project
        </button>
      </div>

      {projects.length === 0 ? (
        <EmptyState onCreate={() => setCreating(true)} />
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {active.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onEdit={() => setEditing(project)}
            />
          ))}
        </div>
      )}

      {archived.length > 0 ? (
        <section className="mt-14">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-gray">
            Archived
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {archived.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onEdit={() => setEditing(project)}
              />
            ))}
          </div>
        </section>
      ) : null}

      <ProjectDialog
        key={creating ? "create-open" : "create-closed"}
        open={creating}
        onClose={() => setCreating(false)}
        members={members}
      />
      {editing ? (
        <ProjectDialog
          key={editing.id}
          open
          onClose={() => setEditing(null)}
          members={members}
          project={editing}
        />
      ) : null}
    </>
  );
};

/* -------------------------------------------------------------------------- */

const ProjectCard = ({
  project,
  index,
  onEdit,
}: {
  project: Project;
  index: number;
  onEdit: () => void;
}) => {
  const progress =
    project.taskCount > 0
      ? Math.round((project.doneCount / project.taskCount) * 100)
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
      className={`card group relative flex flex-col p-5 ${
        project.isArchived ? "opacity-60" : ""
      }`}
    >
      <Link
        href={`/projects/${project.id}`}
        className="absolute inset-0 z-0 rounded-[1.25rem]"
        aria-label={`Open ${project.name}`}
      />

      <div className="pointer-events-none relative z-10 flex items-start justify-between gap-3">
        <span
          className={`flex size-11 items-center justify-center rounded-xl bg-gradient-to-br ${
            COLOR_CLASSES[project.color] ?? COLOR_CLASSES.blue
          } text-base font-bold text-white shadow-lg`}
        >
          {project.name.charAt(0).toUpperCase()}
        </span>

        <div className="pointer-events-auto flex gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100">
          <button
            type="button"
            onClick={onEdit}
            aria-label={`Edit ${project.name}`}
            className="flex size-8 items-center justify-center rounded-lg border border-line bg-background/80 text-slate-gray transition-colors hover:border-accent/40 hover:text-foreground"
          >
            <Pencil className="size-3.5" aria-hidden />
          </button>
          <form action={archiveProjectAction}>
            <input type="hidden" name="id" value={project.id} />
            <input
              type="hidden"
              name="archived"
              value={project.isArchived ? "false" : "true"}
            />
            <button
              type="submit"
              aria-label={project.isArchived ? "Restore project" : "Archive project"}
              className="flex size-8 items-center justify-center rounded-lg border border-line bg-background/80 text-slate-gray transition-colors hover:border-accent/40 hover:text-foreground"
            >
              {project.isArchived ? (
                <ArchiveRestore className="size-3.5" aria-hidden />
              ) : (
                <Archive className="size-3.5" aria-hidden />
              )}
            </button>
          </form>
        </div>
      </div>

      <h3 className="pointer-events-none relative z-10 mt-4 font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
        {project.name}
      </h3>
      {project.description ? (
        <p className="pointer-events-none relative z-10 mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-gray">
          {project.description}
        </p>
      ) : null}

      <div className="pointer-events-none relative z-10 mt-5">
        <div className="flex items-center justify-between text-xs text-slate-gray">
          <span>
            {project.doneCount}/{project.taskCount} tasks done
          </span>
          <span className="font-medium text-foreground">{progress}%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
          />
        </div>
      </div>

      <div className="pointer-events-none relative z-10 mt-5 flex items-center justify-between border-t border-line pt-4">
        <AvatarStack people={project.members} />
        <span className="text-xs text-slate-gray">
          {project.members.length}{" "}
          {project.members.length === 1 ? "member" : "members"}
        </span>
      </div>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */

const EmptyState = ({ onCreate }: { onCreate: () => void }) => (
  <div className="card mt-8 flex flex-col items-center justify-center px-6 py-20 text-center">
    <span className="flex size-16 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent">
      <FolderPlus className="size-8" aria-hidden />
    </span>
    <h2 className="mt-6 font-display text-xl font-semibold tracking-tight">
      No projects yet
    </h2>
    <p className="mt-2 max-w-sm text-sm text-slate-gray">
      Create your first project, add your team, then start dragging tasks across
      the board.
    </p>
    <button
      type="button"
      onClick={onCreate}
      className="btn btn-primary mt-7 px-6 py-3 text-sm"
    >
      <Plus className="size-4" aria-hidden />
      Create a project
    </button>
  </div>
);
