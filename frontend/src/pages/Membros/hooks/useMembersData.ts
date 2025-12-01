/**
 * Unified Members Hook
 *
 * Usage:
 * import { useMembersData } from './hooks/useMembersData';
 *
 * function MyComponent() {
 *   const { members, isLoading, handleCreate, handleDelete, ... } = useMembersData();
 * }
 */

import { useMembersBackend } from "./useMembersBackend";

export function useMembersData() {
  return useMembersBackend();
}
