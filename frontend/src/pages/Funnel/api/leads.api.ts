import { apiClient } from "@/lib/apiClient";
import type { TemperatureVariant } from "@/lib/temperature";
import type { Campaign, ContactOrigin } from "../types/kanban.types";

// TIPOS

export type ApiLead = {
  id: number; // API retorna number
  name: string;
  email: string | null;
  phone: string;
  earning: string | number; // Django decimal vem como string
  temperature: TemperatureVariant;
  created_at: string;
  updated_at: string;
  order: number;
  stage: number;
  account?: number | null;

  // Novos campos sincronizados com EditLeadDialog
  cpf?: string | null;
  career?: string | null;
  income?: string | number;
  interests?: string[];
  campaign?: Campaign;
  contactOrigin?: ContactOrigin;
  content: string; // Observações

  // Gain/Loss fields
  status?: "Active" | "Gained" | "Lost";
  gain_loss_value?: string | number | null;
  gain_loss_reason?: string | null;
};

export type ApiLeadCreatePayload = {
  name: string;
  stage: number;
  order: number;

  // Opcionais na criação
  email?: string | null;
  phone?: string;
  earning?: string | number;
  temperature?: TemperatureVariant;
  cpf?: string | null;
  career?: string | null;
  income?: string | number;
  interests?: string[];
  campaign?: Campaign;
  contactOrigin?: ContactOrigin;
  content?: string;
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
  account?: number | null;

  // Novos campos para atualização
  cpf?: string | null;
  career?: string | null;
  income?: string | number;
  interests?: string[];
  campaign?: Campaign;
  contactOrigin?: ContactOrigin;
  content?: string;
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

export const deleteLead = (id: number) =>
  apiClient<void>(`/api/leads/${id}/`, { method: "DELETE" });

export type ApiLeadGainLossPayload = {
  id: number;
  status: "Gained" | "Lost" | "Active";
  value: number;
  reason?: string;
};

export const markLeadGainLoss = (payload: ApiLeadGainLossPayload) => {
  const { id, status, value, reason } = payload;
  return apiClient<ApiLead>(`/api/leads/${id}/mark_gain_loss/`, {
    method: "POST",
    body: {
      status,
      gain_loss_value: value,
      gain_loss_reason: reason,
    },
  });
};
