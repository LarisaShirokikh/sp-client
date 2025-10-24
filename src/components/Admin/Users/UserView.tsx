"use client";

import { useRouter } from 'next/navigation';
import { UserData } from '@/services/usersApiService';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

interface UserViewProps {
    user: UserData;
    onAction: (userId: number, actionType: string) => void;
    onBack: () => void;
}

export function UserView({ user, onAction, onBack }: UserViewProps) {
    const router = useRouter();

    // Форматирование даты
    const formatDate = (dateString: string | undefined) => {
        if (!dateString) {
            return 'Дата отсутствует';
        }

        try {
            return format(parseISO(dateString), 'dd MMMM yyyy, HH:mm', { locale: ru });
        } catch (e) {
            console.error('Error formatting date:', dateString, e);
            return 'Некорректная дата';
        }
    };

    // Определение основной роли пользователя для отображения
    const getPrimaryRole = (roles: string[]) => {
        const roleOrder = ['super_admin', 'admin', 'moderator', 'editor', 'organizer', 'premium', 'author', 'user'];

        for (const role of roleOrder) {
            if (roles.includes(role)) {
                return role;
            }
        }
        return roles[0] || 'user';
    };

    // Отображение роли в удобочитаемом формате
    const getRoleName = (role: string) => {
        const roleNames: Record<string, string> = {
            'user': 'Пользователь',
            'premium': 'Премиум пользователь',
            'author': 'Автор',
            'editor': 'Редактор',
            'moderator': 'Модератор',
            'organizer': 'Организатор',
            'admin': 'Администратор',
            'super_admin': 'Суперадминистратор'
        };

        return roleNames[role] || role;
    };

    // Получение класса стиля для роли
    const getRoleClass = (role: string) => {
        const roleClasses: Record<string, string> = {
            'user': 'bg-gray-100 text-gray-800',
            'premium': 'bg-pink-100 text-pink-800',
            'author': 'bg-indigo-100 text-indigo-800',
            'editor': 'bg-teal-100 text-teal-800',
            'moderator': 'bg-purple-100 text-purple-800',
            'organizer': 'bg-yellow-100 text-yellow-800',
            'admin': 'bg-blue-100 text-blue-800',
            'super_admin': 'bg-red-100 text-red-800'
        };

        return roleClasses[role] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b">
                <h2 className="text-lg font-medium">Профиль пользователя</h2>
            </div>

            <div className="p-6">
                {/* Шапка профиля */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8">
                    <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-600 mb-4 sm:mb-0 sm:mr-6">
                        {user.avatar_url ? (
                            <img src={user.avatar_url} alt="" className="h-24 w-24 rounded-full object-cover" />
                        ) : (
                            <span>{user.name.charAt(0).toUpperCase()}</span>
                        )}
                    </div>

                    <div className="text-center sm:text-left">
                        <h3 className="text-xl font-medium">{user.name}</h3>
                        <p className="text-gray-600">{user.email}</p>

                        {user.full_name && <p className="text-gray-800 mt-1">{user.full_name}</p>}

                        <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
                            {/* Основная роль */}
                            <span className={`px-3 py-1 text-sm rounded-full ${getRoleClass(getPrimaryRole(user.roles))
                                }`}>
                                {getRoleName(getPrimaryRole(user.roles))}
                            </span>

                            {/* Статус */}
                            <span className={`px-3 py-1 text-sm rounded-full ${user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                {user.is_active ? 'Активен' : 'Неактивен'}
                            </span>

                            {/* Верификация */}
                            {user.is_verified && (
                                <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                                    Верифицирован
                                </span>
                            )}

                            {/* Суперпользователь */}
                            {user.is_superuser && (
                                <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-800">
                                    Суперпользователь
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Основная информация */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                            Основная информация
                        </h4>

                        <div className="space-y-4">
                            <div className="border-b pb-3">
                                <dt className="text-sm font-medium text-gray-500">ID пользователя</dt>
                                <dd className="mt-1 text-base text-gray-900">{user.id}</dd>
                            </div>

                            <div className="border-b pb-3">
                                <dt className="text-sm font-medium text-gray-500">Имя пользователя</dt>
                                <dd className="mt-1 text-base text-gray-900">{user.name}</dd>
                            </div>

                            <div className="border-b pb-3">
                                <dt className="text-sm font-medium text-gray-500">Email</dt>
                                <dd className="mt-1 text-base text-gray-900">{user.email}</dd>
                            </div>

                            <div className="border-b pb-3">
                                <dt className="text-sm font-medium text-gray-500">Полное имя</dt>
                                <dd className="mt-1 text-base text-gray-900">{user.full_name || 'Не указано'}</dd>
                            </div>

                            <div className="border-b pb-3">
                                <dt className="text-sm font-medium text-gray-500">Телефон</dt>
                                <dd className="mt-1 text-base text-gray-900">{user.phone || 'Не указано'}</dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500">Дата регистрации</dt>
                                <dd className="mt-1 text-base text-gray-900">{formatDate(user.created_at)}</dd>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                            Роли и доступы
                        </h4>

                        <div className="space-y-4">
                            <div className="border-b pb-3">
                                <dt className="text-sm font-medium text-gray-500">Статус аккаунта</dt>
                                <dd className="mt-1 flex items-center">
                                    <span className={`inline-block w-3 h-3 rounded-full mr-2 ${user.is_active ? 'bg-green-500' : 'bg-red-500'
                                        }`}></span>
                                    <span className="text-base text-gray-900">
                                        {user.is_active ? 'Активен' : 'Деактивирован'}
                                    </span>
                                </dd>
                            </div>

                            <div className="border-b pb-3">
                                <dt className="text-sm font-medium text-gray-500">Верификация</dt>
                                <dd className="mt-1 text-base text-gray-900">
                                    {user.is_verified ? 'Верифицирован' : 'Не верифицирован'}
                                </dd>
                            </div>

                            <div className="border-b pb-3">
                                <dt className="text-sm font-medium text-gray-500">Права администратора</dt>
                                <dd className="mt-1 text-base text-gray-900">
                                    {user.is_superuser ? 'Суперпользователь' : 'Стандартные права'}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500">Роли</dt>
                                <dd className="mt-1">
                                    {user.roles && user.roles.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {user.roles.map(role => (
                                                <span key={role} className={`px-2 py-1 text-xs rounded-full ${getRoleClass(role)}`}>
                                                    {getRoleName(role)}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="text-base text-gray-500">Нет назначенных ролей</span>
                                    )}
                                </dd>
                            </div>
                        </div>

                        {/* Дополнительная статистика, если есть */}
                        {(user.rating !== undefined || user.followers_count !== undefined || user.following_count !== undefined) && (
                            <>
                                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mt-8 mb-4">
                                    Статистика
                                </h4>

                                <div className="space-y-4">
                                    {user.rating !== undefined && (
                                        <div className="border-b pb-3">
                                            <dt className="text-sm font-medium text-gray-500">Рейтинг</dt>
                                            <dd className="mt-1 text-base text-gray-900">{user.rating}</dd>
                                        </div>
                                    )}

                                    {user.followers_count !== undefined && (
                                        <div className="border-b pb-3">
                                            <dt className="text-sm font-medium text-gray-500">Подписчики</dt>
                                            <dd className="mt-1 text-base text-gray-900">{user.followers_count}</dd>
                                        </div>
                                    )}

                                    {user.following_count !== undefined && (
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Подписки</dt>
                                            <dd className="mt-1 text-base text-gray-900">{user.following_count}</dd>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Описание пользователя, если есть */}
                {user.description && (
                    <div className="mt-8">
                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Описание</h4>
                        <div className="bg-gray-50 p-4 rounded-md">
                            <p className="text-gray-800 whitespace-pre-line">{user.description}</p>
                        </div>
                    </div>
                )}

                {/* Кнопки действий */}
                <div className="mt-8 flex flex-wrap justify-end gap-3">
                    <button
                        type="button"
                        onClick={onBack}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Назад к списку
                    </button>

                    <button
                        type="button"
                        onClick={() => onAction(user.id, 'edit')}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Редактировать
                    </button>

                    <button
                        type="button"
                        onClick={() => onAction(user.id, 'changeRole')}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                        Управление ролями
                    </button>

                    <button
                        type="button"
                        onClick={() => onAction(user.id, user.is_active ? 'deactivate' : 'activate')}
                        className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${user.is_active
                            ? 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
                            : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                            }`}
                    >
                        {user.is_active ? 'Деактивировать' : 'Активировать'}
                    </button>
                </div>
            </div>
        </div>
    );
}