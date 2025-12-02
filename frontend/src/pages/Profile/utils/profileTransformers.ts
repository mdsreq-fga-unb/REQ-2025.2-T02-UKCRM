import type { ApiProfile } from "../api/profile.api";
import type { Profile, UpdateProfilePayload } from "../types/profile.types";

export function transformApiProfile(apiProfile: ApiProfile): Profile {
  return {
    id: apiProfile.id,
    email: apiProfile.email,
    nome: apiProfile.nome,
    role: apiProfile.role,
    photo: apiProfile.photo,
    organization: apiProfile.organization,
    teams: apiProfile.teams,
    joinedAt: new Date(apiProfile.joined_at),
  };
}

export function transformUpdateProfilePayload(
  payload: UpdateProfilePayload
): FormData {
  const formData = new FormData();

  if (payload.nome) {
    formData.append('nome', payload.nome);
  }

  if (payload.password) {
    formData.append('password', payload.password);
  }

  if (payload.photo) {
    formData.append('photo', payload.photo);
  }

  return formData;
}
