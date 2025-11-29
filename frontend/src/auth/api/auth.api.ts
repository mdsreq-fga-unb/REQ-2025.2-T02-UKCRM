import { apiClient } from "@/lib/apiClient";

export type ApiUser = {
  id: number;
  email: string;
  name: string;
};

export type ApiLoginPayload = {
  email: string;
  password: string;
};

export type ApiLoginResponse = {
  user: ApiUser;
  token: string;
};

export const loginApi = (payload: ApiLoginPayload) =>
  apiClient<ApiLoginResponse>("/api/auth/login/", {
    method: "POST",
    body: payload,
  });

export const logoutApi = () =>
  apiClient("/api/auth/logout/", { method: "POST" });

export const getCurrentUserApi = (signal?: AbortSignal) =>
  apiClient<ApiUser>("/api/auth/me/", { signal });
