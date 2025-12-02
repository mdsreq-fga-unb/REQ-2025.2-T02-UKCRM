/**
 * Types for Membros (Members) feature
 */

export interface Member {
  id: number;
  nome: string;
  hierarquia: string;
  dataEntrada: string;
  email?: string;
}

export interface CreateMemberInput {
  nome: string;
  hierarquia: string;
  email: string;
  senha: string;
}

export interface UpdateMemberInput {
  id: number;
  nome?: string;
  hierarquia?: string;
  email?: string;
}

export interface DeleteMemberInput {
  id: number;
  action: "delete" | "reallocate";
  targetMemberId?: number;
}

export interface MemberForReallocation {
  id: string;
  name: string;
}

export const HIERARCHY_OPTIONS = [
  "Closer",
  "SDR",
  "Coordenador de Vendas",
  "Gerente",
  "Diretor",
] as const;

export type HierarchyLevel = typeof HIERARCHY_OPTIONS[number];
