"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdmin, requireUser } from "@/lib/pm/auth";
import { hashPassword, verifyPassword } from "@/lib/pm/password";
import {
  SESSION_COOKIE,
  sessionCookieOptions,
  signSession,
} from "@/lib/pm/session";
import * as db from "@/lib/pm/queries";
import {
  PROJECT_COLORS,
  TASK_PRIORITIES,
  TASK_STATUSES,
  type ProjectColor,
  type TaskPriority,
  type TaskStatus,
} from "@/lib/pm/types";

export type ActionState = { error?: string; success?: string };

const str = (data: FormData, key: string) =>
  (data.get(key) as string | null)?.trim() ?? "";

const asStatus = (value: string): TaskStatus =>
  (TASK_STATUSES as readonly string[]).includes(value)
    ? (value as TaskStatus)
    : "todo";

const asPriority = (value: string): TaskPriority =>
  (TASK_PRIORITIES as readonly string[]).includes(value)
    ? (value as TaskPriority)
    : "medium";

const asColor = (value: string): ProjectColor =>
  (PROJECT_COLORS as readonly string[]).includes(value)
    ? (value as ProjectColor)
    : "blue";

/* -------------------------------------------------------------------------- */
/* Auth                                                                        */
/* -------------------------------------------------------------------------- */

export async function loginAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = str(formData, "email").toLowerCase();
  const password = str(formData, "password");
  const next = str(formData, "next");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  const user = await db.findUserByEmail(email);
  if (!user || !(await verifyPassword(password, user.password_hash))) {
    return { error: "That email and password combination isn't right." };
  }

  const token = await signSession({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role === "admin" ? "admin" : "member",
  });

  const store = await cookies();
  store.set(SESSION_COOKIE, token, sessionCookieOptions);

  redirect(next && next.startsWith("/projects") ? next : "/projects");
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/projects/login");
}

/* -------------------------------------------------------------------------- */
/* Team members                                                                */
/* -------------------------------------------------------------------------- */

export async function createMemberAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireUser();

  const name = str(formData, "name");
  const email = str(formData, "email").toLowerCase();
  const password = str(formData, "password");
  const jobTitle = str(formData, "jobTitle");
  const role = str(formData, "role") === "admin" ? "admin" : "member";

  if (name.length < 2) return { error: "Enter the person's full name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return { error: "Enter a valid email address." };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  if (await db.emailExists(email)) {
    return { error: "Someone with that email already exists." };
  }

  await db.createMember({
    name,
    email,
    passwordHash: await hashPassword(password),
    role,
    jobTitle: jobTitle || null,
  });

  revalidatePath("/projects/team");
  revalidatePath("/projects");
  return { success: `${name} can now sign in.` };
}

export async function deleteMemberAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = str(formData, "id");

  if (id === admin.id) {
    throw new Error("You cannot remove your own account.");
  }

  await db.deleteMember(id);
  revalidatePath("/projects/team");
  revalidatePath("/projects");
}

export async function resetMemberPasswordAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdmin();

  const id = str(formData, "id");
  const password = str(formData, "password");

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  await db.updateMemberPassword(id, await hashPassword(password));
  revalidatePath("/projects/team");
  return { success: "Password updated." };
}

/* -------------------------------------------------------------------------- */
/* Projects                                                                    */
/* -------------------------------------------------------------------------- */

export async function createProjectAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const user = await requireUser();

  const name = str(formData, "name");
  if (name.length < 2) return { error: "Give the project a name." };

  const memberIds = formData.getAll("memberIds").map(String).filter(Boolean);

  await db.createProject({
    name,
    description: str(formData, "description") || null,
    color: asColor(str(formData, "color")),
    createdBy: user.id,
    memberIds: [...memberIds, user.id],
  });

  revalidatePath("/projects");
  return { success: "Project created." };
}

export async function updateProjectAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireUser();

  const id = str(formData, "id");
  const name = str(formData, "name");
  if (name.length < 2) return { error: "Give the project a name." };

  await db.updateProject(id, {
    name,
    description: str(formData, "description") || null,
    color: asColor(str(formData, "color")),
  });

  await db.setProjectMembers(
    id,
    formData.getAll("memberIds").map(String).filter(Boolean)
  );

  revalidatePath("/projects");
  revalidatePath(`/projects/${id}`);
  return { success: "Project updated." };
}

export async function archiveProjectAction(formData: FormData) {
  await requireUser();
  const id = str(formData, "id");
  await db.setProjectArchived(id, str(formData, "archived") === "true");
  revalidatePath("/projects");
  revalidatePath(`/projects/${id}`);
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdmin();
  await db.deleteProject(str(formData, "id"));
  revalidatePath("/projects");
  redirect("/projects");
}

/* -------------------------------------------------------------------------- */
/* Tasks                                                                       */
/* -------------------------------------------------------------------------- */

export async function createTaskAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireUser();

  const projectId = str(formData, "projectId");
  const title = str(formData, "title");
  if (title.length < 2) return { error: "Give the task a title." };

  const assigneeId = str(formData, "assigneeId");
  const dueDate = str(formData, "dueDate");

  await db.createTask({
    projectId,
    title,
    description: str(formData, "description") || null,
    status: asStatus(str(formData, "status")),
    priority: asPriority(str(formData, "priority")),
    assigneeId: assigneeId || null,
    dueDate: dueDate || null,
  });

  revalidatePath(`/projects/${projectId}`);
  revalidatePath("/projects");
  return { success: "Task added." };
}

export async function updateTaskAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireUser();

  const id = str(formData, "id");
  const projectId = str(formData, "projectId");
  const title = str(formData, "title");
  if (title.length < 2) return { error: "Give the task a title." };

  const assigneeId = str(formData, "assigneeId");
  const dueDate = str(formData, "dueDate");

  await db.updateTask(id, {
    title,
    description: str(formData, "description") || null,
    priority: asPriority(str(formData, "priority")),
    assigneeId: assigneeId || null,
    dueDate: dueDate || null,
  });

  revalidatePath(`/projects/${projectId}`);
  return { success: "Task updated." };
}

/** Called on drag-and-drop. Position is computed client-side from neighbours. */
export async function moveTaskAction(input: {
  taskId: string;
  projectId: string;
  status: TaskStatus;
  position: number;
}) {
  await requireUser();
  await db.moveTask(input.taskId, asStatus(input.status), input.position);
  revalidatePath(`/projects/${input.projectId}`);
  revalidatePath("/projects");
}

export async function deleteTaskAction(input: {
  taskId: string;
  projectId: string;
}) {
  await requireUser();
  await db.deleteTask(input.taskId);
  revalidatePath(`/projects/${input.projectId}`);
  revalidatePath("/projects");
}

/* -------------------------------------------------------------------------- */
/* Checklist                                                                   */
/* -------------------------------------------------------------------------- */

export async function addChecklistItemAction(input: {
  taskId: string;
  projectId: string;
  content: string;
}) {
  await requireUser();
  const content = input.content.trim();
  if (!content) return;

  await db.addChecklistItem(input.taskId, content);
  revalidatePath(`/projects/${input.projectId}`);
}

export async function toggleChecklistItemAction(input: {
  itemId: string;
  projectId: string;
  isDone: boolean;
}) {
  await requireUser();
  await db.setChecklistItemDone(input.itemId, input.isDone);
  revalidatePath(`/projects/${input.projectId}`);
}

export async function deleteChecklistItemAction(input: {
  itemId: string;
  projectId: string;
}) {
  await requireUser();
  await db.deleteChecklistItem(input.itemId);
  revalidatePath(`/projects/${input.projectId}`);
}
