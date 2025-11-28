import { type Active, type DataRef, type Over } from "@dnd-kit/core";
import { type ColumnDragData } from "@/pages/Funnel/components/BoardColumn";
import { type LeadDragData } from "@/pages/Funnel/components/LeadCard";

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
