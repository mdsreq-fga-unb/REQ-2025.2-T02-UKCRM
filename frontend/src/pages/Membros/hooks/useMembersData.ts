/**
 * Unified Members Hook
 *
 * This hook automatically switches between mock data and real backend
 * based on the feature flag configuration.
 *
 * Usage:
 * import { useMembersData } from './hooks/useMembersData';
 *
 * function MyComponent() {
 *   const { members, isLoading, handleCreate, handleDelete, ... } = useMembersData();
 * }
 */

import { featureFlags, shouldUseMock } from "@/config/features";
import { useMembersMock } from "./useMembersMock";
import { useMembersBackend } from "./useMembersBackend";

export function useMembersData() {
  const useMockData = shouldUseMock(featureFlags.USE_MOCK_MEMBERS);

  // Switch between mock and real implementation
  if (useMockData) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMembersMock();
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMembersBackend();
  }
}
