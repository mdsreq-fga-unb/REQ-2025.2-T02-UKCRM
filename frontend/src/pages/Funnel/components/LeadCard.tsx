import InactivityBadge from "@/components/InactivityBadge";
import { TemperatureBadge } from "@/components/TemperatureBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { daysSince } from "@/lib/dateUtils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { GripVertical, IdCardIcon, UserIcon } from "lucide-react";
import type { Lead, LeadDragData } from "../types/kanban.types";

interface LeadCardProps {
  lead: Lead;
  isOverlay?: boolean;
}

export type LeadType = "Lead";

export function LeadCard({ lead, isOverlay }: LeadCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: lead.id,
    data: {
      type: "Lead",
      lead,
    } satisfies LeadDragData,
    attributes: {
      roleDescription: "Lead",
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
            <span className="sr-only">Move lead</span>
            <GripVertical />
          </Button>
          <span className="mb-0">{lead.name}</span>
          <InactivityBadge days={daysSince(lead.updatedAt)} />
          <TemperatureBadge variant={lead.temperature} className="ml-auto">
            {lead.temperature}
          </TemperatureBadge>
        </div>
      </CardHeader>
      <CardContent className="px-3 py-2 text-left whitespace-pre-wrap text-muted-foreground">
        {lead.content}
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
            }).format(lead.earning)}
          </span>
          <Button size="icon-sm" variant="ghost">
            <IdCardIcon className="size-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
