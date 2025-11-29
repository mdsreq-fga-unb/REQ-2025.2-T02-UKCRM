import type { ApiOrganization } from "../api/organizations.api";

export const mockOrganizationsList: ApiOrganization[] = [
  {
    id: 1,
    name: "Ober",
    owner: "José da Silva",
    created_at: "2025-10-14T10:00:00Z",
    updated_at: "2025-10-15T10:00:00Z",
  },
  {
    id: 2,
    name: "Tech Solutions",
    owner: "Maria Santos",
    created_at: "2025-09-10T10:00:00Z",
    updated_at: "2025-11-12T10:00:00Z",
  },
  {
    id: 3,
    name: "Inovação Digital",
    owner: "Carlos Oliveira",
    created_at: "2025-08-05T10:00:00Z",
    updated_at: "2025-10-20T10:00:00Z",
  },
];
