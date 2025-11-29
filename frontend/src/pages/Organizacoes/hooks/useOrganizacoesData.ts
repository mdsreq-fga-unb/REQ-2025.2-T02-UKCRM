/**
 * Unified Organizations Hook
 *
 * This hook automatically switches between mock data and real backend
 * based on the feature flag configuration.
 *
 * Usage:
 * import { useOrganizacoesData } from './hooks/useOrganizacoesData';
 *
 * function MyComponent() {
 *   const { organizations, isLoading, handleCreate, handleDelete, ... } = useOrganizacoesData();
 * }
 */

import { featureFlags, shouldUseMock } from "@/config/features";
import { useOrganizacoesMock } from "./useOrganizacoesMock";
import { useOrganizacoesBackend } from "./useOrganizacoesBackend";

export function useOrganizacoesData() {
  const useMockData = shouldUseMock(featureFlags.USE_MOCK_ORGANIZATIONS);

  // Switch between mock and real implementation
  if (useMockData) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useOrganizacoesMock();
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useOrganizacoesBackend();
  }
}
