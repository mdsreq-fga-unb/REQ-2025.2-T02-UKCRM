import InactivityBadge from "@/components/InactivityBadge";
import { TemperatureBadge } from "@/components/TemperatureBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { daysSince } from "@/lib/dateUtils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import {
  GripVertical,
  IdCardIcon,
  UserIcon,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { usePermissions } from "@/auth/hooks/usePermissions";
import type { Lead, LeadDragData } from "../types/kanban.types";

interface LeadCardProps {
  lead: Lead;
  isOverlay?: boolean;
  onViewDetails?: (lead: Lead) => void;
  onEdit?: (lead: Lead) => void;
  onDelete?: (lead: Lead) => void;
  onAssign?: (lead: Lead) => void;
  onMarkGainLoss?: (lead: Lead) => void;
}

export type LeadType = "Lead";

export function LeadCard({
  lead,
  isOverlay,
  onViewDetails,
  onEdit,
  onDelete,
  onAssign,
  onMarkGainLoss,
}: LeadCardProps) {
  const { hasPermission } = usePermissions();

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

  // Permission checks
  const canEdit = hasPermission("lead:edit");
  const canDelete = hasPermission("lead:delete");
  const canAssign = hasPermission("lead:assign");
  const canMarkGainLoss = hasPermission("lead:status:change");

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

          {/* Actions Menu */}
          {!isOverlay && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon-sm" variant="ghost" className="ml-1">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Ações</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onViewDetails?.(lead)}>
                  <Eye className="mr-2 h-4 w-4" />
                  Ver Detalhes
                </DropdownMenuItem>

                {canEdit && (
                  <DropdownMenuItem onClick={() => onEdit?.(lead)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </DropdownMenuItem>
                )}

                {canAssign && (
                  <DropdownMenuItem onClick={() => onAssign?.(lead)}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Atribuir
                  </DropdownMenuItem>
                )}

                {canMarkGainLoss && lead.status !== "Gained" && lead.status !== "Lost" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onMarkGainLoss?.(lead)}>
                      <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                      Marcar Ganho/Perda
                    </DropdownMenuItem>
                  </>
                )}

                {canDelete && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete?.(lead)}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      <CardContent className="px-3 py-2 text-left whitespace-pre-wrap text-muted-foreground">
        {lead.content}
        <div className="flex justify-between items-center w-full mt-2">
          <Button size="icon-sm" variant="ghost" title="Membro atribuído">
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
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => onViewDetails?.(lead)}
            title="Ver detalhes"
          >
            <IdCardIcon className="size-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
