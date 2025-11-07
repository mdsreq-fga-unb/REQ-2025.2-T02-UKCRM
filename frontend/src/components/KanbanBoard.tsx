import {
  type Dispatch,
  type SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import {
  type Announcements,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { PlusIcon } from "lucide-react";
import type { Column } from "./BoardColumn";
import { BoardColumn, BoardContainer } from "./BoardColumn";
import { coordinateGetter } from "./multipleContainersKeyboardPreset";
import { type Task, TaskCard } from "./TaskCard";
import { Button } from "./ui/button";
import { hasDraggableData } from "./utils";

export type ColumnId = Column["id"];

export type KanbanBoardProps = {
  columns: Column[];
  getFilteredAndSortedTasks: (columnId: ColumnId) => Task[];
  onColumnsChange: Dispatch<SetStateAction<Column[]>>;
  onTasksChange: Dispatch<SetStateAction<Task[]>>;
  onAddTask: (columnId: ColumnId) => void;
  onAddColumn: () => void;
};

export function KanbanBoard({
  columns,
  getFilteredAndSortedTasks,
  onColumnsChange,
  onTasksChange,
  onAddTask,
  onAddColumn,
}: KanbanBoardProps) {
  const pickedUpTaskColumn = useRef<ColumnId | null>(null);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  function getDraggingTaskData(taskId: UniqueIdentifier, columnId: ColumnId) {
    const tasksInColumn = getFilteredAndSortedTasks(columnId);
    const taskPosition = tasksInColumn.findIndex((task) => task.id === taskId);
    const column = columns.find((col) => col.id === columnId);
    return {
      tasksInColumn,
      taskPosition,
      column,
    };
  }

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: coordinateGetter,
    }),
  );

  const announcements: Announcements = {
    onDragStart({ active }) {
      if (!hasDraggableData(active)) return;
      if (active.data.current?.type === "Column") {
        const startColumnIdx = columnsId.findIndex((id) => id === active.id);
        const startColumn = columns[startColumnIdx];
        return `Picked up Column ${startColumn?.title} at position: ${
          startColumnIdx + 1
        } of ${columnsId.length}`;
      } else if (active.data.current?.type === "Task") {
        pickedUpTaskColumn.current = active.data.current.task.columnId;
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          active.id,
          pickedUpTaskColumn.current,
        );
        return `Picked up Task ${
          active.data.current.task.content
        } at position: ${taskPosition + 1} of ${
          tasksInColumn.length
        } in column ${column?.title}`;
      }
    },
    onDragOver({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) return;

      if (
        active.data.current?.type === "Column" &&
        over.data.current?.type === "Column"
      ) {
        const overColumnIdx = columnsId.findIndex((id) => id === over.id);
        return `Column ${active.data.current.column.title} was moved over ${
          over.data.current.column.title
        } at position ${overColumnIdx + 1} of ${columnsId.length}`;
      } else if (
        active.data.current?.type === "Task" &&
        over.data.current?.type === "Task"
      ) {
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          over.id,
          over.data.current.task.columnId,
        );
        if (over.data.current.task.columnId !== pickedUpTaskColumn.current) {
          return `Task ${
            active.data.current.task.content
          } was moved over column ${column?.title} in position ${
            taskPosition + 1
          } of ${tasksInColumn.length}`;
        }
        return `Task was moved over position ${taskPosition + 1} of ${
          tasksInColumn.length
        } in column ${column?.title}`;
      }
    },
    onDragEnd({ active, over }) {
      if (!hasDraggableData(active) || !hasDraggableData(over)) {
        pickedUpTaskColumn.current = null;
        return;
      }
      if (
        active.data.current?.type === "Column" &&
        over.data.current?.type === "Column"
      ) {
        const overColumnPosition = columnsId.findIndex((id) => id === over.id);

        return `Column ${
          active.data.current.column.title
        } was dropped into position ${overColumnPosition + 1} of ${
          columnsId.length
        }`;
      } else if (
        active.data.current?.type === "Task" &&
        over.data.current?.type === "Task"
      ) {
        const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
          over.id,
          over.data.current.task.columnId,
        );
        if (over.data.current.task.columnId !== pickedUpTaskColumn.current) {
          return `Task was dropped into column ${column?.title} in position ${
            taskPosition + 1
          } of ${tasksInColumn.length}`;
        }
        return `Task was dropped into position ${taskPosition + 1} of ${
          tasksInColumn.length
        } in column ${column?.title}`;
      }
      pickedUpTaskColumn.current = null;
    },
    onDragCancel({ active }) {
      pickedUpTaskColumn.current = null;
      if (!hasDraggableData(active)) return;
      return `Dragging ${active.data.current?.type} cancelled.`;
    },
  };

  return (
    <DndContext
      accessibility={{
        announcements,
      }}
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <BoardContainer>
        <SortableContext items={columnsId}>
          {columns.map((col) => (
            <BoardColumn
              key={col.id}
              column={col}
              tasks={getFilteredAndSortedTasks(col.id)}
              onAddTask={onAddTask}
            />
          ))}
        </SortableContext>
        <Button
          variant="outline"
          className="h-full w-[350px] max-w-full shrink-0 snap-center flex items-center justify-center"
          onClick={onAddColumn}
        >
          <PlusIcon /> Adicionar Etapa
        </Button>
      </BoardContainer>

      {"document" in window &&
        createPortal(
          <DragOverlay>
            {activeColumn && (
              <BoardColumn
                isOverlay
                column={activeColumn}
                tasks={getFilteredAndSortedTasks(activeColumn.id)}
                onAddTask={onAddTask}
              />
            )}
            {activeTask && <TaskCard task={activeTask} isOverlay />}
          </DragOverlay>,
          document.body,
        )}
    </DndContext>
  );

  function onDragStart(event: DragStartEvent) {
    if (!hasDraggableData(event.active)) return;
    const data = event.active.data.current;
    if (data?.type === "Column") {
      setActiveColumn(data.column);
      return;
    }

    if (data?.type === "Task") {
      setActiveTask(data.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;
    if (!hasDraggableData(active)) return;

    const activeId = active.id;
    const overId = over.id;
    const activeData = active.data.current;
    if (!activeData) return;

    if (activeData.type === "Column") {
      if (activeId === overId) return;
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
      const overColumnIndex = columns.findIndex((col) => col.id === overId);
      onColumnsChange(arrayMove(columns, activeColumnIndex, overColumnIndex));
      return;
    }

    if (activeData.type === "Task") {
      if (activeId === overId) return;
      if (!hasDraggableData(over)) return;

      const overData = over.data.current;
      if (!overData) return;

      const taskToMove = activeData.task;

      const newColumnId =
        overData.type === "Task"
          ? overData.task.columnId
          : overData.type === "Column"
            ? overData.column.id
            : null;

      if (!newColumnId) return;

      onTasksChange((prevTasks) => {
        const activeIndex = prevTasks.findIndex((t) => t.id === activeId);
        let overIndex = prevTasks.findIndex((t) => t.id === overId);

        if (taskToMove.columnId === newColumnId) {
          if (overData.type === "Column") {
            return prevTasks;
          }
          return arrayMove(prevTasks, activeIndex, overIndex);
        }

        const newTasks = prevTasks.filter((t) => t.id !== activeId);

        overIndex = newTasks.findIndex((t) => t.id === overId);

        if (overData.type === "Column") {
          const tasksInNewColumn = newTasks.filter(
            (t) => t.columnId === newColumnId,
          );
          if (tasksInNewColumn.length > 0) {
            const lastTask = tasksInNewColumn[tasksInNewColumn.length - 1];
            overIndex = newTasks.findIndex((t) => t.id === lastTask.id);
          } else {
            overIndex = -1;
          }
        }

        newTasks.splice(overIndex + 1, 0, {
          ...taskToMove,
          columnId: newColumnId,
        });

        return newTasks;
      });
    }
  }
}
