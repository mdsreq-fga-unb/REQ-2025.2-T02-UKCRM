/**
 * Types for Times (Teams) feature
 */

export interface Team {
  id: number;
  nome: string;
  membros: number;
  dataCriacao: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
}

export interface CreateTeamInput {
  nome: string;
  memberIds: string[];
}

export interface UpdateTeamInput {
  id: number;
  nome: string;
  memberIds: string[];
}

export interface DeleteTeamInput {
  id: number;
}
