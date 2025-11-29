/**
 * Types for Organizacoes (Organizations) feature
 */

export interface Organization {
  id: number;
  nome: string;
  dataCriacao: string;
  dataAtualizacao: string;
  proprietario: string;
}

export interface CreateOrganizationInput {
  nome: string;
  proprietario: string;
}

export interface UpdateOrganizationInput {
  id: number;
  nome?: string;
  proprietario?: string;
}

export interface DeleteOrganizationInput {
  id: number;
}
