import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchMembers,
  createMember,
  updateMember,
  deleteMember,
  type ApiMember,
  type ApiMemberCreatePayload,
  type ApiMemberUpdatePayload,
  type ApiMemberDeletePayload
} from "../api/members.api";

// Query key factory
const memberKeys = {
  all: ["members"] as const,
  lists: () => [...memberKeys.all, "list"] as const,
  details: (id: number) => [...memberKeys.all, "detail", id] as const,
};

// Fetch all members
export function useMembers() {
  return useQuery({
    queryKey: memberKeys.lists(),
    queryFn: ({ signal }) => fetchMembers(signal),
  });
}

// Create member
export function useCreateMember(onSuccess?: (member: ApiMember) => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ApiMemberCreatePayload) => createMember(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: memberKeys.lists() });
      onSuccess?.(data);
    },
    onError: (error: any) => {
      console.error("Error creating member:", error);
      alert(`Erro ao criar membro: ${error.message}`);
    },
  });
}

// Update member
export function useUpdateMember(onSuccess?: (member: ApiMember) => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: ApiMemberUpdatePayload }) =>
      updateMember(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: memberKeys.lists() });
      queryClient.invalidateQueries({ queryKey: memberKeys.details(data.id) });
      onSuccess?.(data);
    },
  });
}

// Delete member
export function useDeleteMember(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload?: ApiMemberDeletePayload }) =>
      deleteMember(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.lists() });
      onSuccess?.();
    },
  });
}
