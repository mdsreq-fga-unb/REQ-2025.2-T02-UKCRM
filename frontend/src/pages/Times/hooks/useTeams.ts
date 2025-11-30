import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  type ApiTeam,
  type ApiTeamCreatePayload,
  type ApiTeamUpdatePayload
} from "../api/teams.api";

// Query key factory
const teamKeys = {
  all: ["teams"] as const,
  lists: () => [...teamKeys.all, "list"] as const,
  details: (id: number) => [...teamKeys.all, "detail", id] as const,
};

// Fetch all teams
export function useTeams() {
  return useQuery({
    queryKey: teamKeys.lists(),
    queryFn: ({ signal }) => fetchTeams(signal),
  });
}

// Create team
export function useCreateTeam(onSuccess?: (team: ApiTeam) => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ApiTeamCreatePayload) => createTeam(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
      onSuccess?.(data);
    },
  });
}

// Update team
export function useUpdateTeam(onSuccess?: (team: ApiTeam) => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: ApiTeamUpdatePayload }) =>
      updateTeam(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
      queryClient.invalidateQueries({ queryKey: teamKeys.details(data.id) });
      onSuccess?.(data);
    },
  });
}

// Delete team
export function useDeleteTeam(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTeam(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.lists() });
      onSuccess?.();
    },
  });
}
