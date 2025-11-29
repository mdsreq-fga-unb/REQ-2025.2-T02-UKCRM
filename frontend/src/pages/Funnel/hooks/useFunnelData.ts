/**
 * Unified Funnel Hook
 *
 * This hook automatically switches between mock data and real backend
 * based on the feature flag configuration.
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

import { featureFlags, shouldUseMock } from "@/config/features";
import type { Column, Lead } from "../types/kanban.types";
import { useFunnel } from "./useFunnel";
import { useFunnelMock } from "./useFunnelMock";

export function useFunnelData(initialCols: Column[], initialLeads: Lead[]) {
  const useMockData = shouldUseMock(featureFlags.USE_MOCK_FUNNEL);

  // Switch between mock and real implementation
  if (useMockData) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useFunnelMock(initialCols, initialLeads);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useFunnel(initialCols, initialLeads);
  }
}
