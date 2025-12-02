/**
 * Unified Funnel Hook
 *
 * Usage:
 * import { useFunnelData } from './hooks/useFunnelData';
 *
 * function MyComponent() {
 *   const { actionBar, kanban, createDialog, deleteDialog } = useFunnelData(
 *     defaultCols,
 *     initialLeads
 *   );
 * }
 */

import type { Column, Lead } from "../types/kanban.types";
import { useFunnel } from "./useFunnel";

export function useFunnelData(initialCols: Column[], initialLeads: Lead[]) {
  return useFunnel(initialCols, initialLeads);
}
