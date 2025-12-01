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
  Mail,
  Phone,
} from "lucide-react";
import { usePermissions } from "@/auth/hooks/usePermissions";
import type { Lead, LeadDragData } from "../types/kanban.types";

interface LeadCardProps {
  lead: Lead;
  isOverlay?: boolean;
  onEditClick?: (lead: Lead) => void;
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
  onEditClick,
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

  // Determine border color based on lead status
  const getBorderClass = () => {
    if (lead.status === "Gained") {
      return "border-2 border-green-500";
    }
    if (lead.status === "Lost") {
      return "border-2 border-red-500";
    }
    return "";
  };

  // Permission checks
  const canEdit = hasPermission("lead:edit");
  const canDelete = hasPermission("lead:delete");
  const canAssign = hasPermission("lead:assign");
  const canMarkGainLoss = hasPermission("lead:status:change");

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`${variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })} ${getBorderClass()}`}
    >
      <CardHeader className="px-3 py-2 border-b-2 border-secondary relative">
        <div className="flex flex-row items-center">
          <Button
            size="icon"
            variant={"ghost"}
            {...attributes}
            {...listeners}
            className="p-0 w-6 h-auto text-muted-foreground -ml-2 cursor-grab"
          >
            <span className="sr-only">Move lead</span>
            <GripVertical className="w-4 h-4" />
          </Button>
          <span
            className="mb-0 font-medium truncate max-w-40"
            title={lead.name}
          >
            {lead.name}
          </span>
          <InactivityBadge days={daysSince(lead.updatedAt)} />
          <TemperatureBadge variant={lead.temperature} className="ml-auto">
            {lead.temperature}
          </TemperatureBadge>

          {/* Actions Menu - Agora exibido mesmo no overlay (drag) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="ml-1 h-6 w-6">
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
                <DropdownMenuItem onClick={() => onEditClick?.(lead)}>
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

              {canMarkGainLoss &&
                lead.status !== "Gained" &&
                lead.status !== "Lost" && (
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
        </div>
      </CardHeader>
      <CardContent className="px-3 py-2 text-left text-muted-foreground">
        {/* Mostra Email e Telefone se disponíveis, em vez de um ou outro */}
        <div className="flex flex-col gap-1 text-xs">
          {lead.email && (
            <div
              className="flex items-center gap-2 overflow-hidden"
              title={lead.email}
            >
              <Mail className="h-3 w-3 shrink-0" />
              <span className="truncate">{lead.email}</span>
            </div>
          )}
          {lead.phone && (
            <div className="flex items-center gap-2" title={lead.phone}>
              <Phone className="h-3 w-3 shrink-0" />
              <span>{lead.phone}</span>
            </div>
          )}
          {/* Fallback para conteúdo/obs se não houver contato */}
          {!lead.email && !lead.phone && lead.content && (
            <span className="line-clamp-2">{lead.content}</span>
          )}
        </div>

        <div className="flex justify-between items-center w-full mt-2">
          <Button
            size="icon"
            variant="ghost"
            title="Membro atribuído"
            className="h-6 w-6"
            onClick={() => onAssign?.(lead)}
          >
            <Avatar className="size-5">
              <AvatarImage src="https://github.com/Carlos-UCH.png" />
              <AvatarFallback>
                <UserIcon />
              </AvatarFallback>
            </Avatar>
          </Button>
          <span className="text-sm font-semibold">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(lead.earning)}
          </span>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onViewDetails?.(lead)}
            title="Ver detalhes"
            className="h-6 w-6"
          >
            <IdCardIcon className="size-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
