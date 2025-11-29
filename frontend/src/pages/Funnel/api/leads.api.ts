import { apiClient } from "@/lib/apiClient";
import type { TemperatureVariant } from "@/lib/temperature";

// TIPOS

export type ApiLead = {
  id: number; // API retorna number
  name: string;
  email: string | null;
  phone: string;
  earning: string; // Django decimal vem como string
  temperature: TemperatureVariant;
  created_at: string;
  updated_at: string;
  order: number;
  stage: number;
};

export type ApiLeadCreatePayload = {
  name: string;
  stage: number;
  order: number;
};

export type ApiLeadUpdatePayload = {
  id: number;
  stage?: number;
  order?: number;
  name?: string;
  email?: string | null;
  phone?: string;
  earning?: string | number; 
  temperature?: TemperatureVariant;
};

// LEADS

export const createLead = (payload: ApiLeadCreatePayload) =>
  apiClient<ApiLead>("/api/leads/", { method: "POST", body: payload });

export const updateLead = (payload: ApiLeadUpdatePayload) => {
  const { id, ...data } = payload;
  return apiClient<ApiLead>(`/api/leads/${id}/`, {
    method: "PATCH",
    body: data,
  });
};
