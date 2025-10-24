import React from 'react';
import Link from 'next/link';
import { Bell, Loader2 } from 'lucide-react';

interface NotificationsPanelProps {
    notifications: Notification[];
    loading: boolean;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({
    notifications,
    loading
}) => {
    // Функция для получения цвета индикатора типа уведомления
    const getNotificationColor = (type: string): string => {
        switch (type) {
            case 'success': return 'bg-green-500';
            case 'warning': return 'bg-yellow-500';
            case 'error': return 'bg-red-500';
            default: return 'bg-blue-500';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold">Последние уведомления</h2>
                <Bell className="h-5 w-5 text-gray-500" />
            </div>

            {loading ? (
                <div className="py-12 flex justify-center items-center">
                    <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
                </div>
            ) : (
                <div className="overflow-y-auto max-h-96">
                    {notifications.length > 0 ? (
                        <div className="divide-y divide-gray-200">
                            {notifications.map((notification) => (
                                <div key={notification.id} className="p-4 hover:bg-gray-50">
                                    <div className="flex items-start">
                                        <span
                                            className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full mr-3 ${getNotificationColor(notification.type)
                                                }`}
                                        ></span>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-800">{notification.message}</p>
                                            <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-8 text-center text-gray-500">
                            Нет новых уведомлений
                        </div>
                    )}
                </div>
            )}

            <div className="border-t px-6 py-4 bg-gray-50">
                <Link
                    href="/organizer/notifications"
                    className="text-sm text-blue-600 hover:text-blue-800"
                >
                    Просмотреть все уведомления
                </Link>
            </div>
        </div>
    );
};

export default NotificationsPanel;