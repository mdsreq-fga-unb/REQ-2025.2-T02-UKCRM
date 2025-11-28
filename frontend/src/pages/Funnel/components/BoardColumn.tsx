import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useDndContext, type UniqueIdentifier } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { GripHorizontal, PencilIcon, PlusIcon } from "lucide-react";
import React, { useMemo } from "react";
import { LeadCard } from "./LeadCard";
import type { Column, Lead } from "../types/kanban.types";
import type { ColumnDragData } from "../types/kanban.types";

export type ColumnType = "Column";

interface BoardColumnProps {
  column: Column;
  leads: Lead[];
  isOverlay?: boolean;
  onAddLead: (columnId: UniqueIdentifier) => void;
}

export function BoardColumn({
  column,
  leads,
  isOverlay,
  onAddLead,
}: BoardColumnProps) {
  const leadsIds = useMemo(() => {
    return leads.map((lead) => lead.id);
  }, [leads]);

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
    "h-full w-[350px] max-w-full bg-sidebar flex flex-col flex-shrink-0 snap-center",
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
        onClick={() => onAddLead(column.id)}
      >
        <PlusIcon />
      </Button>
      <ScrollArea className="h-full">
        <CardContent className="flex flex-col grow gap-2 px-2 pt-0 ">
          <SortableContext items={leadsIds}>
            {leads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
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
