import type { ApiUser } from "../api/auth.api";
import type { User } from "../types/auth.types";

export function apiToUser(apiUser: ApiUser): User {
  return {
    id: apiUser.id,
    email: apiUser.email,
    nome: apiUser.name,
  };
}
