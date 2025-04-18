import React from 'react';
import Link from 'next/link';

export const AdminPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-gray-800">Панель администратора</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/admin/users" className="p-4 bg-white border rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="font-medium text-lg">Управление пользователями</h3>
          <p className="text-gray-600 mt-1">Просмотр и редактирование пользователей</p>
        </Link>
        
        <Link href="/admin/products" className="p-4 bg-white border rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="font-medium text-lg">Управление товарами</h3>
          <p className="text-gray-600 mt-1">Добавление и редактирование товаров</p>
        </Link>
        
        <Link href="/admin/orders" className="p-4 bg-white border rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="font-medium text-lg">Заказы</h3>
          <p className="text-gray-600 mt-1">Просмотр и обработка заказов</p>
        </Link>
        
        <Link href="/admin/settings" className="p-4 bg-white border rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="font-medium text-lg">Настройки сайта</h3>
          <p className="text-gray-600 mt-1">Управление настройками сайта</p>
        </Link>
      </div>
    </div>
  );
};