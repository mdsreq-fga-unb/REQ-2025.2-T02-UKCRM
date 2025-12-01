import { apiClient } from "@/lib/apiClient";
import type { ApiLead } from "./leads.api";
import type { ApiSalesTeam } from "./teams.api";

// TIPOS

export type ApiStage = {
  id: number;
  name: string;
  order: number;
  funnel: number;
  leads: ApiLead[];
};

export type ApiFunnelDetails = {
  id: number;
  name: string;
  stages: ApiStage[];
};

export type ApiFunnel = {
  id: number;
  name: string;
  teams: ApiSalesTeam[];
};

export type ApiFunnelCreatePayload = {
  name: string;
  team_ids: number[];
};

export type ApiStageCreatePayload = {
  name: string;
  funnel: number;
  order: number;
};

export type ApiStageUpdatePayload = {
  id: number;
  order: number;
};

// FUNILS

export const fetchFunnels = (signal?: AbortSignal) =>
  apiClient<ApiFunnel[]>("/api/funnels/", { signal });

export const fetchFunnelDetails = (id: number, signal?: AbortSignal) =>
  apiClient<ApiFunnelDetails>(`/api/funnels/${id}/`, { signal });

export const createFunnel = (payload: ApiFunnelCreatePayload) =>
  apiClient<ApiFunnel>("/api/funnels/", { method: "POST", body: payload });

export const updateFunnel = (id: number, payload: Partial<ApiFunnelCreatePayload>) =>
  apiClient<ApiFunnel>(`/api/funnels/${id}/`, { method: "PATCH", body: payload });

export const deleteFunnel = (id: number) =>
  apiClient(`/api/funnels/${id}/`, { method: "DELETE" });

// STATISTICS

export type ApiFunnelStatistics = {
  id: number;
  name: string;
  total_leads: number;
  active_leads: number;
  gained_leads: number;
  lost_leads: number;
  total_stages: number;
  total_gains: number;
  total_losses: number;
  net_gain_loss: number;
  conversion_rate: number;
  team_count: number;
  teams: Array<{ id: number; name: string }>;
};

export const fetchFunnelStatistics = (id: number, signal?: AbortSignal) =>
  apiClient<ApiFunnelStatistics>(`/api/funnels/${id}/statistics/`, { signal });

// ETAPAS

export const createStage = (payload: ApiStageCreatePayload) =>
  apiClient<ApiStage>("/api/stages/", { method: "POST", body: payload });

export const updateStage = (payload: ApiStageUpdatePayload) => {
  const { id, order } = payload;
  return apiClient<ApiStage>(`/api/stages/${id}/`, {
    method: "PATCH",
    body: { order },
  });
};
