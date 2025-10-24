"use client";

import { useState } from 'react';

interface UserRolesProps {
  userId: number;
  currentRoles: string[];
  onSave: (userId: number, roles: string[]) => void;
  onCancel: () => void;
}

export function UserRoles({ userId, currentRoles, onSave, onCancel }: UserRolesProps) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>(currentRoles || ['user']);

  // Все доступные роли в системе
  const availableRoles = [
    { id: 'user', name: 'Пользователь', description: 'Стандартный доступ к функциям сайта' },
    { id: 'premium', name: 'Премиум пользователь', description: 'Доступ к премиум функциям и контенту' },
    { id: 'author', name: 'Автор', description: 'Может создавать специальный контент' },
    { id: 'editor', name: 'Редактор', description: 'Может редактировать контент других пользователей' },
    { id: 'moderator', name: 'Модератор', description: 'Модерация контента и пользователей' },
    { id: 'organizer', name: 'Организатор', description: 'Может создавать и управлять групповыми покупками' },
    { id: 'admin', name: 'Администратор', description: 'Доступ к админ-панели и основным функциям управления' },
    { id: 'super_admin', name: 'Суперадминистратор', description: 'Полный доступ ко всем функциям системы' }
  ];

  const handleRoleToggle = (roleId: string) => {
    setSelectedRoles(prevRoles => {
      // Если роль уже выбрана, удаляем её
      if (prevRoles.includes(roleId)) {
        // Не позволяем удалить все роли - должна остаться хотя бы одна
        if (prevRoles.length === 1) {
          return prevRoles;
        }
        return prevRoles.filter(id => id !== roleId);
      }
      // Иначе добавляем роль
      return [...prevRoles, roleId];
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(userId, selectedRoles);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-lg font-medium">Управление ролями пользователя</h2>
        <p className="mt-1 text-sm text-gray-500">
          Выберите роли, которые должны быть назначены пользователю. Пользователь может иметь несколько ролей.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-5">
          {availableRoles.map((role) => (
            <div key={role.id} className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={`role-${role.id}`}
                  name={`role-${role.id}`}
                  type="checkbox"
                  checked={selectedRoles.includes(role.id)}
                  onChange={() => handleRoleToggle(role.id)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={`role-${role.id}`} className="font-medium text-gray-700">
                  {role.name}
                </label>
                <p className="text-gray-500">{role.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Отмена
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Сохранить изменения
          </button>
        </div>
      </form>
    </div>
  );
}