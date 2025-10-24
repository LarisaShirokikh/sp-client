// ProfileInfo.tsx - Исправленный компонент с поддержкой массива ролей
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Award, Star, Calendar, UserCircle, ShieldCheck } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/UI/tooltip';
import { Medal, UserData } from '@/app/interface/auth';
import { RolesType } from '@/app/interface/user';
import { JSX } from 'react';

// Интерфейс для пропсов компонента
interface ProfileInfoProps {
  userData?: UserData | null;
}

// Функция для перевода ролей пользователя
const translateRole = (role?: string): string => {
  const roles: RolesType = {
    'super_admin': 'Самый главный администратор',
    'admin': 'Администратор',
    'moderator': 'Модератор',
    'verified': 'Проверенный пользователь',
    'user': 'Пользователь',
    'premium': 'Премиум пользователь',
    'author': 'Автор',
    'editor': 'Редактор',
    'organizer': 'Организатор'
  };

  return role && roles[role] ? roles[role] : 'Пользователь';
};

// Функция для получения основной роли пользователя
const getPrimaryRole = (roles?: string[]): string => {
  if (!roles || !Array.isArray(roles) || roles.length === 0) {
    return 'user';
  }

  // Приоритет ролей (от высшей к низшей)
  const rolePriority = [
    'super_admin',
    'admin',
    'moderator',
    'editor',
    'author',
    'premium',
    'verified',
    'organizer',
    'user'
  ];

  // Находим роль с наивысшим приоритетом
  for (const role of rolePriority) {
    if (roles.includes(role)) {
      return role;
    }
  }

  // Если не нашли ни одну из известных ролей, возвращаем первую из списка
  return roles[0];
};

// Заглушечные данные для медалей
const dummyMedals: Medal[] = [
  { id: 1, name: 'Отличный писатель', icon: 'pen', description: 'Создал более 10 высококачественных статей' },
  { id: 2, name: 'Эксперт отзывов', icon: 'thumbs-up', description: 'Оставил более 50 полезных отзывов' },
  { id: 3, name: 'Активный участник', icon: 'activity', description: 'В системе более года' }
];

export default function ProfileInfo({ userData }: ProfileInfoProps): JSX.Element {
  const registrationDate = userData?.created_at
    ? format(new Date(userData.created_at), 'PPP', { locale: ru })
    : 'Нет данных';

  // Получаем роли пользователя
  const roles = userData?.roles && Array.isArray(userData.roles)
    ? userData.roles
    : [userData?.roles || 'user'];

  // Получаем основную роль пользователя на русском
  const primaryRole = translateRole(getPrimaryRole(roles));

  // Отладочная информация
  console.log('User data in ProfileInfo:', userData);
  console.log('User roles:', roles);
  console.log('Primary role:', primaryRole);

  return (
    <div className="mt-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{userData?.name || 'Пользователь'}</h2>

          {/* Основная роль пользователя */}
          <div className="mt-1 flex items-center">
            <UserCircle className="h-4 w-4 mr-1 text-pink-600" />
            <span className="text-sm text-gray-600">{primaryRole}</span>
          </div>

          {/* Все роли пользователя */}
          {/* {roles.length > 1 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {roles.map((role, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {role === 'super_admin' || role === 'admin' ? (
                    <ShieldCheck className="h-3 w-3 mr-1 text-blue-600" />
                  ) : null}
                  {translateRole(roles)}
                </span>
              ))}
            </div>
          )} */}

          {/* Дата регистрации */}
          <div className="mt-1 flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-gray-600" />
            <span className="text-sm text-gray-600">
              С нами с {registrationDate}
            </span>
          </div>
        </div>

        {/* Медали/достижения пользователя */}
        <div className="flex space-x-2">
          <TooltipProvider>
            {dummyMedals.map(medal => (
              <Tooltip key={medal.id}>
                <TooltipTrigger>
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Award className="h-6 w-6 text-amber-600" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="p-2 max-w-xs">
                    <p className="font-bold">{medal.name}</p>
                    <p className="text-sm">{medal.description}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>

      <div className="mt-1 flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-600">
        {userData?.email && (
          <div className="flex items-center">
            <span>{userData.email}</span>
            {userData.is_verified && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Подтвержден
              </span>
            )}
          </div>
        )}
        {userData?.phone && (
          <div className="flex items-center">
            <span>Телефон: {userData.phone}</span>
            {userData.is_phone_verified && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Подтвержден
              </span>
            )}
          </div>
        )}
      </div>

      {userData?.description && (
        <p className="mt-3 text-gray-700">{userData.description}</p>
      )}

      <div className="mt-4 flex space-x-4">
        <div className="text-center">
          <span className="block font-medium">{userData?.followers_count || 0}</span>
          <span className="text-sm text-gray-500">Подписчики</span>
        </div>
        <div className="text-center">
          <span className="block font-medium">{userData?.following_count || 0}</span>
          <span className="text-sm text-gray-500">Подписки</span>
        </div>

        {/* Вывод рейтинга */}
        <div className="text-center flex flex-col items-center">
          <div className="flex items-center">
            <span className="block font-medium mr-1">
              {userData?.rating !== undefined ? userData.rating.toFixed(1) : '0.0'}
            </span>
            <Star className="h-4 w-4 text-amber-500" />
          </div>
          <span className="text-sm text-gray-500">Рейтинг</span>
        </div>
      </div>
    </div>
  );
}