"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function QuickActions() {
  const router = useRouter();
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  const actions = [
    {
      id: 'add-user',
      title: 'Добавить пользователя',
      description: 'Создать новую учетную запись пользователя',
      onClick: () => router.push('/admin/users/create'),
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      hoverColor: 'from-blue-600 to-blue-700',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      )
    },
    {
      id: 'site-settings',
      title: 'Настройки сайта',
      description: 'Изменить глобальные настройки сайта',
      onClick: () => router.push('/admin/settings'),
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      hoverColor: 'from-purple-600 to-purple-700',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      id: 'update-content',
      title: 'Обновить контент',
      description: 'Редактировать страницы и содержимое сайта',
      onClick: () => router.push('/admin/content'),
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      hoverColor: 'from-green-600 to-green-700',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      id: 'view-reports',
      title: 'Просмотр отчетов',
      description: 'Аналитика и статистика сайта',
      onClick: () => router.push('/admin/reports'),
      color: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
      hoverColor: 'from-yellow-600 to-yellow-700',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium">Быстрые действия</h2>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={action.onClick}
              onMouseEnter={() => setHoveredAction(action.id)}
              onMouseLeave={() => setHoveredAction(null)}
              className={`
                ${action.color} 
                ${hoveredAction === action.id ? `bg-gradient-to-r ${action.hoverColor}` : ''}
                text-white p-4 rounded-lg text-left transition-all duration-200 transform hover:shadow-lg hover:-translate-y-1
              `}
            >
              <div className="flex items-start">
                <div className="bg-white/20 p-2 rounded-lg mr-3">
                  {action.icon}
                </div>
                <div>
                  <h3 className="font-medium">{action.title}</h3>
                  <p className="text-sm text-white/80 mt-1">{action.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-t bg-gray-50">
        <button
          onClick={() => router.push('/admin/dashboard/customize')}
          className="w-full flex items-center justify-center text-sm text-gray-600 hover:text-gray-800 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Настроить панель
        </button>
      </div>
    </div>
  );
}