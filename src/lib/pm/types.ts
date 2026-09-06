export const TASK_STATUSES = ["todo", "in_progress", "review", "done"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export const STATUS_META: Record<
  TaskStatus,
  { label: string; accent: string; dot: string }
> = {
  todo: { label: "To do", accent: "text-slate-gray", dot: "bg-slate-gray" },
  in_progress: {
    label: "In progress",
    accent: "text-accent",
    dot: "bg-accent",
  },
  review: { label: "In review", accent: "text-amber-400", dot: "bg-amber-400" },
  done: { label: "Done", accent: "text-emerald-400", dot: "bg-emerald-400" },
};

export const TASK_PRIORITIES = ["low", "medium", "high"] as const;
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export const PRIORITY_META: Record<
  TaskPriority,
  { label: string; className: string }
> = {
  low: {
    label: "Low",
    className: "border-slate-gray/30 text-slate-gray",
  },
  medium: {
    label: "Medium",
    className: "border-accent/40 text-accent",
  },
  high: {
    label: "High",
    className: "border-red-500/40 text-red-400",
  },
};

export const PROJECT_COLORS = [
  "blue",
  "violet",
  "emerald",
  "amber",
  "rose",
  "cyan",
] as const;
export type ProjectColor = (typeof PROJECT_COLORS)[number];

export const COLOR_CLASSES: Record<ProjectColor, string> = {
  blue: "from-blue-500 to-indigo-500",
  violet: "from-violet-500 to-purple-500",
  emerald: "from-emerald-500 to-teal-500",
  amber: "from-amber-500 to-orange-500",
  rose: "from-rose-500 to-pink-500",
  cyan: "from-cyan-500 to-sky-500",
};

export type Member = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member";
  jobTitle: string | null;
  createdAt: string;
};

export type Project = {
  id: string;
  name: string;
  description: string | null;
  color: ProjectColor;
  isArchived: boolean;
  createdAt: string;
  taskCount: number;
  doneCount: number;
  members: Member[];
};

export type ChecklistItem = {
  id: string;
  taskId: string;
  content: string;
  isDone: boolean;
  position: number;
};

export type Task = {
  id: string;
  projectId: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  position: number;
  assignee: Pick<Member, "id" | "name" | "email"> | null;
  checklist: ChecklistItem[];
};

/** Deterministic avatar colour derived from a member id. */
export const avatarPalette = [
  "bg-blue-500/20 text-blue-300 ring-blue-500/30",
  "bg-violet-500/20 text-violet-300 ring-violet-500/30",
  "bg-emerald-500/20 text-emerald-300 ring-emerald-500/30",
  "bg-amber-500/20 text-amber-300 ring-amber-500/30",
  "bg-rose-500/20 text-rose-300 ring-rose-500/30",
  "bg-cyan-500/20 text-cyan-300 ring-cyan-500/30",
];

export const avatarClass = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return avatarPalette[hash % avatarPalette.length];
};

export const initialsOf = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "?";
