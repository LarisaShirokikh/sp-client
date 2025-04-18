"use client";

import { useAdminPermissions } from '@/app/hooks/useAdminPermissions';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { JSX } from 'react';

export function AdminNav(): JSX.Element {
  const pathname = usePathname();
  const permissions = useAdminPermissions();

  const isActive = (path: string): string => {
    return pathname === path || pathname?.startsWith(path + '/') ? 'bg-gray-700' : 'hover:bg-gray-700';
  };

  return (
    <nav className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">Администрирование</h2>

        <ul className="space-y-2">
          {permissions.canViewDashboard && (
            <li>
              <Link
                href="/admin"
                className={`block px-4 py-2 rounded-md ${isActive('/admin')}`}
              >
                Главная
              </Link>
            </li>
          )}

          {permissions.canManageUsers && (
            <li>
              <Link
                href="/admin/users"
                className={`block px-4 py-2 rounded-md ${isActive('/admin/users')}`}
              >
                Управление пользователями
              </Link>
            </li>
          )}

          {/* Пункт для организатора совместных покупок */}
          {permissions.isGroupBuyOrganizer && (
            <li>
              <Link
                href="/admin/organizer"
                className={`block px-4 py-2 rounded-md ${isActive('/admin/organizer')}`}
              >
                Организатор закупок
              </Link>
            </li>
          )}

          {/* Пункт управления форумом */}
          {permissions.canManageForum && (
            <li>
              <Link
                href="/admin/forum"
                className={`block px-4 py-2 rounded-md ${isActive('/admin/forum')}`}
              >
                Управление форумом
              </Link>
            </li>
          )}

          {permissions.canManageSettings && (
            <li>
              <Link
                href="/admin/settings"
                className={`block px-4 py-2 rounded-md ${isActive('/admin/settings')}`}
              >
                Настройки сайта
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div className="pt-4 border-t border-gray-700">
        <Link
          href="/profile"
          className="block px-4 py-2 rounded-md hover:bg-gray-700"
        >
          Вернуться в профиль
        </Link>
      </div>
    </nav>
  );
}