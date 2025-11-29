import { apiClient } from "@/lib/apiClient";

// TIPOS

export type ApiSalesTeam = {
  id: number;
  name: string;
};

// TIMES

export const fetchSalesTeams = (signal?: AbortSignal) =>
  apiClient<ApiSalesTeam[]>("/api/teams/", { signal });
