"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Trash2,
  UserPlus,
} from "lucide-react";
import { Modal } from "./Modal";
import { Avatar } from "./Avatar";
import { useActionSuccess } from "./useActionSuccess";
import {
  createMemberAction,
  deleteMemberAction,
  type ActionState,
} from "@/app/projects/actions";
import type { Member } from "@/lib/pm/types";

const initialState: ActionState = {};

export const TeamManager = ({
  members,
  currentUserId,
  isAdmin,
}: {
  members: Member[];
  currentUserId: string;
  isAdmin: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Team
          </h1>
          <p className="mt-1.5 text-sm text-slate-gray">
            {members.length} {members.length === 1 ? "person" : "people"} can
            sign in and be assigned work.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="btn btn-primary px-5 py-2.5 text-sm"
        >
          <UserPlus className="size-4" aria-hidden />
          Add member
        </button>
      </div>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {members.map((member) => (
          <li key={member.id} className="card group flex items-center gap-4 p-4">
            <Avatar id={member.id} name={member.name} size="lg" />

            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 truncate font-medium">
                {member.name}
                {member.role === "admin" ? (
                  <span className="rounded-md border border-accent/40 px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-accent">
                    Admin
                  </span>
                ) : null}
              </p>
              <p className="truncate text-sm text-slate-gray">{member.email}</p>
              {member.jobTitle ? (
                <p className="truncate text-xs text-slate-gray">
                  {member.jobTitle}
                </p>
              ) : null}
            </div>

            {isAdmin && member.id !== currentUserId ? (
              <form action={deleteMemberAction}>
                <input type="hidden" name="id" value={member.id} />
                <button
                  type="submit"
                  aria-label={`Remove ${member.name}`}
                  className="flex size-8 items-center justify-center rounded-lg border border-line text-slate-gray opacity-0 transition-all hover:border-red-500/40 hover:text-red-400 group-hover:opacity-100 focus:opacity-100"
                >
                  <Trash2 className="size-3.5" aria-hidden />
                </button>
              </form>
            ) : null}
          </li>
        ))}
      </ul>

      <AddMemberDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
};

/* -------------------------------------------------------------------------- */

const AddMemberDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    createMemberAction,
    initialState
  );
  const [showPassword, setShowPassword] = useState(false);
  const [formKey, setFormKey] = useState(0);

  useActionSuccess(state, () => {
    router.refresh();
    setFormKey((k) => k + 1);
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add a team member"
      description="They'll be able to sign in with this email and password."
    >
      <form key={formKey} action={formAction} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="member-name" className="mb-2 block text-sm font-medium">
              Full name
            </label>
            <input
              id="member-name"
              name="name"
              required
              autoFocus
              className="field"
              placeholder="Ayesha Khan"
            />
          </div>

          <div>
            <label
              htmlFor="member-title"
              className="mb-2 block text-sm font-medium"
            >
              Job title{" "}
              <span className="font-normal text-slate-gray">Optional</span>
            </label>
            <input
              id="member-title"
              name="jobTitle"
              className="field"
              placeholder="Frontend engineer"
            />
          </div>
        </div>

        <div>
          <label htmlFor="member-email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <input
            id="member-email"
            name="email"
            type="email"
            required
            className="field"
            placeholder="ayesha@tms-digital.com"
          />
        </div>

        <div>
          <label
            htmlFor="member-password"
            className="mb-2 block text-sm font-medium"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="member-password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              className="field pr-11"
              placeholder="At least 8 characters"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-gray transition-colors hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="size-4" aria-hidden />
              ) : (
                <Eye className="size-4" aria-hidden />
              )}
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-gray">
            Share it with them directly — they can be given a new one any time.
          </p>
        </div>

        <div>
          <label htmlFor="member-role" className="mb-2 block text-sm font-medium">
            Role
          </label>
          <select id="member-role" name="role" defaultValue="member" className="field">
            <option value="member">Member — can manage projects and tasks</option>
            <option value="admin">Admin — can also remove people</option>
          </select>
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

        {state.success ? (
          <p className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-400">
            <CheckCircle2 className="size-4 shrink-0" aria-hidden />
            {state.success}
          </p>
        ) : null}

        <div className="flex justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost px-5 py-2.5 text-sm"
          >
            Done
          </button>
          <button
            type="submit"
            disabled={pending}
            className="btn btn-primary px-5 py-2.5 text-sm disabled:opacity-70"
          >
            {pending ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden />
                Adding…
              </>
            ) : (
              <>
                <UserPlus className="size-4" aria-hidden />
                Add member
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
