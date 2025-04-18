"use client";

import { useState, useEffect, JSX } from 'react';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import { AdminNav } from '@/components/Admin/AdminNav';
import ProtectedRoute from '@/components/Common/ProtectedRoute';
import Link from 'next/link';
import { useAdminPermissions } from '@/app/hooks/useAdminPermissions';
import { useRouter } from 'next/navigation';

// Определение типов для данных
interface StatsData {
    activeGroupBuys: number;
    totalParticipants: number;
    totalAmount: number;
    completedGroupBuys: number;
}

interface GroupBuy {
    id: string;
    title: string;
    status: string;
    participants: number;
    amount: number;
    deadline: string;
}

export default function OrganizerDashboard(): JSX.Element {
    const router = useRouter();
    const permissions = useAdminPermissions();

    const [stats, setStats] = useState<StatsData>({
        activeGroupBuys: 0,
        totalParticipants: 0,
        totalAmount: 0,
        completedGroupBuys: 0
    });

    const [groupBuys, setGroupBuys] = useState<GroupBuy[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        // В реальном приложении здесь будет запрос к API
        // Пока используем имитацию загрузки данных
        const fetchData = async (): Promise<void> => {
            try {
                // Имитируем задержку запроса
                await new Promise(resolve => setTimeout(resolve, 800));

                // Тестовые данные статистики
                setStats({
                    activeGroupBuys: 3,
                    totalParticipants: 87,
                    totalAmount: 124500,
                    completedGroupBuys: 5
                });

                // Тестовые данные совместных закупок
                setGroupBuys([
                    {
                        id: 'gb1',
                        title: 'Летняя одежда 2025',
                        status: 'Сбор заказов',
                        participants: 23,
                        amount: 48650,
                        deadline: '15.04.2025'
                    },
                    {
                        id: 'gb2',
                        title: 'Товары для дома',
                        status: 'Оплата',
                        participants: 18,
                        amount: 34200,
                        deadline: '10.04.2025'
                    },
                    {
                        id: 'gb3',
                        title: 'Детская обувь весна',
                        status: 'Заказан',
                        participants: 46,
                        amount: 41650,
                        deadline: '05.04.2025'
                    }
                ]);

                setLoading(false);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Компонент с основной статистикой
    const StatisticsCards = (): JSX.Element => {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="text-sm font-medium text-gray-500 mb-1">Активные закупки</div>
                    <div className="text-3xl font-bold">{stats.activeGroupBuys}</div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="text-sm font-medium text-gray-500 mb-1">Всего участников</div>
                    <div className="text-3xl font-bold">{stats.totalParticipants}</div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="text-sm font-medium text-gray-500 mb-1">Общая сумма (₽)</div>
                    <div className="text-3xl font-bold">{stats.totalAmount.toLocaleString()}</div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="text-sm font-medium text-gray-500 mb-1">Завершенные закупки</div>
                    <div className="text-3xl font-bold">{stats.completedGroupBuys}</div>
                </div>
            </div>
        );
    };

    // Компонент с таблицей совместных закупок
    const GroupBuysTable = (): JSX.Element => {
        return (
            <div className="bg-white rounded-lg shadow mb-6">
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold">Мои закупки</h2>
                    <Link
                        href="/admin/organizer/create"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                        Создать закупку
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Название
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Статус
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Участники
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Сумма (₽)
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Конец сбора заказов
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Действия
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {groupBuys.map((groupBuy) => (
                                <tr key={groupBuy.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{groupBuy.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${groupBuy.status === 'Сбор заказов' ? 'bg-blue-100 text-blue-800' :
                                                groupBuy.status === 'Оплата' ? 'bg-yellow-100 text-yellow-800' :
                                                    groupBuy.status === 'Заказан' ? 'bg-purple-100 text-purple-800' :
                                                        'bg-green-100 text-green-800'}`}>
                                            {groupBuy.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {groupBuy.participants}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {groupBuy.amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {groupBuy.deadline}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            href={`/admin/organizer/${groupBuy.id}`}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            Детали
                                        </Link>
                                        <Link
                                            href={`/admin/organizer/${groupBuy.id}/edit`}
                                            className="text-gray-600 hover:text-gray-900"
                                        >
                                            Изменить
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {groupBuys.length === 0 && !loading && (
                    <div className="py-8 text-center text-gray-500">
                        У вас пока нет активных закупок
                    </div>
                )}
            </div>
        );
    };

    // Компонент быстрых действий
    const QuickActions = (): JSX.Element => {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Быстрые действия</h2>
                <div className="space-y-3">
                    <Link
                        href="/admin/organizer/create"
                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-2 rounded-md"
                    >
                        Создать новую закупку
                    </Link>
                    <Link
                        href="/admin/organizer/participants"
                        className="block w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-center px-4 py-2 rounded-md"
                    >
                        Управление участниками
                    </Link>
                    <Link
                        href="/admin/organizer/reports"
                        className="block w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-center px-4 py-2 rounded-md"
                    >
                        Отчеты и статистика
                    </Link>
                    <Link
                        href="/admin/organizer/settings"
                        className="block w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-center px-4 py-2 rounded-md"
                    >
                        Настройки организатора
                    </Link>
                </div>
            </div>
        );
    };

    // Если происходит проверка прав или загрузка данных
    if (loading) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen bg-gray-100">
                    <AdminHeader />
                    <div className="flex">
                        <AdminNav />
                        <main className="flex-1 p-6">
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
                            </div>
                        </main>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    // Рендерим страницу напрямую, без AdminRoute
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-100">
                <AdminHeader />
                <div className="flex">
                    <AdminNav />
                    <main className="flex-1 p-6">
                        <div className="max-w-7xl mx-auto">
                            <h1 className="text-2xl font-bold text-gray-900 mb-6">
                                Панель организатора совместных покупок
                            </h1>

                            {/* Отладочная информация о правах для суперадмина */}
                            {permissions.isSuperAdmin && (
                                <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                                    <p className="text-green-800">
                                        Вы вошли как суперадминистратор и имеете полный доступ к функциям организатора.
                                    </p>
                                </div>
                            )}

                            <StatisticsCards />

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                                <div className="lg:col-span-2">
                                    <GroupBuysTable />
                                </div>
                                <div>
                                    <QuickActions />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}