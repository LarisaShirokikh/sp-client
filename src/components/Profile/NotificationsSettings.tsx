// tabs/NotificationsSettings.tsx
import { useState } from 'react';
import { Bell } from 'lucide-react';
import { UserData } from '@/app/interface/auth';
import { Label } from '../UI/label';
import { Input } from '../UI/input';
import { Button } from '../UI/button';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  type: 'email' | 'push' | 'sms';
  enabled: boolean;
}

interface NotificationsSettingsProps {
  userData: UserData;
}

export const NotificationsSettings: React.FC<NotificationsSettingsProps> = ({ userData }) => {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'order_updates',
      title: 'Обновления заказов',
      description: 'Получайте уведомления о статусе ваших заказов',
      type: 'email',
      enabled: true
    },
    {
      id: 'promotions',
      title: 'Акции и специальные предложения',
      description: 'Получайте информацию о новых акциях и скидках',
      type: 'email',
      enabled: true
    },
    {
      id: 'news',
      title: 'Новости и события',
      description: 'Будьте в курсе наших последних новостей',
      type: 'email',
      enabled: false
    },
    {
      id: 'reviews',
      title: 'Запросы на отзывы',
      description: 'Получайте просьбы оставить отзыв о купленных товарах',
      type: 'email',
      enabled: true
    },
    {
      id: 'push_order',
      title: 'Push-уведомления о заказах',
      description: 'Получайте мгновенные уведомления о статусе заказов',
      type: 'push',
      enabled: true
    },
    {
      id: 'push_chat',
      title: 'Push-уведомления о сообщениях',
      description: 'Получайте уведомления о новых сообщениях от службы поддержки',
      type: 'push',
      enabled: false
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleToggle = (id: string) => {
    setSettings(settings.map(setting =>
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
    setSuccessMessage('');
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 800));
      setSuccessMessage('Настройки уведомлений успешно сохранены');
    } catch (error) {
      console.error('Ошибка сохранения настроек:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Настройки уведомлений</h2>
        <Bell className="h-6 w-6 text-pink-500" />
      </div>

      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg">
          {successMessage}
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Email уведомления</h3>
        <div className="space-y-4">
          {settings.filter(setting => setting.type === 'email').map(setting => (
            <div key={setting.id} className="flex items-start">
              <div className="flex items-center h-5">
                <Input
                  id={setting.id}
                  type="checkbox"
                  checked={setting.enabled}
                  onChange={() => handleToggle(setting.id)}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <Label htmlFor={setting.id} className="font-medium text-gray-700">
                  {setting.title}
                </Label>
                <p className="text-gray-500">{setting.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Push-уведомления</h3>
        <div className="space-y-4">
          {settings.filter(setting => setting.type === 'push').map(setting => (
            <div key={setting.id} className="flex items-start">
              <div className="flex items-center h-5">
                <Input
                  id={setting.id}
                  type="checkbox"
                  checked={setting.enabled}
                  onChange={() => handleToggle(setting.id)}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <Label htmlFor={setting.id} className="font-medium text-gray-700">
                  {setting.title}
                </Label>
                <p className="text-gray-500">{setting.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <Button
          onClick={handleSaveSettings}
          className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Сохранение...' : 'Сохранить настройки'}
        </Button>
      </div>
    </div>
  );
};
