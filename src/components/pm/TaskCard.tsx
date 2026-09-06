"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CalendarClock, GripVertical, ListChecks, MessageSquare } from "lucide-react";
import { Avatar } from "./Avatar";
import { PRIORITY_META, type Task } from "@/lib/pm/types";

type TaskCardProps = {
  task: Task;
  onOpen?: () => void;
  overlay?: boolean;
};

export const TaskCard = ({ task, onOpen, overlay = false }: TaskCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, disabled: overlay });

  const done = task.checklist.filter((item) => item.isDone).length;
  const total = task.checklist.length;
  const overdue =
    task.dueDate &&
    task.status !== "done" &&
    new Date(task.dueDate) < new Date(new Date().toISOString().slice(0, 10));

  return (
    <article
      ref={overlay ? undefined : setNodeRef}
      style={
        overlay
          ? undefined
          : { transform: CSS.Translate.toString(transform), transition }
      }
      className={`group rounded-xl border bg-charcoal p-3.5 transition-shadow ${
        overlay
          ? "border-accent/50 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] rotate-2 cursor-grabbing"
          : isDragging
            ? "border-accent/40 opacity-40"
            : "border-line hover:border-accent/40 hover:shadow-[0_10px_30px_-18px_rgba(0,0,0,0.7)]"
      }`}
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          {...attributes}
          {...listeners}
          aria-label={`Drag ${task.title}`}
          className={`mt-0.5 shrink-0 rounded text-slate-gray/60 transition-colors hover:text-slate-gray ${
            overlay ? "cursor-grabbing" : "cursor-grab touch-none"
          }`}
        >
          <GripVertical className="size-4" aria-hidden />
        </button>

        <button
          type="button"
          onClick={onOpen}
          disabled={overlay}
          className="min-w-0 flex-1 text-left"
        >
          <p className="text-sm font-medium leading-snug transition-colors group-hover:text-accent">
            {task.title}
          </p>
        </button>
      </div>

      {task.description ? (
        <p className="mt-2 line-clamp-2 pl-6 text-xs leading-relaxed text-slate-gray">
          {task.description}
        </p>
      ) : null}

      {total > 0 ? (
        <div className="mt-3 pl-6">
          <div className="flex items-center gap-1.5 text-[0.7rem] text-slate-gray">
            <ListChecks className="size-3.5" aria-hidden />
            {done}/{total}
          </div>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-500"
              style={{ width: `${total ? (done / total) * 100 : 0}%` }}
            />
          </div>
        </div>
      ) : null}

      <div className="mt-3 flex flex-wrap items-center gap-2 pl-6">
        <span
          className={`rounded-md border px-1.5 py-0.5 text-[0.65rem] font-medium ${
            PRIORITY_META[task.priority].className
          }`}
        >
          {PRIORITY_META[task.priority].label}
        </span>

        {task.dueDate ? (
          <span
            className={`flex items-center gap-1 text-[0.7rem] ${
              overdue ? "text-red-400" : "text-slate-gray"
            }`}
          >
            <CalendarClock className="size-3" aria-hidden />
            {formatDate(task.dueDate)}
          </span>
        ) : null}

        {task.description && !task.dueDate ? (
          <MessageSquare className="size-3 text-slate-gray" aria-hidden />
        ) : null}

        {task.assignee ? (
          <Avatar
            id={task.assignee.id}
            name={task.assignee.name}
            size="xs"
            className="ml-auto"
          />
        ) : null}
      </div>
    </article>
  );
};

const formatDate = (value: string) =>
  new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
