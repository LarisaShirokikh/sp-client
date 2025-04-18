"use client";

import Link from 'next/link';

export function AccessDenied() {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center py-16">
        <h2 className="text-2xl font-medium text-red-600">Доступ запрещен</h2>
        <p className="mt-2 text-gray-600">У вас нет прав для доступа к этой странице</p>
        <div className="mt-6">
          <Link href="/profile" className="text-blue-500 hover:text-blue-700">
            Вернуться в профиль
          </Link>
        </div>
      </div>
    </div>
  );
}