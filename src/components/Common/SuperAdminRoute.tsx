"use client";

import { useAdminPermissions } from '@/app/hooks/useAdminPermissions';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface SuperAdminRouteProps {
    children: ReactNode;
    requiredPermission: string;
}

export function SuperAdminRoute({ children, requiredPermission }: SuperAdminRouteProps) {
    const router = useRouter();
    const permissions = useAdminPermissions();

    // Просто возвращаем контент, если есть данные о правах доступа
    if (permissions) {
        return <>{children}</>;
    }

    // Показываем загрузку, если данные еще не получены
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Загрузка...</p>
            </div>
        </div>
    );
}