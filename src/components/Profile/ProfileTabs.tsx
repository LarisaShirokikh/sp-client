"use client";

import { FC } from 'react';
import { 
  User, 
  MapPin, 
  Key, 
  Bell, 
  Shield, 
  CreditCard, 
  History 
} from 'lucide-react';
import { UserRole } from '@/app/interface/auth';

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userRole?: UserRole;
}

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  roles?: UserRole[];
}

export const ProfileTabs: FC<ProfileTabsProps> = ({ 
  activeTab, 
  onTabChange,
  userRole = UserRole.USER
}) => {
  const tabs: TabItem[] = [
    { 
      id: 'personal', 
      label: 'Личная информация', 
      icon: <User className="w-8 h-8" /> 
    },
    { 
      id: 'addresses', 
      label: 'Адреса', 
      icon: <MapPin className="w-5 h-5" /> 
    },
    { 
      id: 'password', 
      label: 'Пароль и безопасность', 
      icon: <Key className="w-5 h-5" /> 
    },
    { 
      id: 'notifications', 
      label: 'Уведомления', 
      icon: <Bell className="w-5 h-5" /> 
    },
    { 
      id: 'payments', 
      label: 'Платежная информация', 
      icon: <CreditCard className="w-5 h-5" /> 
    },
    { 
      id: 'orders', 
      label: 'История заказов', 
      icon: <History className="w-5 h-5" /> 
    },
    { 
      id: 'privacy', 
      label: 'Приватность', 
      icon: <Shield className="w-5 h-5" /> 
    },
  ];

  // Add admin-specific tabs
  if (userRole === UserRole.ADMIN || userRole === UserRole.SUPER_ADMIN) {
    tabs.push({
      id: 'admin',
      label: 'Админ-панель',
      icon: <Shield className="w-5 h-5" />,
      roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN]
    });
  }

  return (
    <div className="border-b border-gray-200">
      <nav className="flex overflow-x-auto py-2 px-4">
        {tabs.map((tab) => {
          // Skip tabs that are limited to specific roles if the user doesn't have that role
          if (tab.roles && !tab.roles.includes(userRole)) {
            return null;
          }

          return (
            <button
              key={tab.id}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md mr-2
                        ${activeTab === tab.id 
                          ? 'bg-pink-50 text-pink-700 border-b-2 border-pink-500' 
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'}`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};