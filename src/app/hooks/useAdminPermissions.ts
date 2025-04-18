import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

// Интерфейс для прав доступа
interface AdminPermissions {
  isAdmin: boolean;
  isSuperAdmin: boolean;
  canManageUsers: boolean;
  canManageSettings: boolean;
  canViewDashboard: boolean;
  canManageForum: boolean;
  // Права для организатора
  isGroupBuyOrganizer: boolean;
  canManageGroupBuys: boolean;
  canCreateGroupBuys: boolean;
  canViewGroupBuyAnalytics: boolean;
}

/**
 * Проверяет, содержит ли массив ролей пользователя указанную роль
 */
const hasRole = (roles: string[] | undefined | string, role: string): boolean => {
  // Если роли не определены, возвращаем false
  if (!roles) return false;

  // Если roles - это массив, проверяем наличие роли в массиве
  if (Array.isArray(roles)) {
    return roles.includes(role);
  }

  // Если roles - это строка (обратная совместимость), сравниваем напрямую
  return roles === role;
};

export function useAdminPermissions(): AdminPermissions {
  const { userData } = useAuth();
  const [permissions, setPermissions] = useState<AdminPermissions>({
    isAdmin: false,
    isSuperAdmin: false,
    canManageUsers: false,
    canManageSettings: false,
    canViewDashboard: false,
    canManageForum: false,
    // Права организатора
    isGroupBuyOrganizer: false,
    canManageGroupBuys: false,
    canCreateGroupBuys: false,
    canViewGroupBuyAnalytics: false,
  });

  useEffect(() => {
    if (!userData) {
      setPermissions({
        isAdmin: false,
        isSuperAdmin: false,
        canManageUsers: false,
        canManageSettings: false,
        canViewDashboard: false,
        canManageForum: false,
        // Сбрасываем права организатора
        isGroupBuyOrganizer: false,
        canManageGroupBuys: false,
        canCreateGroupBuys: false,
        canViewGroupBuyAnalytics: false,
      });
      return;
    }

    // Проверка ролей с использованием функции hasRole
    const isAdmin =
      hasRole(userData.roles, 'admin') ||
      hasRole(userData.roles, 'super_admin') ||
      (userData.is_superuser === true);

    const isSuperAdmin =
      hasRole(userData.roles, 'super_admin') ||
      (userData.is_superuser === true);

    const isOrganizer = hasRole(userData.roles, 'organizer');

    // Для отладки
    console.log("useAdminPermissions - userData:", userData);
    console.log("useAdminPermissions - roles:", userData.roles);
    console.log("useAdminPermissions - is_superuser:", userData.is_superuser);
    console.log("useAdminPermissions - isAdmin:", isAdmin);
    console.log("useAdminPermissions - isSuperAdmin:", isSuperAdmin);
    console.log("useAdminPermissions - isOrganizer:", isOrganizer);

    // Если пользователь суперадмин, даем ему все права
    if (isSuperAdmin) {
      setPermissions({
        isAdmin: true,
        isSuperAdmin: true,
        canManageUsers: true,
        canManageSettings: true,
        canViewDashboard: true,
        canManageForum: true,
        // Даем суперадмину все права организатора
        isGroupBuyOrganizer: true,
        canManageGroupBuys: true,
        canCreateGroupBuys: true,
        canViewGroupBuyAnalytics: true,
      });
      return;
    }

    // Для остальных пользователей устанавливаем права в зависимости от роли
    setPermissions({
      isAdmin,
      isSuperAdmin: false,
      canManageUsers: isAdmin,
      canManageSettings: isAdmin,
      canViewDashboard: isAdmin || isOrganizer,
      canManageForum: isAdmin,

      // Права организатора
      isGroupBuyOrganizer: isOrganizer,
      canManageGroupBuys: isOrganizer,
      canCreateGroupBuys: isOrganizer,
      canViewGroupBuyAnalytics: isOrganizer || isAdmin,
    });
  }, [userData]);

  return permissions;
}