import type { TemperatureVariant } from "@/lib/temperature";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

type EntityId = number;

export type ApiFunnel = {
  id: EntityId;
  name: string;
  teams: number[];
};

export type ApiLead = {
  id: EntityId;
  name: string;
  email: string | null;
  phone: string;
  earning: number;
  temperature: TemperatureVariant;
  created_at: string;
  updated_at: string;
  order: number;
  stage: number;
};

export type ApiStage = {
  id: EntityId;
  name: string;
  order: number;
  funnel: number;
  leads: ApiLead[];
};

export type ApiFunnelDetails = {
  id: EntityId;
  name: string;
  stages: ApiStage[];
};

// Payloads
export type ApiFunnelCreatePayload = {
  name: string;
  teams: number[];
};

export type ApiLeadCreatePayload = {
  name: string;
  stage: EntityId;
  order: number;
};

export type ApiStageCreatePayload = {
  name: string;
  funnel: EntityId;
  order: number;
};

export type ApiLeadUpdatePayload = {
  id: EntityId;
  stage: EntityId;
  order: number;
};

export type ApiStageUpdatePayload = {
  id: EntityId;
  order: number;
};

interface ApiClientOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

async function apiClient<T>(
  endpoint: string,
  options: ApiClientOptions = {},
): Promise<T> {
  const { method = "GET", body, headers, ...customConfig } = options;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...customConfig,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    let errorInfo = "Erro desconhecido";
    try {
      const data = await response.json();
      errorInfo = JSON.stringify(data);
    } catch {
      /* empty */
    }
    throw new Error(`API Error ${response.status}: ${errorInfo}`);
  }

  if (response.status === 204) return null as T;
  return response.json();
}

// Funções

export const fetchFunnels = (signal?: AbortSignal) =>
  apiClient<ApiFunnel[]>("/api/funnels/", { signal });

export const fetchFunnelDetails = (id: EntityId, signal?: AbortSignal) =>
  apiClient<ApiFunnelDetails>(`/api/funnels/${id}/`, { signal });

export const createFunnel = (payload: ApiFunnelCreatePayload) =>
  apiClient<ApiFunnel>("/api/funnels/", { method: "POST", body: payload });

export const deleteFunnel = (id: EntityId) =>
  apiClient(`/api/funnels/${id}/`, { method: "DELETE" });

export const createLead = (payload: ApiLeadCreatePayload) =>
  apiClient<ApiLead>("/api/leads/", { method: "POST", body: payload });

export const createStage = (payload: ApiStageCreatePayload) =>
  apiClient<ApiStage>("/api/stages/", { method: "POST", body: payload });

export const updateLead = (payload: ApiLeadUpdatePayload) => {
  const { id, ...data } = payload;
  return apiClient<ApiLead>(`/api/leads/${id}/`, {
    method: "PATCH",
    body: data,
  });
};

export const updateStage = (payload: ApiStageUpdatePayload) => {
  const { id, order } = payload;
  return apiClient<ApiStage>(`/api/stages/${id}/`, {
    method: "PATCH",
    body: { order },
  });
};
