import Link from 'next/link';
import { User, ChevronDown, Package, Settings, LogOut, Lock } from 'lucide-react';
import { HolidayTheme } from '@/app/interface/holiday';
import { useRef, useState, useEffect } from 'react';
import { useClickOutside } from '@/app/hooks/useClickOutside';
import { useAuth } from '@/app/hooks/useAuth';
import { Button } from '../ui/button';
import { UserData, UserRole } from '@/app/interface/auth';

interface ProfileMenuProps {
  userData: UserData | null;
  onLogout: () => Promise<void>;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ userData, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null!);

  // Закрытие меню при клике вне него
  useClickOutside(menuRef, () => setIsOpen(false));

  // Правильная проверка ролей - учитываем и массив, и строку
  const isAdmin =
    (Array.isArray(userData?.roles) && (
      userData.roles.includes(UserRole.ADMIN) ||
      userData.roles.includes(UserRole.SUPER_ADMIN)
    )) ||

    userData?.is_superuser === true;


  const mediaUrl = process.env.NEXT_PUBLIC_MEDIA_URL || "http://localhost:8000";
  const avatarUrl = userData?.avatar_url
    ? `${mediaUrl}/media/${userData.avatar_url}`
    : "/avatar.png";

  return (
    <div className="relative" ref={menuRef}>
      {/* Кнопка для открытия меню */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 p-1 rounded-full text-gray-600 hover:text-pink-500 hover:bg-pink-50"
      >
        {userData?.avatar_url ? (
          <img
            src={avatarUrl}
            alt={userData.name}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className={`h-8 w-8 rounded-full flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-500`}>
            <User className="h-12 w-12 text-white" />
          </div>
        )}
        <ChevronDown className="h-4 w-4 opacity-70 transition-transform" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </button>

      {/* Выпадающее меню */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 border border-gray-100 z-10">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium">{userData?.name || 'Пользователь'}</p>
            <p className="text-xs text-gray-500 truncate">{userData?.email || 'email@example.com'}</p>
          </div>

          <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-500">
            <User className="h-4 w-4 mr-2" />
            <span>Мой профиль</span>
          </Link>

          <Link href="/orders" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-500">
            <Package className="h-4 w-4 mr-2" />
            <span>Мои заказы</span>
          </Link>

          <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-500">
            <Settings className="h-4 w-4 mr-2" />
            <span>Настройки</span>
          </Link>

          {isAdmin && (
            <Link href="/admin" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-500">
              <Lock className="h-4 w-4 mr-2" />
              <span>Админка</span>
            </Link>
          )}

          <button
            onClick={onLogout}
            className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-500"
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span>Выйти</span>
          </button>
        </div>
      )}
    </div>
  );
};