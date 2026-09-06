"use client";

import { useCallback, useMemo, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { moveTaskAction } from "@/app/projects/actions";
import {
  STATUS_META,
  TASK_STATUSES,
  type Member,
  type Task,
  type TaskStatus,
} from "@/lib/pm/types";
import { Column } from "./Column";
import { TaskCard } from "./TaskCard";
import { TaskDialog } from "./TaskDialog";

type BoardProps = {
  projectId: string;
  initialTasks: Task[];
  members: Member[];
};

const GAP = 1000;

export const Board = ({ projectId, initialTasks, members }: BoardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [tasks, setTasks] = useState(initialTasks);
  const [serverTasks, setServerTasks] = useState(initialTasks);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [composingIn, setComposingIn] = useState<TaskStatus | null>(null);
  /* Deep link: /projects/[id]?task=<uuid> opens that task on load. */
  const [openTaskId, setOpenTaskId] = useState<string | null>(() =>
    searchParams.get("task")
  );

  /* Adopt fresh server data when a revalidation delivers a new array. */
  if (initialTasks !== serverTasks) {
    setServerTasks(initialTasks);
    setTasks(initialTasks);
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const columns = useMemo(() => {
    const grouped: Record<TaskStatus, Task[]> = {
      todo: [],
      in_progress: [],
      review: [],
      done: [],
    };
    for (const task of tasks) grouped[task.status]?.push(task);
    for (const status of TASK_STATUSES) {
      grouped[status].sort((a, b) => a.position - b.position);
    }
    return grouped;
  }, [tasks]);

  const activeTask = tasks.find((t) => t.id === activeId) ?? null;
  const openTask = tasks.find((t) => t.id === openTaskId) ?? null;

  const columnOf = useCallback(
    (id: string): TaskStatus | null => {
      if ((TASK_STATUSES as readonly string[]).includes(id)) {
        return id as TaskStatus;
      }
      return tasks.find((t) => t.id === id)?.status ?? null;
    },
    [tasks]
  );

  const handleDragStart = (event: DragStartEvent) =>
    setActiveId(String(event.active.id));

  /* Move the dragged card between columns while hovering. */
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeIdStr = String(active.id);
    const overIdStr = String(over.id);

    const from = columnOf(activeIdStr);
    const to = columnOf(overIdStr);
    if (!from || !to || from === to) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === activeIdStr ? { ...task, status: to } : task
      )
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const taskId = String(active.id);
    const overId = String(over.id);
    const status = columnOf(overId);
    if (!status) return;

    const inColumn = tasks
      .filter((t) => t.status === status && t.id !== taskId)
      .sort((a, b) => a.position - b.position);

    const overIndex = inColumn.findIndex((t) => t.id === overId);
    const insertAt = overIndex === -1 ? inColumn.length : overIndex;

    const before = inColumn[insertAt - 1]?.position ?? 0;
    const after = inColumn[insertAt]?.position ?? before + GAP * 2;
    const position = (before + after) / 2;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status, position } : task
      )
    );

    startTransition(async () => {
      await moveTaskAction({ taskId, projectId, status, position });
      router.refresh();
    });
  };

  const closeTask = useCallback(() => {
    setOpenTaskId(null);
    if (searchParams.get("task")) {
      router.replace(`/projects/${projectId}`, { scroll: false });
    }
  }, [projectId, router, searchParams]);

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveId(null)}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {TASK_STATUSES.map((status) => (
            <Column
              key={status}
              status={status}
              tasks={columns[status]}
              onAdd={() => setComposingIn(status)}
            >
              <SortableContext
                items={columns[status].map((t) => t.id)}
                strategy={verticalListSortingStrategy}
              >
                {columns[status].map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onOpen={() => setOpenTaskId(task.id)}
                  />
                ))}
              </SortableContext>

              <button
                type="button"
                onClick={() => setComposingIn(status)}
                className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-line py-2.5 text-xs font-medium text-slate-gray transition-colors hover:border-accent/50 hover:text-accent"
              >
                <Plus className="size-3.5" aria-hidden />
                Add task to {STATUS_META[status].label.toLowerCase()}
              </button>
            </Column>
          ))}
        </div>

        <DragOverlay dropAnimation={{ duration: 200, easing: "cubic-bezier(0.22,1,0.36,1)" }}>
          {activeTask ? <TaskCard task={activeTask} overlay /> : null}
        </DragOverlay>
      </DndContext>

      {/* Create */}
      <TaskDialog
        key={composingIn ? `create-${composingIn}` : "create-closed"}
        open={composingIn !== null}
        onClose={() => setComposingIn(null)}
        projectId={projectId}
        members={members}
        status={composingIn ?? "todo"}
      />

      {/* Edit */}
      {openTask ? (
        <TaskDialog
          key={openTask.id}
          open
          onClose={closeTask}
          projectId={projectId}
          members={members}
          task={openTask}
          status={openTask.status}
        />
      ) : null}
    </>
  );
};
