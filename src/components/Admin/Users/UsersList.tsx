"use client";

import { useState, useEffect, useRef } from 'react';
import { UserActions } from './UserActions';
import { UserData } from '@/services/usersApiService';
import { Pagination } from '@/components/UI/Pagination';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

interface UsersListProps {
  users: UserData[];
  totalUsers: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onSearch: (term: string) => void;
  onAction: (userId: number, actionType: string) => void;
  onStatusChange: (userId: number, isActive: boolean) => void;
}

export function UsersList({
  users,
  totalUsers,
  currentPage: externalPage,
  pageSize,
  onPageChange,
  onSearch,
  onAction,
  onStatusChange
}: UsersListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Локальная копия данных для управления отображением
  const [localUsers, setLocalUsers] = useState<UserData[]>(users);
  const [localTotalUsers, setLocalTotalUsers] = useState<number>(totalUsers);



  // Обработчик для изменения страницы
  const handlePageChange = (page: number) => {
    console.log(`[ACTION] User requested page change to: ${page}`);
    onPageChange(page);
  };

  // Обработчик для поиска
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  // Применяем debounce для поиска
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      onSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  // Определение роли пользователя для отображения
  const getUserRoleDisplay = (roles: string[]) => {
    if (roles.includes('super_admin')) return { text: 'Суперадмин', classes: 'bg-red-100 text-red-800' };
    if (roles.includes('admin')) return { text: 'Админ', classes: 'bg-blue-100 text-blue-800' };
    if (roles.includes('moderator')) return { text: 'Модератор', classes: 'bg-purple-100 text-purple-800' };
    if (roles.includes('organizer')) return { text: 'Организатор', classes: 'bg-yellow-100 text-yellow-800' };
    if (roles.includes('premium')) return { text: 'Премиум', classes: 'bg-pink-100 text-pink-800' };
    return { text: 'Пользователь', classes: 'bg-green-100 text-green-800' };
  };

  // Форматирование даты для отображения
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) {
      return 'Дата отсутствует';
    }

    try {
      // Используем parseISO для более надежного парсинга ISO строк
      return format(parseISO(dateString), 'dd MMM yyyy', { locale: ru });
    } catch (e) {
      console.error('Error formatting date:', dateString, e);
      return 'Некорректная дата';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
          <h2 className="text-lg font-medium">Пользователи</h2>

          <div className="flex space-x-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Поиск пользователей..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 pr-3 py-2 border rounded-md text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {debouncedSearch && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="h-4 w-4 text-gray-400 hover:text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>

            <button
              onClick={() => onAction(0, 'create')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors flex items-center"
            >
              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Добавить
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Пользователь
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Роль
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Статус
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Дата регистрации
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {localUsers.length > 0 ? (
              localUsers.map((user) => {
                const roleDisplay = getUserRoleDisplay(user.roles || []);

                return (
                  <tr key={user.id} className={!user.is_active ? 'bg-gray-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                          {user.avatar_url ? (
                            <img src={user.avatar_url} alt="" className="h-10 w-10 rounded-full object-cover" />
                          ) : (
                            <span className="font-medium">{user.name.charAt(0).toUpperCase()}</span>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          {user.is_superuser && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                              Суперпользователь
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${roleDisplay.classes}`}>
                        {roleDisplay.text}
                      </span>
                      {user.roles && user.roles.length > 1 && (
                        <span className="ml-2 text-xs text-gray-500">
                          +{user.roles.length - 1}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${user.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                        {user.is_active ? 'Активен' : 'Неактивен'}
                      </span>
                      {user.is_verified && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          Верифицирован
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <UserActions
                        user={user}
                        onAction={onAction}
                        onStatusChange={onStatusChange}
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  {debouncedSearch ? 'Пользователи не найдены по запросу' : 'Нет пользователей для отображения'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Пагинация */}
      {localTotalUsers > pageSize && (
        <div className="px-6 py-4 border-t">
          <Pagination
            currentPage={externalPage}
            totalItems={localTotalUsers}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}