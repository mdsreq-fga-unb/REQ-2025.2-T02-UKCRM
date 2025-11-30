import { apiClient } from "@/lib/apiClient";

// TIPOS

export type ApiMember = {
  id: number;
  name: string;
  email: string;
  hierarchy: string;
  organization: number;
  organization_name: string;
  joined_at: string;
  updated_at: string;
};

export type ApiMemberCreatePayload = {
  name: string;
  email: string;
  role: string;
  organization_id: number;
};

export type ApiMemberUpdatePayload = {
  name?: string;
  email?: string;
  hierarchy?: string;
  organization_id?: number;
};

export type ApiMemberDeletePayload = {
  action: "delete" | "reallocate";
  target_member_id?: number;
};

// MEMBERS

export const fetchMembers = (signal?: AbortSignal) =>
  apiClient<ApiMember[]>("/api/members/", { signal });

export const fetchMemberDetails = (id: number, signal?: AbortSignal) =>
  apiClient<ApiMember>(`/api/members/${id}/`, { signal });

export const createMember = (payload: ApiMemberCreatePayload) =>
  apiClient<ApiMember>("/api/members/", { method: "POST", body: payload });

export const updateMember = (id: number, payload: ApiMemberUpdatePayload) =>
  apiClient<ApiMember>(`/api/members/${id}/`, { method: "PATCH", body: payload });

export const deleteMember = (id: number, payload?: ApiMemberDeletePayload) =>
  apiClient(`/api/members/${id}/`, { method: "DELETE", body: payload });
