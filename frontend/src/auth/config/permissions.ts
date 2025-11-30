import type { UserRole } from '../types/auth.types';

export type PageKey = 'organizacoes' | 'times' | 'membros' | 'funis';

/**
 * Permission types that define what actions can be performed
 */
export type Permission =
  // Funnel permissions
  | "funnel:view"
  | "funnel:view:assigned" // Can only view assigned funnels
  | "funnel:view:all" // Can view all funnels
  | "funnel:create"
  | "funnel:edit"
  | "funnel:delete"
  // Funnel step permissions
  | "funnel-step:view"
  | "funnel-step:edit:assigned" // Can only edit assigned steps
  | "funnel-step:edit:all" // Can edit all steps
  | "funnel-step:create"
  | "funnel-step:delete"
  // Lead permissions
  | "lead:view"
  | "lead:view:assigned" // Can only view leads in assigned steps
  | "lead:view:all" // Can view all leads
  | "lead:create"
  | "lead:edit"
  | "lead:delete"
  | "lead:assign" // Can assign leads to team members
  | "lead:status:change" // Can change lead status (Gained/Lost)
  // Team permissions
  | "team:view"
  | "team:create"
  | "team:edit"
  | "team:delete"
  // Member permissions
  | "member:view"
  | "member:create"
  | "member:edit"
  | "member:delete"
  // Organization permissions
  | "organization:view"
  | "organization:create"
  | "organization:edit"
  | "organization:delete";

export interface RolePermissions {
  allowedPages: PageKey[];
  permissions: Permission[];
}

const rolePermissions: Record<UserRole, RolePermissions> = {
  'SDR': {
    allowedPages: ['funis'],
    permissions: [
      "funnel:view:assigned",
      "funnel-step:view",
      "funnel-step:edit:assigned",
      "lead:view:assigned",
      "lead:create",
      "lead:edit",
      "lead:delete",
    ],
  },
  'Closer': {
    allowedPages: ['funis'],
    permissions: [
      "funnel:view:assigned",
      "funnel-step:view",
      "funnel-step:edit:assigned",
      "lead:view:assigned",
      "lead:edit",
      "lead:status:change",
    ],
  },
  'Sales Coordinator': {
    allowedPages: ['funis'],
    permissions: [
      // Inherits from SDR and Closer
      "funnel:view:assigned",
      "funnel-step:view",
      "funnel-step:edit:assigned",
      "funnel-step:create",
      "funnel-step:delete",
      "lead:view:assigned",
      "lead:create",
      "lead:edit",
      "lead:status:change",
    ],
  },
  'Sales Manager': {
    allowedPages: ['funis', 'times'],
    permissions: [
      // Inherits from all previous roles + can manage funnels and teams
      "funnel:view:all",
      "funnel:create",
      "funnel:edit",
      "funnel:delete",
      "funnel-step:view",
      "funnel-step:edit:all",
      "funnel-step:create",
      "funnel-step:delete",
      "lead:view:all",
      "lead:create",
      "lead:edit",
      "lead:delete",
      "lead:assign",
      "lead:status:change",
      "team:view",
      "team:create",
      "team:edit",
      "team:delete",
    ],
  },
  'Owner': {
    allowedPages: ['funis', 'times', 'membros'],
    permissions: [
      // Inherits from all previous roles + can manage members
      "funnel:view:all",
      "funnel:create",
      "funnel:edit",
      "funnel:delete",
      "funnel-step:view",
      "funnel-step:edit:all",
      "funnel-step:create",
      "funnel-step:delete",
      "lead:view:all",
      "lead:create",
      "lead:edit",
      "lead:delete",
      "lead:assign",
      "lead:status:change",
      "team:view",
      "team:create",
      "team:edit",
      "team:delete",
      "member:view",
      "member:create",
      "member:edit",
      "member:delete",
    ],
  },
  'Admin': {
    allowedPages: ['organizacoes'],
    permissions: [
      "organization:view",
      "organization:create",
      "organization:edit",
      "organization:delete",
    ],
  },
};

export function hasPageAccess(role: UserRole, page: PageKey): boolean {
  return rolePermissions[role].allowedPages.includes(page);
}

export function getAllowedPages(role: UserRole): PageKey[] {
  return rolePermissions[role].allowedPages;
}

/**
 * Check if a user role has a specific permission
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  const permissions = rolePermissions[role].permissions;
  return permissions.includes(permission);
}

/**
 * Check if a user role has any of the specified permissions
 */
export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
  return permissions.some((permission) => hasPermission(role, permission));
}

/**
 * Check if a user role has all of the specified permissions
 */
export function hasAllPermissions(role: UserRole, permissions: Permission[]): boolean {
  return permissions.every((permission) => hasPermission(role, permission));
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: UserRole): Permission[] {
  return rolePermissions[role].permissions;
}
