import { apiClient } from "@/lib/apiClient";
import type { ApiLead } from "./leads.api";

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
  teams: number[];
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

export const deleteFunnel = (id: number) =>
  apiClient(`/api/funnels/${id}/`, { method: "DELETE" });

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
