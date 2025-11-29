import { apiClient } from "@/lib/apiClient";

// TIPOS

export type ApiOrganization = {
  id: number;
  name: string;
  owner: string;
  created_at: string;
  updated_at: string;
};

export type ApiOrganizationCreatePayload = {
  name: string;
  owner: string;
};

export type ApiOrganizationUpdatePayload = {
  name?: string;
  owner?: string;
};

// ORGANIZATIONS

export const fetchOrganizations = (signal?: AbortSignal) =>
  apiClient<ApiOrganization[]>("/api/organizations/", { signal });

export const fetchOrganizationDetails = (id: number, signal?: AbortSignal) =>
  apiClient<ApiOrganization>(`/api/organizations/${id}/`, { signal });

export const createOrganization = (payload: ApiOrganizationCreatePayload) =>
  apiClient<ApiOrganization>("/api/organizations/", { method: "POST", body: payload });

export const updateOrganization = (id: number, payload: ApiOrganizationUpdatePayload) =>
  apiClient<ApiOrganization>(`/api/organizations/${id}/`, { method: "PATCH", body: payload });

export const deleteOrganization = (id: number) =>
  apiClient(`/api/organizations/${id}/`, { method: "DELETE" });
