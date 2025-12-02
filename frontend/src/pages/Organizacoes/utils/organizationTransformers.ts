import type { ApiOrganization } from "../api/organizations.api";
import type { Organization } from "../types/organizations.types";

/**
 * Transform API organization to display format
 */
export function apiToOrganization(apiOrg: ApiOrganization): Organization {
  return {
    id: apiOrg.id,
    nome: apiOrg.name,
    logo: apiOrg.logo,
    proprietario: apiOrg.owner,
    dataCriacao: formatDate(apiOrg.created_at),
    dataAtualizacao: formatDate(apiOrg.updated_at),
  };
}

/**
 * Transform array of API organizations to display format
 */
export function apiToOrganizations(apiOrgs: ApiOrganization[]): Organization[] {
  return apiOrgs.map(apiToOrganization);
}

/**
 * Format ISO date string to Brazilian date format
 */
function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("pt-BR");
}
