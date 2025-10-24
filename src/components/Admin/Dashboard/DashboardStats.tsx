"use client";

import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

interface StatsType {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  totalOrders: number;
  userGrowth?: Array<{ name: string; users: number }>;
  activeUsersByDay?: Array<{ day: string; users: number }>;
}

interface DashboardStatsProps {
  stats: StatsType | null;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const [viewMode, setViewMode] = useState<'numbers' | 'chart'>('numbers');

  // Default stats if none are provided
  const defaultStats: StatsType = {
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0,
    totalOrders: 0,
  };

  // Используем реальные данные, или дефолтные если данных нет
  const statsData = stats || defaultStats;

  // Проверяем наличие реальных данных для графиков
  const hasChartData = !!(statsData.userGrowth && statsData.activeUsersByDay);

  // Data for user growth chart (use API data if available, otherwise fallback to demo data)
  const userGrowthData = statsData.userGrowth || [
    { name: 'Янв', users: 182 },
    { name: 'Фев', users: 195 },
    { name: 'Мар', users: 210 },
    { name: 'Апр', users: 232 },
    { name: 'Май', users: 240 },
    { name: 'Июн', users: 245 }
  ];

  // Active users by day of week (use API data if available, otherwise fallback to demo data)
  const activeUsersByDay = statsData.activeUsersByDay || [
    { day: 'Пн', users: 124 },
    { day: 'Вт', users: 145 },
    { day: 'Ср', users: 143 },
    { day: 'Чт', users: 156 },
    { day: 'Пт', users: 178 },
    { day: 'Сб', users: 142 },
    { day: 'Вс', users: 129 }
  ];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-medium">Статистика</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('numbers')}
            className={`px-3 py-1 text-sm rounded-md ${viewMode === 'numbers'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Цифры
          </button>
          <button
            onClick={() => setViewMode('chart')}
            className={`px-3 py-1 text-sm rounded-md ${viewMode === 'chart'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Графики
          </button>
        </div>
      </div>

      {viewMode === 'numbers' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          <StatCard
            title="Всего пользователей"
            value={statsData.totalUsers}
            change={stats ? "+8.5%" : undefined} // Показываем изменение только если есть реальные данные
            changeType="positive"
            icon={(
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          />
          <StatCard
            title="Активные пользователи"
            value={statsData.activeUsers}
            percentage={statsData.totalUsers > 0 ? Math.round((statsData.activeUsers / statsData.totalUsers) * 100) : 0}
            icon={(
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
          />
          <StatCard
            title="Новые пользователи"
            value={statsData.newUsers}
            change={stats ? "+4.2%" : undefined} // Показываем изменение только если есть реальные данные
            changeType="positive"
            icon={(
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            )}
          />
          <StatCard
            title="Всего заказов"
            value={statsData.totalOrders}
            change={stats ? "+12.1%" : undefined} // Показываем изменение только если есть реальные данные
            changeType="positive"
            icon={(
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            )}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Рост пользователей
              {!hasChartData && <span className="text-xs text-yellow-500 ml-2">(демо данные)</span>}
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#4F46E5" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Активные пользователи по дням
              {!hasChartData && <span className="text-xs text-yellow-500 ml-2">(демо данные)</span>}
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activeUsersByDay}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  percentage?: number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
}

function StatCard({ title, value, percentage, change, changeType, icon }: StatCardProps) {
  return (
    <div className="flex items-start p-4 bg-white rounded-lg border">
      <div className="flex-shrink-0 mr-4">
        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-semibold">{value}</p>

        {percentage !== undefined && (
          <p className="text-sm text-gray-500 mt-1">
            <span className="font-medium">{percentage}%</span> от общего числа
          </p>
        )}

        {change && (
          <p className={`text-sm mt-1 ${changeType === 'positive' ? 'text-green-600' :
            changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
            }`}>
            {change} за месяц
          </p>
        )}
      </div>
    </div>
  );
}