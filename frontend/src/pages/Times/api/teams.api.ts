import { apiClient } from "@/lib/apiClient";

// TIPOS

export type ApiTeam = {
  id: number;
  name: string;
  member_count: number;
  created_at: string;
  updated_at: string;
  members: number[];
};

export type ApiTeamCreatePayload = {
  name: string;
  member_ids: number[];
};

export type ApiTeamUpdatePayload = {
  name?: string;
  member_ids?: number[];
};

// TEAMS

export const fetchTeams = (signal?: AbortSignal) =>
  apiClient<ApiTeam[]>("/api/teams/", { signal });

export const fetchTeamDetails = (id: number, signal?: AbortSignal) =>
  apiClient<ApiTeam>(`/api/teams/${id}/`, { signal });

export const createTeam = (payload: ApiTeamCreatePayload) =>
  apiClient<ApiTeam>("/api/teams/", { method: "POST", body: payload });

export const updateTeam = (id: number, payload: ApiTeamUpdatePayload) =>
  apiClient<ApiTeam>(`/api/teams/${id}/`, { method: "PATCH", body: payload });

export const deleteTeam = (id: number) =>
  apiClient(`/api/teams/${id}/`, { method: "DELETE" });
