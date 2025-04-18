"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { useState } from 'react';

export function SecuritySettings({ initialSettings = {} }) {
  const [settings, setSettings] = useState({
    maxLoginAttempts: 5,
    lockoutDuration: 30,
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireNumber: true,
    passwordRequireSpecial: true,
    twoFactorAuthEnabled: false,
    sessionTimeout: 60,
    ...initialSettings
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value, 10) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would save the settings to your backend
    console.log('Saving security settings:', settings);
    // Mock success message
    alert('Настройки безопасности успешно сохранены');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium mb-4">Настройки безопасности</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-4">Настройки входа</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maxLoginAttempts" className="block text-sm font-medium text-gray-700">
                  Макс. количество попыток
                </Label>
                <Input
                  type="number"
                  name="maxLoginAttempts"
                  id="maxLoginAttempts"
                  min="1"
                  max="10"
                  value={settings.maxLoginAttempts}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div>
                <Label htmlFor="lockoutDuration" className="block text-sm font-medium text-gray-700">
                  Длительность блокировки (мин)
                </Label>
                <Input
                  type="number"
                  name="lockoutDuration"
                  id="lockoutDuration"
                  min="5"
                  max="1440"
                  value={settings.lockoutDuration}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-4">Требования к паролю</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="passwordMinLength" className="block text-sm font-medium text-gray-700">
                  Минимальная длина
                </Label>
                <Input
                  type="number"
                  name="passwordMinLength"
                  id="passwordMinLength"
                  min="6"
                  max="20"
                  value={settings.passwordMinLength}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <Input
                      id="passwordRequireUppercase"
                      name="passwordRequireUppercase"
                      type="checkbox"
                      checked={settings.passwordRequireUppercase}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <Label htmlFor="passwordRequireUppercase" className="font-medium text-gray-700">
                      Заглавная буква
                    </Label>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <Input
                      id="passwordRequireNumber"
                      name="passwordRequireNumber"
                      type="checkbox"
                      checked={settings.passwordRequireNumber}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <Label htmlFor="passwordRequireNumber" className="font-medium text-gray-700">
                      Цифра
                    </Label>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <Input
                      id="passwordRequireSpecial"
                      name="passwordRequireSpecial"
                      type="checkbox"
                      checked={settings.passwordRequireSpecial}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <Label htmlFor="passwordRequireSpecial" className="font-medium text-gray-700">
                      Специальный символ
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-4">Дополнительные настройки</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <Input
                    id="twoFactorAuthEnabled"
                    name="twoFactorAuthEnabled"
                    type="checkbox"
                    checked={settings.twoFactorAuthEnabled}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <Label htmlFor="twoFactorAuthEnabled" className="font-medium text-gray-700">
                    Двухфакторная аутентификация
                  </Label>
                  <p className="text-gray-500">
                    Требовать подтверждение входа через email
                  </p>
                </div>
              </div>
              
              <div>
                <Label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700">
                  Время сессии (мин)
                </Label>
                <Input
                  type="number"
                  name="sessionTimeout"
                  id="sessionTimeout"
                  min="5"
                  max="1440"
                  value={settings.sessionTimeout}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Сохранить настройки
          </Button>
        </div>
      </form>
    </div>
  );
}