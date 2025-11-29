/**
 * Unified Teams Hook
 *
 * This hook automatically switches between mock data and real backend
 * based on the feature flag configuration.
 *
 * Usage:
 * import { useTeamsData } from './hooks/useTeamsData';
 *
 * function MyComponent() {
 *   const { teams, members, isLoading, handleCreate, handleDelete, ... } = useTeamsData();
 * }
 */

import { featureFlags, shouldUseMock } from "@/config/features";
import { useTeamsMock } from "./useTeamsMock";
import { useTeamsBackend } from "./useTeamsBackend";

export function useTeamsData() {
  const useMockData = shouldUseMock(featureFlags.USE_MOCK_TEAMS);

  // Switch between mock and real implementation
  if (useMockData) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTeamsMock();
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useTeamsBackend();
  }
}
