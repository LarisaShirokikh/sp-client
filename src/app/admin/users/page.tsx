"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import { AdminNav } from '@/components/Admin/AdminNav';
import { UsersList } from '@/components/Admin/Users/UsersList';
import { UserRoles } from '@/components/Admin/Users/UserRoles';
import { AdminRoute } from '@/components/Common/AdminRoute';
import { UserData } from '@/app/interface/auth';
import ProtectedRoute from '@/components/Common/ProtectedRoute';

export default function AdminUsers() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<UserData[]>([]);
  const [action, setAction] = useState<string | null>(searchParams.get('action') || null);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  useEffect(() => {
    // In a real app, fetch this data from your API
    setTimeout(() => {
      setUsers([
        {
          id: 1,
          name: 'Иван Петров',
          email: 'ivan@example.com',
          role: 'superadmin',
          is_active: true,
          created_at: '2023-01-15',
          avatar: null
        },
        {
          id: 2,
          name: 'Мария Сидорова',
          email: 'maria@example.com',
          role: 'admin',
          is_active: true,
          created_at: '2023-02-20',
          avatar: null
        },
        {
          id: 3,
          name: 'Алексей Иванов',
          email: 'alex@example.com',
          role: 'user',
          is_active: true,
          created_at: '2023-03-10',
          avatar: null
        },
        {
          id: 4,
          name: 'Ольга Смирнова',
          email: 'olga@example.com',
          role: 'user',
          is_active: false,
          created_at: '2023-04-05',
          avatar: null
        }
      ]);

      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    setAction(searchParams.get('action') || null);
  }, [searchParams]);

  const handleUserAction = (userId: number, actionType: string) => {
    const user = users.find(u => u.id === userId) || null;
    setSelectedUser(user);
    setAction(actionType);
  };

  const handleRoleSave = (userId: number, newRole: string) => {
    // In a real app, update the role in your API
    console.log(`Changing role for user ${userId} to ${newRole}`);

    // Update local state
    setUsers(users.map(user => {
      if (user.id === userId) {
        return { ...user, role: newRole };
      }
      return user;
    }));

    setAction(null);
    setSelectedUser(null);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-400"></div>
        </div>
      );
    }

    if (action === 'changeRole' && selectedUser) {
      return <UserRoles userId={selectedUser.id} currentRole={selectedUser.role} onSave={handleRoleSave} />;
    }

    return <UsersList initialUsers={users} onAction={handleUserAction} />;
  };

  return (
    // <ProtectedRoute>
    //   <AdminRoute requiredPermission="canManageUsers">
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />

      <div className="flex">
        <AdminNav />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">Управление пользователями</h1>

              {action && (
                <button
                  onClick={() => {
                    setAction(null);
                    setSelectedUser(null);
                  }}
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
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
    //   </AdminRoute>
    // </ProtectedRoute>
  );
}