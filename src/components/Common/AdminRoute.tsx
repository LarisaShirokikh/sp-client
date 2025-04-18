"use client";

import { useAdminPermissions } from '@/app/hooks/useAdminPermissions';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode, JSX } from 'react';

interface AdminRouteProps {
  children: ReactNode;
  requiredPermission: string;
}

export function AdminRoute({ children, requiredPermission }: AdminRouteProps): JSX.Element {
  const router = useRouter();
  const permissions = useAdminPermissions();

  // Для прямой отладки здесь, не в эффекте
  console.log("AdminRoute - начало выполнения компонента");
  console.log("AdminRoute - permissions:", permissions);
  console.log("AdminRoute - requiredPermission:", requiredPermission);

  // Важное исправление! Если пермиссии еще не загружены - показываем загрузку
  if (!permissions) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка прав доступа...</p>
        </div>
      </div>
    );
  }

  // Если пользователь суперадмин - всегда даем доступ
  if (permissions.isSuperAdmin) {
    console.log("AdminRoute - пользователь суперадмин, разрешаем доступ");
    return <>{children}</>;
  }

  // Проверяем конкретное разрешение
  const hasPermission = permissions[requiredPermission as keyof typeof permissions] === true;
  console.log(`AdminRoute - проверка разрешения ${requiredPermission}: ${hasPermission}`);

  if (hasPermission) {
    console.log("AdminRoute - у пользователя есть требуемое разрешение");
    return <>{children}</>;
  }

  // Если права нет - перенаправляем
  useEffect(() => {
    if (!permissions.isSuperAdmin && !hasPermission) {
      console.log("AdminRoute - доступ запрещен, перенаправляем");
      router.push('/admin/unauthorized');
    }
  }, [permissions, hasPermission, router]);

  // Показываем загрузку пока идет перенаправление
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Проверка прав доступа...</p>
      </div>
    </div>
  );
}