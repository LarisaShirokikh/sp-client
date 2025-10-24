import React from 'react';
import Link from 'next/link';
import { Plus, Users, BarChart3, Settings } from 'lucide-react';

const QuickActions: React.FC = () => {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Быстрые действия</h2>
            <div className="space-y-3">
                <Link
                    href="/organizer/create"
                    className="flex items-center w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md transition-colors"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    <span>Создать новую закупку</span>
                </Link>
                <Link
                    href="/organizer/participants"
                    className="flex items-center w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 px-4 py-3 rounded-md transition-colors"
                >
                    <Users className="h-5 w-5 mr-2 text-gray-600" />
                    <span>Управление участниками</span>
                </Link>
                <Link
                    href="/organizer/reports"
                    className="flex items-center w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 px-4 py-3 rounded-md transition-colors"
                >
                    <BarChart3 className="h-5 w-5 mr-2 text-gray-600" />
                    <span>Отчеты и статистика</span>
                </Link>
                <Link
                    href="/organizer/settings"
                    className="flex items-center w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 px-4 py-3 rounded-md transition-colors"
                >
                    <Settings className="h-5 w-5 mr-2 text-gray-600" />
                    <span>Настройки организатора</span>
                </Link>
            </div>
        </div>
    );
};

export default QuickActions;