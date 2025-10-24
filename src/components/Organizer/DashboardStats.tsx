import React from 'react';
import { BarChart3, Users, ShoppingBag, CheckCircle } from 'lucide-react';

import { formatCurrency } from '@/utils/formatters';
import { StatsData } from '@/app/interface/organizer';

interface DashboardStatsProps {
    stats: StatsData;
    loading: boolean;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats, loading }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Активные закупки */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="flex items-center mb-2">
                    <ShoppingBag className="w-5 h-5 text-blue-600 mr-2" />
                    <div className="text-sm font-medium text-gray-500">Активные закупки</div>
                </div>
                {loading ? (
                    <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                    <>
                        <div className="text-3xl font-bold text-gray-800">{stats.activeGroupBuys}</div>
                        {stats.lastMonthGrowth > 0 && (
                            <div className="text-xs font-medium text-green-600 mt-2">
                                +{stats.lastMonthGrowth}% за этот месяц
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Участники */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="flex items-center mb-2">
                    <Users className="w-5 h-5 text-indigo-600 mr-2" />
                    <div className="text-sm font-medium text-gray-500">Всего участников</div>
                </div>
                {loading ? (
                    <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                    <div className="text-3xl font-bold text-gray-800">{stats.totalParticipants}</div>
                )}
            </div>

            {/* Общая сумма */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="flex items-center mb-2">
                    <BarChart3 className="w-5 h-5 text-emerald-600 mr-2" />
                    <div className="text-sm font-medium text-gray-500">Общая сумма (₽)</div>
                </div>
                {loading ? (
                    <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                    <div className="text-3xl font-bold text-gray-800">{formatCurrency(stats.totalAmount)}</div>
                )}
            </div>

            {/* Завершенные закупки */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="flex items-center mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <div className="text-sm font-medium text-gray-500">Завершенные закупки</div>
                </div>
                {loading ? (
                    <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                    <div className="text-3xl font-bold text-gray-800">{stats.completedGroupBuys}</div>
                )}
            </div>
        </div>
    );
};

export default DashboardStats;