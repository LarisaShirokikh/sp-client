// ProfileAvatar.tsx - Компонент для аватара пользователя
import { ProfileAvatarProps } from '@/app/interface/profile';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Camera, Edit } from 'lucide-react';


export default function ProfileAvatar({ 
  avatarUrl, 
  userData, 
  avatarError, 
  setAvatarError, 
  onChangeAvatar, 
  onEditProfile 
}: ProfileAvatarProps) {
  // Функция для получения инициалов из имени
  const getInitials = (name?: string): string => {
    if (!name) return 'U';
    
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="relative -mt-16 flex justify-between items-end">
      <div className="relative group">
        <Avatar className="h-32 w-32 ring-4 ring-white shadow-md">
          {userData?.avatar_url && !avatarError ? (
            <img 
              src={avatarUrl}
              alt={userData?.name || 'User'}
              className="h-full w-full object-cover"
              onError={(e) => {
                console.error("Image failed to load:", e);
                e.currentTarget.style.display = 'none';
                setAvatarError(true);
              }}
            />
          ) : (
            <AvatarFallback className="text-2xl bg-blue-500 text-white">
              {getInitials(userData?.name)}
            </AvatarFallback>
          )}
        </Avatar>
        <button 
          onClick={onChangeAvatar}
          className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md 
                     hover:bg-gray-100 transition duration-200"
          aria-label="Изменить фото профиля"
        >
          <Camera className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      <Button 
        onClick={onEditProfile}
        variant="outline" 
        className="flex items-center gap-2"
      >
        <Edit className="h-4 w-4" />
        <span>Редактировать профиль</span>
      </Button>
    </div>
  );
}