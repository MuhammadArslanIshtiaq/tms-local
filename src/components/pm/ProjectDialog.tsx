"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Check, Loader2, Plus } from "lucide-react";
import { Modal } from "./Modal";
import { Avatar } from "./Avatar";
import { useActionSuccess } from "./useActionSuccess";
import {
  createProjectAction,
  updateProjectAction,
  type ActionState,
} from "@/app/projects/actions";
import {
  COLOR_CLASSES,
  PROJECT_COLORS,
  type Member,
  type Project,
} from "@/lib/pm/types";

const initialState: ActionState = {};

type ProjectDialogProps = {
  members: Member[];
  project?: Project;
  open: boolean;
  onClose: () => void;
};

export const ProjectDialog = ({
  members,
  project,
  open,
  onClose,
}: ProjectDialogProps) => {
  const router = useRouter();
  const isEdit = Boolean(project);

  const [state, formAction, pending] = useActionState(
    isEdit ? updateProjectAction : createProjectAction,
    initialState
  );

  const [color, setColor] = useState(project?.color ?? "blue");
  const [selected, setSelected] = useState<string[]>(
    project?.members.map((m) => m.id) ?? []
  );

  useActionSuccess(state, () => {
    onClose();
    router.refresh();
  });

  const toggleMember = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit project" : "New project"}
      description={
        isEdit
          ? "Update the details and who's involved."
          : "Give it a name, pick a colour, and add your team."
      }
    >
      <form action={formAction} className="space-y-5">
        {project ? <input type="hidden" name="id" value={project.id} /> : null}
        <input type="hidden" name="color" value={color} />
        {selected.map((id) => (
          <input key={id} type="hidden" name="memberIds" value={id} />
        ))}

        <div>
          <label
            htmlFor="project-name"
            className="mb-2 block text-sm font-medium"
          >
            Project name
          </label>
          <input
            id="project-name"
            name="name"
            defaultValue={project?.name}
            required
            autoFocus
            className="field"
            placeholder="Website redesign"
          />
        </div>

        <div>
          <label
            htmlFor="project-description"
            className="mb-2 block text-sm font-medium"
          >
            Description{" "}
            <span className="font-normal text-slate-gray">Optional</span>
          </label>
          <textarea
            id="project-description"
            name="description"
            rows={3}
            defaultValue={project?.description ?? ""}
            className="field resize-none"
            placeholder="What is this project about?"
          />
        </div>

        <div>
          <span className="mb-2 block text-sm font-medium">Colour</span>
          <div className="flex flex-wrap gap-2.5">
            {PROJECT_COLORS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setColor(option)}
                aria-label={option}
                aria-pressed={color === option}
                className={`size-9 rounded-lg bg-gradient-to-br ${COLOR_CLASSES[option]} flex items-center justify-center ring-2 transition-all ${
                  color === option
                    ? "ring-foreground/70 scale-105"
                    : "ring-transparent hover:scale-105"
                }`}
              >
                {color === option ? (
                  <Check className="size-4 text-white" aria-hidden />
                ) : null}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="mb-2 block text-sm font-medium">Team members</span>
          {members.length === 0 ? (
            <p className="text-sm text-slate-gray">
              No team members yet — add people on the Team page.
            </p>
          ) : (
            <div className="grid max-h-52 gap-1.5 overflow-y-auto pr-1">
              {members.map((member) => {
                const checked = selected.includes(member.id);
                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => toggleMember(member.id)}
                    aria-pressed={checked}
                    className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-left transition-colors ${
                      checked
                        ? "border-accent/50 bg-accent/10"
                        : "border-line hover:border-line-strong"
                    }`}
                  >
                    <Avatar id={member.id} name={member.name} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {member.name}
                      </span>
                      <span className="block truncate text-xs text-slate-gray">
                        {member.jobTitle ?? member.email}
                      </span>
                    </span>
                    <span
                      className={`flex size-5 items-center justify-center rounded-md border ${
                        checked
                          ? "border-accent bg-accent text-white"
                          : "border-line-strong"
                      }`}
                    >
                      {checked ? <Check className="size-3" aria-hidden /> : null}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
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

        <div className="flex justify-end gap-3 pt-1">
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
            ) : (
              <>
                <Plus className="size-4" aria-hidden />
                {isEdit ? "Save changes" : "Create project"}
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
