"use client";

import React from 'react';
import Link from 'next/link';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import { AdminNav } from '@/components/Admin/AdminNav';
import ProtectedRoute from '@/components/Common/ProtectedRoute';
import { useAdminPermissions } from '@/app/hooks/useAdminPermissions';
import { FormProvider } from '@/app/providers/FormProvider';
import { GroupBuyForm } from '@/components/Sp/GroupBuyForm';

export default function CreateGroupBuyPage() {
    const permissions = useAdminPermissions();
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState(false);

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-100">
                <AdminHeader />
                <div className="flex">
                    <AdminNav />
                    <main className="flex-1 p-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">Создание новой закупки</h1>
                                <Link
                                    href="/admin/organizer"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Вернуться к списку закупок
                                </Link>
                            </div>

                            {/* Отладочная информация о правах для суперадмина */}
                            {permissions.isSuperAdmin && (
                                <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                                    <p className="text-green-800">
                                        Вы вошли как суперадминистратор и имеете полный доступ к созданию закупок.
                                    </p>
                                </div>
                            )}

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-6">
                                    Закупка успешно создана! Вы будете перенаправлены на страницу организатора.
                                </div>
                            )}

                            {/* Оборачиваем GroupBuyForm в FormProvider */}
                            <FormProvider>
                                <GroupBuyForm />
                            </FormProvider>
                        </div>
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}