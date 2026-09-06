"use client";

import { useActionState, useOptimistic, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Check, Loader2, Plus, Trash2 } from "lucide-react";
import { Modal } from "./Modal";
import { useActionSuccess } from "./useActionSuccess";
import {
  addChecklistItemAction,
  createTaskAction,
  deleteChecklistItemAction,
  deleteTaskAction,
  toggleChecklistItemAction,
  updateTaskAction,
  type ActionState,
} from "@/app/projects/actions";
import {
  PRIORITY_META,
  STATUS_META,
  TASK_PRIORITIES,
  type ChecklistItem,
  type Member,
  type Task,
  type TaskStatus,
} from "@/lib/pm/types";

const initialState: ActionState = {};

type TaskDialogProps = {
  open: boolean;
  onClose: () => void;
  projectId: string;
  members: Member[];
  status: TaskStatus;
  task?: Task;
};

export const TaskDialog = ({
  open,
  onClose,
  projectId,
  members,
  status,
  task,
}: TaskDialogProps) => {
  const router = useRouter();
  const isEdit = Boolean(task);

  const [state, formAction, pending] = useActionState(
    isEdit ? updateTaskAction : createTaskAction,
    initialState
  );

  useActionSuccess(state, () => {
    onClose();
    router.refresh();
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      size={isEdit ? "lg" : "md"}
      title={isEdit ? "Task details" : "New task"}
      description={
        isEdit ? undefined : `Will be added to “${STATUS_META[status].label}”.`
      }
    >
      <div className={isEdit ? "grid gap-8 lg:grid-cols-[1.3fr_1fr]" : ""}>
        <form action={formAction} className="space-y-5">
          <input type="hidden" name="projectId" value={projectId} />
          <input type="hidden" name="status" value={status} />
          {task ? <input type="hidden" name="id" value={task.id} /> : null}

          <div>
            <label htmlFor="task-title" className="mb-2 block text-sm font-medium">
              Title
            </label>
            <input
              id="task-title"
              name="title"
              required
              autoFocus={!isEdit}
              defaultValue={task?.title}
              className="field"
              placeholder="Ship the new landing page"
            />
          </div>

          <div>
            <label
              htmlFor="task-description"
              className="mb-2 block text-sm font-medium"
            >
              Description{" "}
              <span className="font-normal text-slate-gray">Optional</span>
            </label>
            <textarea
              id="task-description"
              name="description"
              rows={3}
              defaultValue={task?.description ?? ""}
              className="field resize-none"
              placeholder="Any detail worth remembering…"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="task-assignee"
                className="mb-2 block text-sm font-medium"
              >
                Assignee
              </label>
              <select
                id="task-assignee"
                name="assigneeId"
                defaultValue={task?.assignee?.id ?? ""}
                className="field"
              >
                <option value="">Unassigned</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="task-priority"
                className="mb-2 block text-sm font-medium"
              >
                Priority
              </label>
              <select
                id="task-priority"
                name="priority"
                defaultValue={task?.priority ?? "medium"}
                className="field"
              >
                {TASK_PRIORITIES.map((priority) => (
                  <option key={priority} value={priority}>
                    {PRIORITY_META[priority].label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="task-due" className="mb-2 block text-sm font-medium">
              Due date{" "}
              <span className="font-normal text-slate-gray">Optional</span>
            </label>
            <input
              id="task-due"
              name="dueDate"
              type="date"
              defaultValue={task?.dueDate ?? ""}
              className="field"
            />
          </div>

          {state.error ? (
            <p
              role="alert"
              className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400"
            >
              <AlertCircle className="size-4 shrink-0" aria-hidden />
              {state.error}
            </p>
          ) : null}

          <div className="flex items-center justify-between gap-3 pt-1">
            {isEdit && task ? (
              <DeleteTaskButton
                taskId={task.id}
                projectId={projectId}
                onDeleted={onClose}
              />
            ) : (
              <span />
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-ghost px-5 py-2.5 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={pending}
                className="btn btn-primary px-5 py-2.5 text-sm disabled:opacity-70"
              >
                {pending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    Saving…
                  </>
                ) : isEdit ? (
                  "Save changes"
                ) : (
                  <>
                    <Plus className="size-4" aria-hidden />
                    Add task
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {isEdit && task ? (
          <Checklist
            taskId={task.id}
            projectId={projectId}
            items={task.checklist}
          />
        ) : null}
      </div>
    </Modal>
  );
};

/* -------------------------------------------------------------------------- */
/* Delete                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Plain button rather than a nested <form> — a form inside a form is invalid
 * HTML and breaks hydration. Requires a second click to confirm.
 */
const DeleteTaskButton = ({
  taskId,
  projectId,
  onDeleted,
}: {
  taskId: string;
  projectId: string;
  onDeleted: () => void;
}) => {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();

  const remove = () => {
    startTransition(async () => {
      await deleteTaskAction({ taskId, projectId });
      onDeleted();
      router.refresh();
    });
  };

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-slate-gray transition-colors hover:text-red-400"
      >
        <Trash2 className="size-4" aria-hidden />
        Delete
      </button>
    );
  }

  return (
    <span className="flex items-center gap-2 text-sm">
      <span className="text-slate-gray">Delete this task?</span>
      <button
        type="button"
        onClick={remove}
        disabled={pending}
        className="rounded-lg border border-red-500/40 px-2.5 py-1.5 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-60"
      >
        {pending ? "Deleting…" : "Yes, delete"}
      </button>
      <button
        type="button"
        onClick={() => setConfirming(false)}
        className="rounded-lg px-2 py-1.5 text-xs text-slate-gray transition-colors hover:text-foreground"
      >
        Cancel
      </button>
    </span>
  );
};

/* -------------------------------------------------------------------------- */
/* Checklist                                                                   */
/* -------------------------------------------------------------------------- */

type OptimisticAction =
  | { type: "toggle"; id: string; isDone: boolean }
  | { type: "add"; content: string }
  | { type: "remove"; id: string };

const Checklist = ({
  taskId,
  projectId,
  items,
}: {
  taskId: string;
  projectId: string;
  items: ChecklistItem[];
}) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState("");

  const [optimisticItems, applyOptimistic] = useOptimistic(
    items,
    (current: ChecklistItem[], action: OptimisticAction) => {
      switch (action.type) {
        case "toggle":
          return current.map((item) =>
            item.id === action.id ? { ...item, isDone: action.isDone } : item
          );
        case "add":
          return [
            ...current,
            {
              id: `optimistic-${Date.now()}`,
              taskId,
              content: action.content,
              isDone: false,
              position: Number.MAX_SAFE_INTEGER,
            },
          ];
        case "remove":
          return current.filter((item) => item.id !== action.id);
        default:
          return current;
      }
    }
  );

  const done = optimisticItems.filter((item) => item.isDone).length;
  const total = optimisticItems.length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  const toggle = (item: ChecklistItem) => {
    startTransition(async () => {
      applyOptimistic({ type: "toggle", id: item.id, isDone: !item.isDone });
      await toggleChecklistItemAction({
        itemId: item.id,
        projectId,
        isDone: !item.isDone,
      });
      router.refresh();
    });
  };

  const remove = (item: ChecklistItem) => {
    startTransition(async () => {
      applyOptimistic({ type: "remove", id: item.id });
      await deleteChecklistItemAction({ itemId: item.id, projectId });
      router.refresh();
    });
  };

  const add = (event: React.FormEvent) => {
    event.preventDefault();
    const content = draft.trim();
    if (!content) return;

    setDraft("");
    inputRef.current?.focus();

    startTransition(async () => {
      applyOptimistic({ type: "add", content });
      await addChecklistItemAction({ taskId, projectId, content });
      router.refresh();
    });
  };

  return (
    <section
      aria-label="Checklist"
      className="rounded-xl border border-line bg-surface/40 p-4"
    >
      <header className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Checklist</h3>
        <span className="text-xs text-slate-gray">
          {done}/{total}
        </span>
      </header>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2 transition-[width] duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ul className="mt-4 space-y-1">
        {optimisticItems.map((item) => (
          <li key={item.id} className="group flex items-start gap-2.5">
            <button
              type="button"
              onClick={() => toggle(item)}
              role="checkbox"
              aria-checked={item.isDone}
              aria-label={item.content}
              className={`mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-md border transition-all ${
                item.isDone
                  ? "border-accent bg-accent text-white"
                  : "border-line-strong hover:border-accent"
              }`}
            >
              {item.isDone ? <Check className="size-3" aria-hidden /> : null}
            </button>

            <span
              className={`flex-1 text-sm leading-snug transition-colors ${
                item.isDone ? "text-slate-gray line-through" : ""
              }`}
            >
              {item.content}
            </span>

            <button
              type="button"
              onClick={() => remove(item)}
              aria-label={`Remove ${item.content}`}
              className="mt-0.5 shrink-0 text-slate-gray opacity-0 transition-all hover:text-red-400 group-hover:opacity-100"
            >
              <Trash2 className="size-3.5" aria-hidden />
            </button>
          </li>
        ))}

        {total === 0 ? (
          <li className="py-2 text-sm text-slate-gray">
            No items yet — break the task into steps below.
          </li>
        ) : null}
      </ul>

      <form onSubmit={add} className="mt-4 flex gap-2">
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="field py-2 text-sm"
          placeholder="Add an item…"
          aria-label="New checklist item"
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          aria-label="Add checklist item"
          className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line text-slate-gray transition-colors hover:border-accent/50 hover:text-accent disabled:opacity-40"
        >
          <Plus className="size-4" aria-hidden />
        </button>
      </form>
    </section>
  );
};
