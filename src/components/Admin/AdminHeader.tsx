"use client";

import { useAuth } from '@/app/hooks/useAuth';
import Image from 'next/image';
import Link from 'next/link';

export function AdminHeader() {
  const { userData } = useAuth();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/admin" className="font-bold text-xl">
            Панель управления
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-sm font-medium">{userData?.name || 'Администратор'}</span>
            <span className="px-2 py-1 text-xs rounded-full bg-green-500">Суперадмин</span>
          </div>
          
          <div className="relative h-8 w-8 rounded-full overflow-hidden">
            {userData?.avatar ? (
              <Image
                src={userData.avatar}
                alt="Аватар"
                fill
                className="object-cover"
              />
            ) : (
              <div className="bg-blue-500 h-full w-full flex items-center justify-center">
                <span className="text-white text-sm">
                  {userData?.name?.charAt(0) || 'A'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}