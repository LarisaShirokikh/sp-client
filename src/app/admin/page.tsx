"use client";

import { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import { AdminNav } from '@/components/Admin/AdminNav';
import { DashboardStats } from '@/components/Admin/Dashboard/DashboardStats';
import { RecentActivity } from '@/components/Admin/Dashboard/RecentActivity';
import { QuickActions } from '@/components/Admin/Dashboard/QuickActions';
import { AdminRoute } from '@/components/Common/AdminRoute';
import ProtectedRoute from '@/components/Common/ProtectedRoute';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch this data from your API
    setTimeout(() => {
      setStats({
        totalUsers: 245,
        activeUsers: 183,
        newUsers: 12,
        totalOrders: 856
      });

      setActivities([
        { type: 'success', message: 'Новый пользователь зарегистрирован', time: '5 минут назад' },
        { type: 'warning', message: 'Истекает срок подписки у 5 пользователей', time: '1 час назад' },
        { type: 'error', message: 'Ошибка синхронизации данных', time: '3 часа назад' },
        { type: 'success', message: 'Обновление системы успешно завершено', time: '5 часов назад' }
      ]);

      setLoading(false);
    }, 800);
  }, []);

  return (
    // <ProtectedRoute>
    //   <AdminRoute requiredPermission="canViewDashboard">
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />

      <div className="flex">
        <AdminNav />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Панель управления</h1>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="space-y-6">
                <DashboardStats stats={stats} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <RecentActivity activities={activities} />
                  <QuickActions />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
    //   </AdminRoute>
    // </ProtectedRoute>
  );
}