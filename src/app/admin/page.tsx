"use client";

import { useState, useEffect } from 'react';
import { AdminNav } from '@/components/Admin/AdminNav';
import { DashboardStats } from '@/components/Admin/Dashboard/DashboardStats';
import { RecentActivity } from '@/components/Admin/Dashboard/RecentActivity';
import { QuickActions } from '@/components/Admin/Dashboard/QuickActions';
import { Activity, AdminApiService } from '@/services/adminApiService';
import { Loader } from '@/components/UI/Loader';

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatsType | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch both stats and activities in parallel
        const [statsData, activitiesData] = await Promise.all([
          AdminApiService.getDashboardStats(),
          AdminApiService.getActivities(10) // Get latest 10 activities
        ]);

        setStats(statsData);
        console.log("Dashboard stats:", statsData);
        setActivities(activitiesData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Произошла ошибка при загрузке данных';
        setError(errorMessage);
        console.error('Dashboard data fetch error:', err);

        // Fallback to demo data if API fails
        setStats({
          totalUsers: 245,
          activeUsers: 183,
          newUsers: 12,
          totalOrders: 856
        });

        setActivities([
          {
            id: 1,
            type: 'success',
            message: 'Новый пользователь зарегистрирован',
            timestamp: new Date().toISOString(),
            user: { id: 1, name: 'Администратор' }
          },
          {
            id: 2,
            type: 'warning',
            message: 'Истекает срок подписки у 5 пользователей',
            timestamp: new Date(Date.now() - 3600000).toISOString()
          },
          {
            id: 3,
            type: 'error',
            message: 'Ошибка синхронизации данных',
            timestamp: new Date(Date.now() - 10800000).toISOString()
          },
          {
            id: 4,
            type: 'success',
            message: 'Обновление системы успешно завершено',
            timestamp: new Date(Date.now() - 18000000).toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Set up polling for real-time updates (every 5 minutes)
    const pollingInterval = setInterval(fetchDashboardData, 5 * 60 * 1000);

    return () => clearInterval(pollingInterval);
  }, []);

  const refreshData = async () => {
    setLoading(true);
    try {
      const [statsData, activitiesData] = await Promise.all([
        AdminApiService.getDashboardStats(),
        AdminApiService.getActivities(10)
      ]);

      setStats(statsData);
      setActivities(activitiesData);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Не удалось обновить данные';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="">
      {/* <AdminHeader /> */}

      < div className="flex" >
        <AdminNav />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">Панель управления</h1>

              <button
                onClick={refreshData}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Обновить
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader size="large" />
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
      </div >
    </div>

  );
}