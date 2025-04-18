"use client";
import { useState } from 'react';
import { useAuth } from '@/app/hooks/useAuth';
import { ProfileTabs } from '@/components/Profile/ProfileTabs';
import { AddressesSection } from '@/components/Profile/AddressesSection';
import { PasswordSection } from '@/components/Profile/PasswordSection';
import { NotificationsSettings } from '@/components/Profile/NotificationsSettings';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import { PersonalInfoForm } from '@/components/Profile/PersonalInfoForm';


export default function ProfilePage() {
  const { userData } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');

  // Если пользователь не авторизован, показываем сообщение о необходимости входа
  if (!userData) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="text-center py-16">
          <h2 className="text-xl font-medium text-gray-800">Необходимо авторизоваться</h2>
          <p className="mt-2 text-gray-600">Пожалуйста, войдите в аккаунт для доступа к профилю</p>
        </div>
      </div>
    );
  }

  

  return (
    <div className="max-w-full mx-auto p-2 sm:p-4 lg:p-6">
      <ProfileHeader />

      <div className="mt-6 bg-white rounded-lg shadow">
        <ProfileTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        <div className="p-4">
          {activeTab === 'personal' && <PersonalInfoForm userData={userData} />}
          {activeTab === 'addresses' && <AddressesSection userData={userData} />}
          {activeTab === 'password' && <PasswordSection />}
          {activeTab === 'notifications' && <NotificationsSettings userData={userData} />}
        </div>
      </div>
    </div>
  );
}