import type { ApiTeam } from "../api/teams.api";

export const mockTeamsList: ApiTeam[] = [
  {
    id: 1,
    name: "Time Alpha",
    member_count: 5,
    created_at: "2025-10-14T10:00:00Z",
    updated_at: "2025-10-14T10:00:00Z",
    members: [1, 2, 3, 4, 5],
  },
  {
    id: 2,
    name: "Time Beta",
    member_count: 8,
    created_at: "2025-10-12T10:00:00Z",
    updated_at: "2025-10-12T10:00:00Z",
    members: [6, 7, 8, 9, 10, 11, 12, 13],
  },
  {
    id: 3,
    name: "Time Gamma",
    member_count: 3,
    created_at: "2025-10-10T10:00:00Z",
    updated_at: "2025-10-10T10:00:00Z",
    members: [14, 15, 16],
  },
];

export interface MockMember {
  id: number;
  name: string;
  role: string;
  initials: string;
  color: string;
}

export const mockMembers: MockMember[] = [
  { id: 1, name: "Ana Clara", role: "Closer", initials: "AC", color: "#059669" },
  { id: 2, name: "Bruno Esteves", role: "SDR", initials: "BE", color: "#0891b2" },
  { id: 3, name: "Carla Souza", role: "Closer", initials: "CS", color: "#7c3aed" },
  { id: 4, name: "Daniel Pereira", role: "SDR", initials: "DP", color: "#dc2626" },
  { id: 5, name: "Elena Santos", role: "Coordenador de Vendas", initials: "ES", color: "#ea580c" },
  { id: 6, name: "Felipe Lima", role: "SDR", initials: "FL", color: "#2563eb" },
  { id: 7, name: "Gabriela Costa", role: "Closer", initials: "GC", color: "#16a34a" },
  { id: 8, name: "Hugo Alves", role: "SDR", initials: "HA", color: "#9333ea" },
  { id: 9, name: "Isabela Rocha", role: "Closer", initials: "IR", color: "#0284c7" },
  { id: 10, name: "João Mendes", role: "Gerente", initials: "JM", color: "#ca8a04" },
  { id: 11, name: "Karina Dias", role: "SDR", initials: "KD", color: "#db2777" },
  { id: 12, name: "Lucas Fernandes", role: "Closer", initials: "LF", color: "#65a30d" },
  { id: 13, name: "Marina Oliveira", role: "SDR", initials: "MO", color: "#0891b2" },
  { id: 14, name: "Nathan Silva", role: "Closer", initials: "NS", color: "#7c3aed" },
  { id: 15, name: "Olívia Campos", role: "SDR", initials: "OC", color: "#dc2626" },
  { id: 16, name: "Pedro Santos", role: "Diretor", initials: "PS", color: "#059669" },
];
