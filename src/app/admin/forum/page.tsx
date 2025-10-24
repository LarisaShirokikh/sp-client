// src/app/admin/forum/page.tsx
"use client"
import { useState } from 'react';
import Link from 'next/link';
import { AdminNav } from '@/components/Admin/AdminNav';
import { AdminHeader } from '@/components/Admin/AdminHeader';

export default function ForumManagementPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminNav />

      <div className="flex-1">
        <AdminHeader />

        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Управление форумом</h1>
            <p className="mt-1 text-gray-600">Управляйте категориями, темами и модерацией форума</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/admin/forum/categories" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Категории</h2>
              <p className="text-gray-600">Создание, редактирование и удаление категорий форума</p>
            </Link>

            <Link href="/admin/forum/topics" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Темы</h2>
              <p className="text-gray-600">Просмотр, редактирование и модерация тем форума</p>
            </Link>

            <Link href="/admin/forum/moderation" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Модерация</h2>
              <p className="text-gray-600">Жалобы, репорты и управление контентом форума</p>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}