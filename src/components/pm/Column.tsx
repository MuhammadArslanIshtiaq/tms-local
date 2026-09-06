"use client";

import { useDroppable } from "@dnd-kit/core";
import { Plus } from "lucide-react";
import type { ReactNode } from "react";
import { STATUS_META, type Task, type TaskStatus } from "@/lib/pm/types";

type ColumnProps = {
  status: TaskStatus;
  tasks: Task[];
  onAdd: () => void;
  children: ReactNode;
};

export const Column = ({ status, tasks, onAdd, children }: ColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const meta = STATUS_META[status];

  return (
    <section
      aria-label={meta.label}
      className={`flex min-h-[24rem] flex-col rounded-2xl border bg-surface/40 p-3 transition-colors duration-200 ${
        isOver ? "border-accent/50 bg-accent/5" : "border-line"
      }`}
    >
      <header className="flex items-center justify-between px-1.5 pb-3">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <span className={`size-2 rounded-full ${meta.dot}`} aria-hidden />
          {meta.label}
          <span className="rounded-md bg-surface px-1.5 py-0.5 text-xs font-medium text-slate-gray">
            {tasks.length}
          </span>
        </h2>

        <button
          type="button"
          onClick={onAdd}
          aria-label={`Add task to ${meta.label}`}
          className="flex size-7 items-center justify-center rounded-lg text-slate-gray transition-colors hover:bg-surface hover:text-accent"
        >
          <Plus className="size-4" aria-hidden />
        </button>
      </header>

      <div ref={setNodeRef} className="flex flex-1 flex-col gap-2.5">
        {children}
      </div>
    </section>
  );
};
