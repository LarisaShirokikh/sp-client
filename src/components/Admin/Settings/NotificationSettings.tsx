import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';

export const NotificationSettings: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    newOrder: true,
    orderStatusChange: true,
    lowStockAlert: true,
    newUserRegistration: false,
    newsletterSubscription: false,
    systemUpdates: true
  });
  
  const [pushNotifications, setPushNotifications] = useState({
    newOrder: true,
    orderStatusChange: false,
    lowStockAlert: true,
    newUserRegistration: false,
    systemUpdates: false
  });

  const [emailTemplates, setEmailTemplates] = useState({
    orderConfirmation: 'default',
    passwordReset: 'default',
    welcomeEmail: 'custom',
    abandonedCart: 'disabled'
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleEmailNotificationChange = (key: keyof typeof emailNotifications) => {
    setEmailNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePushNotificationChange = (key: keyof typeof pushNotifications) => {
    setPushNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleEmailTemplateChange = (key: keyof typeof emailTemplates, value: string) => {
    setEmailTemplates(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Здесь будет запрос к API для сохранения настроек уведомлений
      await new Promise(resolve => setTimeout(resolve, 1000)); // Имитация запроса
      alert('Настройки уведомлений успешно сохранены');
    } catch (error) {
      console.error('Ошибка при сохранении настроек уведомлений:', error);
      alert('Произошла ошибка при сохранении настроек уведомлений');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-medium text-gray-800">Настройки уведомлений</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">Email-уведомления</h3>
          <div className="space-y-4">
            {Object.entries(emailNotifications).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <Input
                  id={`email-${key}`}
                  type="checkbox"
                  checked={value}
                  onChange={() => handleEmailNotificationChange(key as keyof typeof emailNotifications)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor={`email-${key}`} className="ml-3 block text-sm font-medium text-gray-700">
                  {key === 'newOrder' && 'Новый заказ'}
                  {key === 'orderStatusChange' && 'Изменение статуса заказа'}
                  {key === 'lowStockAlert' && 'Предупреждение о низком запасе товаров'}
                  {key === 'newUserRegistration' && 'Регистрация нового пользователя'}
                  {key === 'newsletterSubscription' && 'Подписка на рассылку'}
                  {key === 'systemUpdates' && 'Системные обновления'}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">Push-уведомления</h3>
          <div className="space-y-4">
            {Object.entries(pushNotifications).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <Input
                  id={`push-${key}`}
                  type="checkbox"
                  checked={value}
                  onChange={() => handlePushNotificationChange(key as keyof typeof pushNotifications)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor={`push-${key}`} className="ml-3 block text-sm font-medium text-gray-700">
                  {key === 'newOrder' && 'Новый заказ'}
                  {key === 'orderStatusChange' && 'Изменение статуса заказа'}
                  {key === 'lowStockAlert' && 'Предупреждение о низком запасе товаров'}
                  {key === 'newUserRegistration' && 'Регистрация нового пользователя'}
                  {key === 'systemUpdates' && 'Системные обновления'}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">Шаблоны email-сообщений</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="orderConfirmation" className="block text-sm font-medium text-gray-700">
                Подтверждение заказа
              </Label>
              <select
                id="orderConfirmation"
                value={emailTemplates.orderConfirmation}
                onChange={(e) => handleEmailTemplateChange('orderConfirmation', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="default">По умолчанию</option>
                <option value="custom">Пользовательский</option>
                <option value="disabled">Отключен</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="passwordReset" className="block text-sm font-medium text-gray-700">
                Сброс пароля
              </Label>
              <select
                id="passwordReset"
                value={emailTemplates.passwordReset}
                onChange={(e) => handleEmailTemplateChange('passwordReset', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="default">По умолчанию</option>
                <option value="custom">Пользовательский</option>
                <option value="disabled">Отключен</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="welcomeEmail" className="block text-sm font-medium text-gray-700">
                Приветственное письмо
              </Label>
              <select
                id="welcomeEmail"
                value={emailTemplates.welcomeEmail}
                onChange={(e) => handleEmailTemplateChange('welcomeEmail', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="default">По умолчанию</option>
                <option value="custom">Пользовательский</option>
                <option value="disabled">Отключен</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="abandonedCart" className="block text-sm font-medium text-gray-700">
                Брошенная корзина
              </Label>
              <select
                id="abandonedCart"
                value={emailTemplates.abandonedCart}
                onChange={(e) => handleEmailTemplateChange('abandonedCart', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="default">По умолчанию</option>
                <option value="custom">Пользовательский</option>
                <option value="disabled">Отключен</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="pt-4 flex justify-end">
          <Button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isLoading ? 'Сохранение...' : 'Сохранить настройки'}
          </Button>
        </div>
      </form>
    </div>
  );
};