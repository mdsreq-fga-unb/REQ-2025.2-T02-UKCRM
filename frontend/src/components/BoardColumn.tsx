import { useDndContext, type UniqueIdentifier } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { GripHorizontal, PencilIcon, PlusIcon } from "lucide-react";
import { useMemo } from "react";
import { TaskCard, type Task } from "./TaskCard";
import { temperatureSortOrder } from "./TemperatureBadge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

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
  filterTerm: string;
  sortCriteria: string | null;
  onAddTask: (columnId: UniqueIdentifier) => void;
}

export function BoardColumn({
  column,
  tasks,
  isOverlay,
  filterTerm,
  sortCriteria,
  onAddTask,
}: BoardColumnProps) {
  const displayedTasks = useMemo(() => {
    const filteredTasks = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(filterTerm.toLowerCase()) ||
        task.content.toLowerCase().includes(filterTerm.toLowerCase()),
    );

    if (sortCriteria === "valor-desc") {
      filteredTasks.sort((a, b) => b.earning - a.earning);
    } else if (sortCriteria === "valor-asc") {
      filteredTasks.sort((a, b) => a.earning - b.earning);
    } else if (sortCriteria === "temperatura") {
      filteredTasks.sort(
        (a, b) =>
          temperatureSortOrder[a.temperature] -
          temperatureSortOrder[b.temperature],
      );
    }

    return filteredTasks;
  }, [tasks, filterTerm, sortCriteria]);

  const tasksIds = useMemo(() => {
    return displayedTasks.map((task) => task.id);
  }, [displayedTasks]);

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
    "h-[600px] w-[350px] max-w-full bg-sidebar flex flex-col flex-shrink-0 snap-center",
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
      <CardHeader className="pt-1 pb-1 pl-2 pr-2 padding border-b-2 flex flex-col">
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className="h-fit p-0 text-secondary-foreground/50 cursor-grab relative"
        >
          <span className="sr-only">{`Move column: ${column.title}`}</span>
          <GripHorizontal />
        </Button>
        <div className="flex justify-center items-center w-full">
          <span className="font-semibold mb-0">{column.title}</span>
          <Button
            className="text-secondary-foreground/50 "
            size="icon-sm"
            variant="ghost"
          >
            <PencilIcon />
          </Button>
        </div>
        <div className="flex justify-between items-center w-full text-foreground/50">
          <span>{column.subtitle_left}</span>
          <span>{column.subtitle_right}</span>
        </div>
      </CardHeader>
      <Button
        variant="ghost"
        className="w-full h-fit rounded-none text-secondary-foreground/50"
        onClick={() => onAddTask(column.id)}
      >
        <PlusIcon />
      </Button>
      <ScrollArea>
        <CardContent className="flex grow flex-col gap-2 p-2 pt-0 ">
          <SortableContext items={tasksIds}>
            {displayedTasks.map((task) => (
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

  const variations = cva("px-2 md:px-0 flex lg:justify-center pb-4", {
    variants: {
      dragging: {
        default: "snap-x snap-mandatory",
        active: "snap-none",
      },
    },
  });

  return (
    <ScrollArea
      className={variations({
        dragging: dndContext.active ? "active" : "default",
      })}
    >
      <div className="p-1 flex gap-4 items-center flex-row justify-center">
        {children}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
