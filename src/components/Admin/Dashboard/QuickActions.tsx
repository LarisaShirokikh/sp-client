"use client";

import { useRouter } from 'next/navigation';

export function QuickActions() {
  const router = useRouter();

  const actions = [
    { 
      title: 'Добавить пользователя', 
      description: 'Создать новую учетную запись', 
      onClick: () => router.push('/admin/users?action=create'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    { 
      title: 'Настройки сайта', 
      description: 'Изменить глобальные настройки', 
      onClick: () => router.push('/admin/settings'),
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    { 
      title: 'Обновить контент', 
      description: 'Редактировать страницы сайта', 
      onClick: () => router.push('/admin/content'),
      color: 'bg-green-500 hover:bg-green-600'
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-medium mb-4">Быстрые действия</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`${action.color} text-white p-4 rounded-lg text-left transition-colors`}
          >
            <h3 className="font-medium">{action.title}</h3>
            <p className="text-sm text-white/80">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}