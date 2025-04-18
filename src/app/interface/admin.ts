import { ReactNode } from "react";

export interface AdminPermissions {
  isAdmin: boolean;
  isSuperAdmin: boolean;
  canManageUsers: boolean;
  canManageSettings: boolean;
  canViewDashboard: boolean;
  canManageForum: boolean
}
export interface AdminRouteProps {
  children: ReactNode;
  requiredPermission?: keyof AdminPermissions;
}