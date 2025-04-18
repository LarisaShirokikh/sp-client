"use client";

import { useState } from 'react';

export function UserActions({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAction = (action) => {
    // Здесь обработка действий
    console.log(`Action ${action} for user ${user.id}`);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-gray-500 hover:text-gray-700"
      >
        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>
      
      {isMenuOpen && (
        <div 
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          onBlur={() => setIsMenuOpen(false)}
        >
          <div className="py-1">
            <button
              onClick={() => handleAction('edit')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Редактировать
            </button>
            <button
              onClick={() => handleAction('changeRole')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Изменить роль
            </button>
            <button
              onClick={() => handleAction('resetPassword')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Сбросить пароль
            </button>
            <button
              onClick={() => handleAction('delete')}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Удалить пользователя
            </button>
          </div>
        </div>
      )}
    </div>
  );
}