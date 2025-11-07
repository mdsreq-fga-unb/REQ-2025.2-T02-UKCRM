import { useDndContext, type UniqueIdentifier } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { GripHorizontal, PencilIcon, PlusIcon } from "lucide-react";
import { useMemo } from "react";
import { TaskCard, type Task } from "./TaskCard";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import React from "react";

export interface Column {
  id: UniqueIdentifier;
  title: string;
  subtitle_left?: string;
  subtitle_right?: string;
}

export type ColumnType = "Column";

export interface ColumnDragData {
  type: ColumnType;
  column: Column;
}

interface BoardColumnProps {
  column: Column;
  tasks: Task[];
  isOverlay?: boolean;
  onAddTask: (columnId: UniqueIdentifier) => void;
}

export function BoardColumn({
  column,
  tasks,
  isOverlay,
  onAddTask,
}: BoardColumnProps) {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    } satisfies ColumnDragData,
    attributes: {
      roleDescription: `Column: ${column.title}`,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva(
    "w-[350px] max-w-full bg-sidebar flex flex-col flex-shrink-0 snap-center",
    {
      variants: {
        dragging: {
          default: "border-2 border-transparent",
          over: "ring-2 opacity-30",
          overlay: "ring-2 ring-primary",
        },
      },
    },
  );

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className="py-1 px-2 padding border-b-2 flex flex-col">
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className="h-fit p-0 text-muted-foreground cursor-grab relative"
        >
          <span className="sr-only">{`Move column: ${column.title}`}</span>
          <GripHorizontal />
        </Button>
        <div className="flex justify-center items-center w-full">
          <span className="font-semibold mb-0">{column.title}</span>
          <Button
            className="text-muted-foreground "
            size="icon-sm"
            variant="ghost"
          >
            <PencilIcon />
          </Button>
        </div>
        <div className="flex justify-between items-center w-full text-muted-foreground">
          <span>{column.subtitle_left}</span>
          <span>{column.subtitle_right}</span>
        </div>
      </CardHeader>
      <Button
        variant="ghost"
        className="w-full h-fit rounded-none text-muted-foreground"
        onClick={() => onAddTask(column.id)}
      >
        <PlusIcon />
      </Button>
      <ScrollArea>
        <CardContent className="flex flex-col gap-2 px-2 pt-0 ">
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}

export function BoardContainer({ children }: { children: React.ReactNode }) {
  const dndContext = useDndContext();

  // https://github.com/shadcn-ui/ui/issues/3833
  const variations = cva(
    "p-2 h-full [&_[data-radix-scroll-area-viewport]>div]:flex! [&_[data-radix-scroll-area-viewport]>div]:h-full!",
    {
      variants: {
        dragging: {
          default: "snap-x snap-mandatory",
          active: "snap-none",
        },
      },
    },
  );

  return (
    <ScrollArea
      className={variations({
        dragging: dndContext.active ? "active" : "default",
      })}
    >
      <div className="p-2 flex flex-row gap-2 justify-center">{children}</div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
