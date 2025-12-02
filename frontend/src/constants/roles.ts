/**
 * Global constants for user roles and hierarchies
 * Used across the application for consistent role display and mapping
 */

/**
 * Maps role values (from backend) to their Portuguese display labels
 * These match the ROLE_CHOICES in backend/accounts/models.py
 */
export const ROLE_LABELS: Record<string, string> = {
  owner: "Proprietário",
  manager: "Gerente",
  coordinator: "Coordenador",
  sdr: "SDR",
  closer: "Closer",
  Admin: "Administrador",
};

/**
 * Human-readable hierarchy options for dropdowns/selects
 */
export const HIERARCHY_OPTIONS = [
  "Closer",
  "SDR",
  "Coordenador",
  "Gerente",
  "Proprietário",
] as const;

/**
 * Maps human-readable hierarchy labels to backend role values
 */
export const HIERARCHY_TO_ROLE_MAP: Record<string, string> = {
  Closer: "closer",
  SDR: "sdr",
  Coordenador: "coordinator",
  Gerente: "manager",
  Proprietário: "owner",
};

/**
 * Maps backend role values to human-readable hierarchy labels
 */
export const ROLE_TO_HIERARCHY_MAP: Record<string, string> = {
  closer: "Closer",
  sdr: "SDR",
  coordinator: "Coordenador",
  manager: "Gerente",
  owner: "Proprietário",
  Admin: "Administrador",
};

/**
 * Get role display label from role value
 * @param role - The role value from backend (e.g., "closer", "sdr")
 * @returns The Portuguese display label (e.g., "Closer", "SDR")
 */
export const getRoleLabel = (role: string): string => {
  return ROLE_LABELS[role] || role;
};

/**
 * Maps frontend role values to backend role values
 * Reverse of the mapping in authTransformers.ts
 */
export const FRONTEND_TO_BACKEND_ROLE_MAP: Record<string, string> = {
  'Owner': 'owner',
  'Sales Manager': 'manager',
  'Sales Coordinator': 'coordinator',
  'SDR': 'sdr',
  'Closer': 'closer',
  'Admin': 'admin',
};

/**
 * Get hierarchy label from role value
 * @param role - The role value from backend (e.g., "closer", "sdr") OR frontend (e.g., "Owner", "Sales Manager")
 * @returns The hierarchy display label (e.g., "Closer", "SDR")
 */
export const getHierarchyFromRole = (role: string): string => {
  // First check if it's a frontend role and convert to backend
  const backendRole = FRONTEND_TO_BACKEND_ROLE_MAP[role] || role;
  return ROLE_TO_HIERARCHY_MAP[backendRole] || role;
};

/**
 * Get role value from hierarchy label
 * @param hierarchy - The hierarchy display label (e.g., "Closer", "SDR")
 * @returns The backend role value (e.g., "closer", "sdr")
 */
export const getRoleFromHierarchy = (hierarchy: string): string => {
  return HIERARCHY_TO_ROLE_MAP[hierarchy] || hierarchy;
};
