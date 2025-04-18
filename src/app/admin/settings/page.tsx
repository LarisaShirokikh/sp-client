"use client";
import { useState } from 'react';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import { AdminNav } from '@/components/Admin/AdminNav';
import { SecuritySettings } from '@/components/Admin/Settings/SecuritySettings';
import { AdminRoute } from '@/components/Common/AdminRoute';
import { AdminTabs } from '@/components/Admin/Settings/AdminTabs';
import { GeneralSettings } from '@/components/Admin/Settings/GeneralSettings';
import { NotificationSettings } from '@/components/Admin/Settings/NotificationSettings';
import { IntegrationSettings } from '@/components/Admin/Settings/IntegrationSettings';
import ProtectedRoute from '@/components/Common/ProtectedRoute';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  // Определяем вкладки настроек
  const tabs = [
    { id: 'general', label: 'Общие настройки' },
    { id: 'security', label: 'Безопасность' },
    { id: 'notifications', label: 'Уведомления' },
    { id: 'integrations', label: 'Интеграции' },
  ];

  return (
    // <ProtectedRoute>
    //   <AdminRoute requiredPermission="canManageSettings">
    <div className="min-h-screen bg-gray-50">
      <AdminHeader title="Настройки сайта" />

      <div className="flex">
        <AdminNav />

        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow">
            <AdminTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            <div className="p-6">
              {activeTab === 'general' && <GeneralSettings />}
              {activeTab === 'security' && <SecuritySettings />}
              {activeTab === 'notifications' && <NotificationSettings />}
              {activeTab === 'integrations' && <IntegrationSettings />}
            </div>
          </div>
        </main>
      </div>
    </div>
    //   </AdminRoute>
    // </ProtectedRoute>
  );
}