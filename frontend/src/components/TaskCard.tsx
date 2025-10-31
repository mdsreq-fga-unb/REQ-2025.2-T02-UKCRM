import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cva } from "class-variance-authority";
import { GripVertical, IdCardIcon, UserIcon } from "lucide-react";
import { type ColumnId } from "./KanbanBoard";
import { TemperatureBadge } from "./TemperatureBadge";

export interface Task {
  id: UniqueIdentifier;
  columnId: ColumnId;
  title: string;
  content: string;
}

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
}

export type TaskType = "Task";

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    } satisfies TaskDragData,
    attributes: {
      roleDescription: "Task",
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva("", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
      },
    },
  });

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className="px-3 py-3 space-between flex flex-row border-b-2 border-secondary relative">
        <Button
          size="icon"
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className="p-1 text-secondary-foreground/50 -ml-2 mb-0 mr-1 h-auto cursor-grab"
        >
          <span className="sr-only">Move task</span>
          <GripVertical />
        </Button>
        <span className="mb-0">{task.title}</span>
        <TemperatureBadge variant="warm" className="ml-auto">Morno</TemperatureBadge>
      </CardHeader>
      <CardContent className="p-3 text-left whitespace-pre-wrap text-foreground/50">
        {task.content}
        <div className="flex justify-between items-center w-full">
          <Button size="icon-sm" variant="ghost">
            <UserIcon />
          </Button>
          <span>R$ 7.000,00</span>
          <Button size="icon-sm" variant="ghost">
            <IdCardIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
