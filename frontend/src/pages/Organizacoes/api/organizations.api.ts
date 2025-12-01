import { apiClient } from "@/lib/apiClient";

// TIPOS

export type ApiOrganization = {
  id: number;
  name: string;
  owner: string;
  created_at: string;
  updated_at: string;
};

export type ApiOrganizationDetails = {
  id: number;
  name: string;
  owner_name: string;
  owner_email: string;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type ApiOrganizationCreatePayload = {
  name: string;
  owner: string;
  owner_email_input: string;
  owner_password: string;
};

export type ApiOrganizationUpdatePayload = {
  name?: string;
  owner_name_input?: string;
  owner_password?: string;
};

// ORGANIZATIONS

export const fetchOrganizations = (signal?: AbortSignal) =>
  apiClient<ApiOrganization[]>("/api/organizations/", { signal });

export const fetchOrganizationDetails = (id: number, signal?: AbortSignal) =>
  apiClient<ApiOrganizationDetails>(`/api/organizations/${id}/`, { signal });

export const createOrganization = (payload: ApiOrganizationCreatePayload) =>
  apiClient<ApiOrganization>("/api/organizations/", {
    method: "POST",
    body: payload,
  });

export const updateOrganization = (
  id: number,
  payload: ApiOrganizationUpdatePayload,
) =>
  apiClient<ApiOrganization>(`/api/organizations/${id}/`, {
    method: "PATCH",
    body: payload,
  });

export const deleteOrganization = (id: number) =>
  apiClient(`/api/organizations/${id}/`, { method: "DELETE" });
