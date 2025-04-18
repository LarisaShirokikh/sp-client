"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquare, ThumbsUp, User, Clock, AlertCircle } from 'lucide-react';
import { getMediaUrl } from '@/lib/utils';
import { API_CONFIG } from "@/lib/apiConfig";

// Определим типы для данных активности
interface ActivityUser {
  id: number;
  name: string;
  avatar_url?: string;
}

interface Activity {
  id: number;
  type: 'post' | 'reply' | 'like';  // Обновили типы согласно бэкенду
  user: ActivityUser;
  content: string;
  created_at: string;
  link: string;
  entity_id?: number;
}

// Сервис для работы с API активности
const ActivityApiService = {
  getRecentActivities: async (limit: number = 5): Promise<Activity[]> => {
    try {
      // Проверяем наличие завершающего слеша в BASE_URL
      const baseUrl = API_CONFIG.BASE_URL.endsWith('/')
        ? API_CONFIG.BASE_URL.slice(0, -1)
        : API_CONFIG.BASE_URL;

      const response = await fetch(`${baseUrl}/activities?limit=${limit}`);

      if (!response.ok) {
        throw new Error(`Не удалось загрузить данные активности: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Ошибка при получении активности:', error);
      throw error;
    }
  }
};

// Функция для форматирования времени
const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Только что';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${getMinutesWord(minutes)} назад`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${getHoursWord(hours)} назад`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${getDaysWord(days)} назад`;
  } else {
    // Форматируем дату, если прошло больше недели
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};

// Вспомогательные функции для склонения слов
const getMinutesWord = (minutes: number): string => {
  if (minutes === 1 || (minutes > 20 && minutes % 10 === 1)) return 'минуту';
  if ((minutes >= 2 && minutes <= 4) || (minutes > 20 && minutes % 10 >= 2 && minutes % 10 <= 4)) return 'минуты';
  return 'минут';
};

const getHoursWord = (hours: number): string => {
  if (hours === 1 || (hours > 20 && hours % 10 === 1)) return 'час';
  if ((hours >= 2 && hours <= 4) || (hours > 20 && hours % 10 >= 2 && hours % 10 <= 4)) return 'часа';
  return 'часов';
};

const getDaysWord = (days: number): string => {
  if (days === 1 || (days > 20 && days % 10 === 1)) return 'день';
  if ((days >= 2 && days <= 4) || (days > 20 && days % 10 >= 2 && days % 10 <= 4)) return 'дня';
  return 'дней';
};

// Функция для определения иконки типа активности
const getActivityIcon = (type: string) => {
  switch (type) {
    case 'post':
      return <MessageSquare size={16} className="text-purple-600" />;
    case 'reply':
      return <MessageSquare size={16} className="text-green-600" />;
    case 'like':
      return <ThumbsUp size={16} className="text-pink-600" />;
    default:
      return <MessageSquare size={16} />;
  }
};

// Функция для генерации текста о действии пользователя
const getActivityContent = (activity: Activity): string => {
  switch (activity.type) {
    case 'post':
      return `Создал(а) новую тему: "${activity.content}"`;
    case 'reply':
      return `Ответил(а) в теме: "${activity.content}"`;
    case 'like':
      return `Оценил(а) запись: "${activity.content}"`;
    default:
      return activity.content;
  }
};

const RecentActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const data = await ActivityApiService.getRecentActivities(5);
        setActivities(data);
        setError(null);
      } catch (err: any) {
        console.error("Ошибка при загрузке активности:", err);
        setError(err?.message || "Не удалось загрузить данные активности");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Показываем скелетон во время загрузки
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-900">Активность сообщества</h2>
          <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-start border-b border-gray-100 pb-4">
              <div className="mr-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mr-2"></div>
                  <div className="w-6 h-6 rounded bg-gray-200 animate-pulse"></div>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Если возникла ошибка при загрузке
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-900">Активность сообщества</h2>
          <Link href="/activity" className="text-purple-600 hover:text-purple-800 font-medium">
            Вся активность
          </Link>
        </div>

        <div className="p-4 text-center text-red-500 flex flex-col items-center">
          <AlertCircle size={40} className="mb-2" />
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 text-purple-600 hover:text-purple-800 text-sm font-medium"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  // Если активности отсутствуют
  if (activities.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-900">Активность сообщества</h2>
          <Link href="/activity" className="text-purple-600 hover:text-purple-800 font-medium">
            Вся активность
          </Link>
        </div>

        <div className="p-4 text-center text-gray-500">
          <p>Пока нет активности в сообществе</p>
        </div>
      </div>
    );
  }

  // Основной вид компонента с загруженными данными
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-900">Активность сообщества</h2>
        <Link href="/activity" className="text-purple-600 hover:text-purple-800 font-medium">
          Вся активность
        </Link>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          // Получаем и форматируем содержимое активности
          const activityContent = getActivityContent(activity);

          // Получаем и форматируем аватар пользователя
          const avatarUrl = activity.user.avatar_url ?
            getMediaUrl(activity.user.avatar_url) :
            '/default-avatar.png'; // Путь к дефолтному аватару

          // Форматируем время
          const timeAgo = formatTimeAgo(activity.created_at);

          return (
            <Link key={activity.id} href={activity.link}>
              <div className="flex items-start border-b border-gray-100 pb-4 hover:bg-purple-50 p-2 rounded transition-colors">
                <div className="mr-3">
                  <img
                    src={avatarUrl}
                    alt={activity.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="font-medium text-purple-900 mr-2">{activity.user.name}</span>
                    <div className="bg-gray-100 p-1 rounded">
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-1">{activityContent}</p>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Clock size={12} className="mr-1" />
                    {timeAgo}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivities;