"use client";

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AdminNav } from '@/components/Admin/AdminNav';
import { UsersList } from '@/components/Admin/Users/UsersList';
import { UserRoles } from '@/components/Admin/Users/UserRoles';
import { UserEdit } from '@/components/Admin/Users/UserEdit';
import { UserView } from '@/components/Admin/Users/UserView';
import { UsersApiService, UserData } from '@/services/usersApiService';
import { toast } from 'sonner';
import { Loader } from '@/components/UI/Loader';

export default function AdminUsers() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [action, setAction] = useState<string | null>(searchParams.get('action') || null);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  // Флаг для предотвращения сброса страницы
  const isLoadingRef = useRef(false);

  useEffect(() => {
    const fetchUsers = async () => {
      // Предотвращаем повторные загрузки данных
      if (isLoadingRef.current) return;

      isLoadingRef.current = true;
      setLoading(true);
      setError(null);

      try {
        console.log(`Загрузка пользователей: страница ${currentPage}, поиск "${searchTerm}"`);
        const result = await UsersApiService.getUsers(currentPage, pageSize, searchTerm);
        setUsers(result.users);
        setTotalUsers(result.total);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Ошибка при загрузке пользователей';
        setError(errorMessage);
        console.error("Failed to fetch users:", err);

        // Fallback to demo data only in development
        if (process.env.NODE_ENV === 'development') {
          // Создаем демо-данные с учетом пагинации
          const allDemoUsers = [
            {
              id: 1,
              name: 'admin',
              email: 'admin@example.com',
              is_active: true,
              is_verified: true,
              is_superuser: true,
              roles: ['admin', 'super_admin'],
              created_at: '2023-01-15T00:00:00Z',
              avatar_url: null,
            },
            {
              id: 2,
              name: 'модератор',
              email: 'moderator@example.com',
              is_active: true,
              is_verified: true,
              is_superuser: false,
              roles: ['moderator'],
              created_at: '2023-02-20T00:00:00Z',
              avatar_url: null,
            },
            {
              id: 3,
              name: 'пользователь',
              email: 'user@example.com',
              is_active: true,
              is_verified: false,
              is_superuser: false,
              roles: ['user'],
              created_at: '2023-03-10T00:00:00Z',
              avatar_url: null,
            },
            {
              id: 4,
              name: 'неактивный',
              email: 'inactive@example.com',
              is_active: false,
              is_verified: false,
              is_superuser: false,
              roles: ['user'],
              created_at: '2023-04-05T00:00:00Z',
              avatar_url: null,
            },
            // Добавляем больше демо-пользователей для тестирования пагинации
            ...Array.from({ length: 20 }, (_, i) => ({
              id: i + 5,
              name: `тест-${i + 1}`,
              email: `test-${i + 1}@example.com`,
              is_active: Math.random() > 0.3,
              is_verified: Math.random() > 0.5,
              is_superuser: false,
              roles: ['user'],
              created_at: `2023-0${(i % 9) + 1}-${((i % 28) + 1).toString().padStart(2, '0')}T00:00:00Z`,
              avatar_url: null,
            }))
          ];

          // Фильтрация по поисковому запросу, если есть
          const filteredUsers = searchTerm
            ? allDemoUsers.filter(user =>
              user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : allDemoUsers;

          const totalCount = filteredUsers.length;

          // Имитируем серверную пагинацию
          const startIndex = (currentPage - 1) * pageSize;
          const endIndex = startIndex + pageSize;
          const pagedUsers = filteredUsers.slice(startIndex, endIndex);

          setUsers(pagedUsers);
          setTotalUsers(totalCount);
        }
      } finally {
        setLoading(false);
        isLoadingRef.current = false;
      }
    };

    fetchUsers();
  }, [currentPage, pageSize, searchTerm, refreshTrigger]);

  useEffect(() => {
    setAction(searchParams.get('action') || null);

    const userId = searchParams.get('userId');
    if (action && userId) {
      const fetchUserDetails = async () => {
        try {
          const userData = await UsersApiService.getUserById(parseInt(userId));
          setSelectedUser(userData);
        } catch (err) {
          toast.error('Не удалось загрузить данные пользователя');
          console.error("Failed to fetch user details:", err);
        }
      };

      fetchUserDetails();
    }
  }, [searchParams, action]);

  const handleUserAction = (userId: number, actionType: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedUser(user);

      // Обработка действий активации/деактивации пользователя
      if (actionType === 'activate' || actionType === 'deactivate') {
        handleStatusChange(userId, actionType === 'activate');
        return;
      }

      router.push(`/admin/users?action=${actionType}&userId=${userId}`);
    }
  };

  const handleRoleSave = async (userId: number, roles: string[]) => {
    try {
      await UsersApiService.updateUserRoles(userId, roles);
      toast.success('Роли пользователя обновлены');

      // Обновляем состояние пользователей
      setRefreshTrigger(prev => prev + 1);

      // Возвращаемся к списку
      router.push('/admin/users');
    } catch (err) {
      toast.error('Ошибка при обновлении ролей');
      console.error(`Failed to update roles for user ${userId}:`, err);
    }
  };

  // Обработчик для сохранения отредактированных данных пользователя
  const handleUserSave = async (userId: number, updatedUser: UserData) => {
    try {
      // Обновляем локальное состояние
      setUsers(users.map(user =>
        user.id === userId ? updatedUser : user
      ));

      // Обновляем состояние пользователей
      setRefreshTrigger(prev => prev + 1);

      // Возвращаемся к списку
      router.push('/admin/users');

      toast.success('Данные пользователя обновлены');
    } catch (err) {
      toast.error('Ошибка при обновлении данных пользователя');
      console.error(`Failed to update user ${userId}:`, err);
    }
  };

  const handleStatusChange = async (userId: number, isActive: boolean) => {
    try {
      await UsersApiService.updateUserStatus(userId, isActive);

      // Обновляем локальное состояние
      setUsers(users.map(user =>
        user.id === userId ? { ...user, is_active: isActive } : user
      ));

      toast.success(`Пользователь ${isActive ? 'активирован' : 'деактивирован'}`);
    } catch (err) {
      toast.error('Ошибка при изменении статуса пользователя');
      console.error(`Failed to update status for user ${userId}:`, err);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // setCurrentPage(1); // Сбрасываем на первую страницу при поиске
  };

  const handlePageChange = (page: number) => {
    console.log(`AdminUsers: изменение страницы на ${page}`);
    setCurrentPage(page);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader size="large" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
              <p className="mt-2 text-sm">
                <button
                  onClick={() => setRefreshTrigger(prev => prev + 1)}
                  className="text-red-700 hover:text-red-600 font-medium underline"
                >
                  Попробовать снова
                </button>
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Отображаем соответствующий компонент в зависимости от действия
    if (action === 'changeRole' && selectedUser) {
      return (
        <UserRoles
          userId={selectedUser.id}
          currentRoles={selectedUser.roles}
          onSave={handleRoleSave}
          onCancel={() => router.push('/admin/users')}
        />
      );
    }

    // Добавляем обработку действия edit
    if (action === 'edit' && selectedUser) {
      return (
        <UserEdit
          userId={selectedUser.id}
          onSave={handleUserSave}
          onCancel={() => router.push('/admin/users')}
        />
      );
    }

    // Действие view - просмотр профиля пользователя с новым компонентом
    if (action === 'view' && selectedUser) {
      return (
        <UserView
          user={selectedUser}
          onAction={handleUserAction}
          onBack={() => router.push('/admin/users')}
        />
      );
    }

    return (
      <UsersList
        users={users}
        totalUsers={totalUsers}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        onAction={handleUserAction}
        onStatusChange={handleStatusChange}
      />
    );
  };

  return (
    <div className="">
      <div className="flex">
        <AdminNav />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">Управление пользователями</h1>

              {action && (
                <button
                  onClick={() => router.push('/admin/users')}
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Назад к списку
                </button>
              )}
            </div>

            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}