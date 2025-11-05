import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { daysSince } from "@/lib/date-utils";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { GripVertical, IdCardIcon, UserIcon } from "lucide-react";
import InactivityBadge from "./InactivityBadge";
import { type ColumnId } from "./KanbanBoard";
import { TemperatureBadge } from "./TemperatureBadge";
import type { TemperatureVariant } from "@/lib/temperature";

export interface Task {
  id: UniqueIdentifier;
  columnId: ColumnId;
  title: string;
  earning: number;
  content: string;
  temperature: TemperatureVariant;
  date: Date;
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
      <CardHeader className="px-3 py-2 border-b-2 border-secondary relative">
        <div className="flex flex-row items-center">
          <Button
            size="icon"
            variant={"ghost"}
            {...attributes}
            {...listeners}
            className="p-1 text-muted-foreground -ml-2 mb-0 h-auto cursor-grab"
          >
            <span className="sr-only">Move task</span>
            <GripVertical />
          </Button>
          <span className="mb-0">{task.title}</span>
          <InactivityBadge days={daysSince(task.date)} />
          <TemperatureBadge variant={task.temperature} className="ml-auto">
            {task.temperature}
          </TemperatureBadge>
        </div>
      </CardHeader>
      <CardContent className="px-3 py-2 text-left whitespace-pre-wrap text-muted-foreground">
        {task.content}
        <div className="flex justify-between items-center w-full">
          <Button size="icon-sm" variant="ghost">
            <Avatar className="size-5">
              <AvatarImage src="https://github.com/Carlos-UCH.png" />
              <AvatarFallback>
                <UserIcon />
              </AvatarFallback>
            </Avatar>
          </Button>
          <span>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(task.earning)}
          </span>
          <Button size="icon-sm" variant="ghost">
            <IdCardIcon className="size-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
