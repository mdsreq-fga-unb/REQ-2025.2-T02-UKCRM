import {
  type DragEndEvent,
  type DragStartEvent,
  type Active,
  type Over,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import { coordinateGetter } from "@/lib/dnd/multipleContainersKeyboardPreset";
import { hasDraggableData } from "@/lib/dnd/draggable";
import type { Column, Lead, LeadDropEvent } from "../types/kanban.types";

// --- HELPERS ---

function calculateColumnMove(active: Active, over: Over, columns: Column[]) {
  const activeId = active.id;
  const overId = over.id;

  const activeIndex = columns.findIndex((col) => col.id === activeId);
  const overIndex = columns.findIndex((col) => col.id === overId);

  if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex) {
    return null;
  }

  return { activeIndex, overIndex };
}

function calculateLeadMove(active: Active, over: Over, leads: Lead[]) {
  const activeData = active.data.current;
  const overData = over.data.current;

  if (!activeData || activeData.type !== "Lead" || !overData) return null;

  let newColumnId: UniqueIdentifier | null = null;
  let newOrder = 0;

  if (overData.type === "Lead") {
    const overLead = overData.lead;
    newColumnId = overLead.columnId;

    const leadsInTarget = leads.filter((l) => l.columnId === newColumnId);
    const overIndex = leadsInTarget.findIndex((l) => l.id === overLead.id);

    if (overIndex === -1) return null;
    newOrder = overIndex;
  } else if (overData.type === "Column") {
    newColumnId = overData.column.id;
    const leadsInTarget = leads.filter((l) => l.columnId === newColumnId);
    newOrder = leadsInTarget.length;
  }

  if (!newColumnId) return null;

  return { newColumnId, newOrder };
}

// --- HOOK PRINCIPAL ---

type UseKanbanDragProps = {
  columns: Column[];
  leads: Lead[];
  onColumnsChange: (cols: Column[]) => void;
  onColumnDrop: (id: UniqueIdentifier, order: number) => void;
  onLeadDrop: (event: LeadDropEvent) => void;
};

export function useKanbanDrag({
  columns,
  leads,
  onColumnsChange,
  onColumnDrop,
  onLeadDrop,
}: UseKanbanDragProps) {
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeLead, setActiveLead] = useState<Lead | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter }),
  );

  function onDragStart(event: DragStartEvent) {
    if (!hasDraggableData(event.active)) return;
    const data = event.active.data.current;
    if (data?.type === "Column") setActiveColumn(data.column);
    if (data?.type === "Lead") setActiveLead(data.lead);
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveLead(null);

    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;
    if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeData = active.data.current;
    if (!activeData) return;

    // --- COLUNAS ---
    if (activeData.type === "Column") {
      const moveResult = calculateColumnMove(active, over, columns);

      if (moveResult) {
        onColumnsChange(
          arrayMove(columns, moveResult.activeIndex, moveResult.overIndex),
        );
        onColumnDrop(active.id, moveResult.overIndex);
      }
      return;
    }

    // --- LEADS ---
    if (activeData.type === "Lead") {
      const moveResult = calculateLeadMove(active, over, leads);

      if (moveResult) {
        onLeadDrop({
          leadId: active.id,
          newColumnId: moveResult.newColumnId,
          newOrder: moveResult.newOrder,
        });
      }
    }
  }

  return {
    activeColumn,
    activeLead,
    sensors,
    onDragStart,
    onDragEnd,
  };
}
