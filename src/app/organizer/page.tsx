"use client";

import { useState, useEffect, JSX } from 'react';
import ProtectedRoute from '@/components/Common/ProtectedRoute';
import Link from 'next/link';
import { useAdminPermissions } from '@/app/hooks/useAdminPermissions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { StatsData } from '../interface/organizer';
import { GroupBuyService } from '@/services/groupBuyService';
import DashboardStats from '@/components/Organizer/DashboardStats';
import QuickActions from '@/components/Organizer/QuickActions';
import NotificationsPanel from '@/components/Organizer/NotificationsPanel';
import GroupBuysTable from '@/components/Organizer/GroupBuysTable';
import { GroupBuy } from '../interface/product';


export default function OrganizerDashboard(): JSX.Element {
    const router = useRouter();
    const permissions = useAdminPermissions();

    const [stats, setStats] = useState<StatsData>({
        activeGroupBuys: 0,
        totalParticipants: 0,
        totalAmount: 0,
        completedGroupBuys: 0,
        lastMonthGrowth: 0
    });

    const [groupBuys, setGroupBuys] = useState<GroupBuy[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Функция для загрузки всех данных
    const loadAllData = async () => {
        setLoading(true);
        try {
            // Загружаем данные из API
            const [statsData, groupBuysData, notificationsData] = await Promise.all([
                GroupBuyService.getStats(),
                GroupBuyService.getMyGroupBuys(),
                GroupBuyService.getNotifications()
            ]);

            setStats(statsData);
            setGroupBuys(groupBuysData);
            setNotifications(notificationsData);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
            toast.error('Произошла ошибка при загрузке данных');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAllData();
    }, []);

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50">
                <div className="flex">
                    <main className="flex-1 p-6">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                                <h1 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0">
                                    Панель организатора
                                </h1>
                                <button
                                    onClick={loadAllData}
                                    className="flex items-center text-sm text-gray-600 hover:text-gray-900 bg-white px-3 py-1 rounded-md border border-gray-300 hover:border-gray-400"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4 mr-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Обновление...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 2v6h-6"></path>
                                                <path d="M3 10a9 9 0 0 1 15 0"></path>
                                                <path d="M3 22v-6h6"></path>
                                                <path d="M21 14a9 9 0 0 1-15 0"></path>
                                            </svg>
                                            <span>Обновить данные</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Отладочная информация о правах для суперадмина */}
                            {permissions.isSuperAdmin && (
                                <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                                    <p className="text-green-800">
                                        Вы вошли как суперадминистратор и имеете полный доступ к функциям организатора.
                                    </p>
                                </div>
                            )}

                            {/* Компонент статистики */}
                            <DashboardStats stats={stats} loading={loading} />

                            {/* Компонент таблицы закупок (во всю ширину) */}
                            <div className="mb-6">
                                <GroupBuysTable
                                    groupBuys={groupBuys}
                                    loading={loading}
                                    onExport={() => toast.success('Отчет экспортирован', { icon: '📊' })}
                                />
                            </div>

                            {/* Блоки быстрых действий и уведомлений под таблицей */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    {/* Компонент быстрых действий */}
                                    <QuickActions />
                                </div>
                                <div>
                                    {/* Компонент уведомлений */}
                                    <NotificationsPanel notifications={notifications} loading={loading} />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}