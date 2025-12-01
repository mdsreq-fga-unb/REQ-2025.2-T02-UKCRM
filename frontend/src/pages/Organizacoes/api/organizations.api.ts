import { apiClient } from "@/lib/apiClient";

// TIPOS

export type ApiOrganization = {
  id: number;
  name: string;
  logo?: string | null;
  owner: string;
  created_at: string;
  updated_at: string;
};

export type ApiOrganizationDetails = {
  id: number;
  name: string;
  logo?: string | null;
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
  logo?: File;
};

export type ApiOrganizationUpdatePayload = {
  name?: string;
  owner_name_input?: string;
  owner_password?: string;
  logo?: File | null;
};

// ORGANIZATIONS

export const fetchOrganizations = (signal?: AbortSignal) =>
  apiClient<ApiOrganization[]>("/api/organizations/", { signal });

export const fetchOrganizationDetails = (id: number, signal?: AbortSignal) =>
  apiClient<ApiOrganizationDetails>(`/api/organizations/${id}/`, { signal });

export const createOrganization = (payload: ApiOrganizationCreatePayload) => {
  const formData = new FormData();
  formData.append('name', payload.name);
  formData.append('owner', payload.owner);
  formData.append('owner_email_input', payload.owner_email_input);
  formData.append('owner_password', payload.owner_password);
  if (payload.logo) {
    formData.append('logo', payload.logo);
  }

  return apiClient<ApiOrganization>("/api/organizations/", {
    method: "POST",
    headers: {},
    body: formData as unknown,
  });
};

export const updateOrganization = (
  id: number,
  payload: ApiOrganizationUpdatePayload,
) => {
  const formData = new FormData();
  if (payload.name !== undefined) {
    formData.append('name', payload.name);
  }
  if (payload.owner_name_input !== undefined) {
    formData.append('owner_name_input', payload.owner_name_input);
  }
  if (payload.owner_password !== undefined) {
    formData.append('owner_password', payload.owner_password);
  }
  if (payload.logo !== undefined) {
    if (payload.logo === null) {
      formData.append('logo', '');
    } else {
      formData.append('logo', payload.logo);
    }
  }

  return apiClient<ApiOrganization>(`/api/organizations/${id}/`, {
    method: "PATCH",
    headers: {},
    body: formData as unknown,
  });
};

export const deleteOrganization = (id: number) =>
  apiClient(`/api/organizations/${id}/`, { method: "DELETE" });
