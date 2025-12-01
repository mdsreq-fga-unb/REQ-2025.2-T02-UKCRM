/**
 * Unified Organizations Hook
 *
 * Usage:
 * import { useOrganizacoesData } from './hooks/useOrganizacoesData';
 *
 * function MyComponent() {
 *   const { organizations, isLoading, handleCreate, handleDelete, ... } = useOrganizacoesData();
 * }
 */

import { useOrganizacoesBackend } from "./useOrganizacoesBackend";

export function useOrganizacoesData() {
  return useOrganizacoesBackend();
}
