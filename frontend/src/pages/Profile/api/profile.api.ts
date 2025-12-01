import { apiClient } from "@/lib/apiClient";

export type ApiTeam = {
  id: number;
  name: string;
};

export type ApiOrganization = {
  id: number;
  name: string;
  logo?: string | null;
};

export type ApiProfile = {
  id: number;
  email: string;
  nome: string;
  role: string;
  photo?: string | null;
  organization: ApiOrganization | null;
  teams: ApiTeam[];
  joined_at: string;
};

export type ApiUpdateProfilePayload = {
  nome?: string;
  password?: string;
};

export const fetchProfile = (signal?: AbortSignal) =>
  apiClient<ApiProfile>("/api/auth/profile/", { signal });

export const updateProfile = (payload: FormData) =>
  apiClient<ApiProfile>("/api/auth/profile/update/", {
    method: "PATCH",
    headers: {},
    body: payload as unknown,
  });
