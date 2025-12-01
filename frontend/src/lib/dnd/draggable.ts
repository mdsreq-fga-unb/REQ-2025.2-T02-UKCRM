import { type Active, type DataRef, type Over } from "@dnd-kit/core";
import {
  type ColumnDragData,
  type LeadDragData,
} from "@/pages/Funnel/types/kanban.types";

type DraggableData = ColumnDragData | LeadDragData;

export function hasDraggableData<T extends Active | Over>(
  entry: T | null | undefined,
): entry is T & {
  data: DataRef<DraggableData>;
} {
  if (!entry) {
    return false;
  }

  const data = entry.data.current;

  if (data?.type === "Column" || data?.type === "Lead") {
    return true;
  }

  return false;
}
