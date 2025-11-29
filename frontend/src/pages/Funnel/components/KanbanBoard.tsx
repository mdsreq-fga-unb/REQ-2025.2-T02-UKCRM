import { Button } from "@/components/ui/button";
import { DndContext, DragOverlay, type UniqueIdentifier } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { PlusIcon } from "lucide-react";
import { type Dispatch, type SetStateAction, useMemo } from "react";
import { createPortal } from "react-dom";
import type {
  Column,
  ColumnId,
  Lead,
  LeadDropEvent,
} from "../types/kanban.types";
import { useKanbanDrag } from "./../hooks/useKanbanDrag";
import { BoardColumn, BoardContainer } from "./BoardColumn";
import { LeadCard } from "./LeadCard";

export type KanbanBoardProps = {
  columns: Column[];
  leads: Lead[];
  getFilteredAndSortedLeads: (columnId: ColumnId) => Lead[];
  onColumnsChange: Dispatch<SetStateAction<Column[]>>;
  onColumnDrop: (columnId: UniqueIdentifier, newOrder: number) => void;
  onLeadDrop: (event: LeadDropEvent) => void;
  onAddLead: (columnId: ColumnId) => void;
  onAddColumn: () => void;
};

export function KanbanBoard({
  columns,
  leads,
  getFilteredAndSortedLeads,
  onColumnsChange,
  onColumnDrop,
  onLeadDrop,
  onAddLead,
  onAddColumn,
}: KanbanBoardProps) {
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const { activeColumn, activeLead, sensors, onDragStart, onDragEnd } =
    useKanbanDrag({
      columns,
      leads,
      onColumnsChange,
      onColumnDrop,
      onLeadDrop,
    });

  return (
    <DndContext
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
              leads={getFilteredAndSortedLeads(col.id)}
              onAddLead={onAddLead}
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
          <DragOverlay dropAnimation={null}>
            {activeColumn && (
              <BoardColumn
                isOverlay
                column={activeColumn}
                leads={getFilteredAndSortedLeads(activeColumn.id)}
                onAddLead={onAddLead}
              />
            )}
            {activeLead && <LeadCard lead={activeLead} isOverlay />}
          </DragOverlay>,
          document.body,
        )}
    </DndContext>
  );
}
