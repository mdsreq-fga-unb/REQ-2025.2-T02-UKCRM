import type { ApiUser } from "../api/auth.api";
import type { User, UserRole } from "../types/auth.types";

/**
 * Map backend role strings to frontend UserRole enum
 */
function mapBackendRoleToFrontend(backendRole: string): UserRole {
  const roleMap: Record<string, UserRole> = {
    'owner': 'Owner',
    'manager': 'Sales Manager',
    'coordinator': 'Sales Coordinator',
    'sdr': 'SDR',
    'closer': 'Closer',
    'admin': 'Admin',
  };

  return roleMap[backendRole.toLowerCase()] || 'SDR'; // Default to SDR if unknown
}

export function apiToUser(apiUser: ApiUser): User {
  return {
    id: apiUser.id,
    email: apiUser.email,
    nome: apiUser.nome,
    role: mapBackendRoleToFrontend(apiUser.role),
    organization_id: apiUser.organization_id,
  };
}
