import type { ApiProfile, ApiUpdateProfilePayload } from "../api/profile.api";
import type { Profile, UpdateProfilePayload } from "../types/profile.types";

export function transformApiProfile(apiProfile: ApiProfile): Profile {
  return {
    id: apiProfile.id,
    email: apiProfile.email,
    nome: apiProfile.nome,
    role: apiProfile.role,
    organization: apiProfile.organization,
    teams: apiProfile.teams,
    joinedAt: new Date(apiProfile.joined_at),
  };
}

export function transformUpdateProfilePayload(
  payload: UpdateProfilePayload
): ApiUpdateProfilePayload {
  return {
    nome: payload.nome,
    password: payload.password,
  };
}
