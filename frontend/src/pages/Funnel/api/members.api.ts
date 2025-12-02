import { apiClient } from "@/lib/apiClient";

export type ApiMember = {
  id: number;
  name: string;
  email: string;
  role: string;
  organization: number;
  organization_name: string;
  photo?: string | null;
};

export const fetchMembers = (signal?: AbortSignal) =>
  apiClient<ApiMember[]>("/api/members/", { signal });
