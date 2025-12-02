import { useAuthContext } from "../context/AuthContext";
import { hasPermission, hasAnyPermission, hasAllPermissions, type Permission } from "../config/permissions";

/**
 * Hook to check user permissions based on their role
 */
export function usePermissions() {
  const { user } = useAuthContext();

  const checkPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return hasPermission(user.role, permission);
  };

  const checkAnyPermission = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return hasAnyPermission(user.role, permissions);
  };

  const checkAllPermissions = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return hasAllPermissions(user.role, permissions);
  };

  return {
    hasPermission: checkPermission,
    hasAnyPermission: checkAnyPermission,
    hasAllPermissions: checkAllPermissions,
    userRole: user?.role,
  };
}
