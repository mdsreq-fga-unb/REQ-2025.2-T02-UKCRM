/**
 * Unified Teams Hook
 *
 * Usage:
 * import { useTeamsData } from './hooks/useTeamsData';
 *
 * function MyComponent() {
 *   const { teams, members, isLoading, handleCreate, handleDelete, ... } = useTeamsData();
 * }
 */

import { useTeamsBackend } from "./useTeamsBackend";

export function useTeamsData() {
  return useTeamsBackend();
}
