'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth'; // Обновите путь к вашему хуку
import { useLoginModal } from '@/app/providers/LoginModalProvider';
import { Spinner } from '../UI/spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallbackRoute?: string;
}

export default function ProtectedRoute({
  children,
  fallbackRoute = '/forum'
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();
  const { open: openLoginModal, close: closeLoginModal } = useLoginModal();

  useEffect(() => {
    // Если пользователь не авторизован и не идет загрузка - показываем модальное окно
    if (!isLoading && !isLoggedIn) {
      openLoginModal();
    }
  }, [isLoggedIn, isLoading, openLoginModal]);

  // Обработчик успешного входа - будет вызван из самого модального окна после входа
  // через onLoginSuccess пропс

  // Обработчик закрытия модального окна без входа - перенаправляем на fallbackRoute
  useEffect(() => {
    // Если модальное окно было закрыто, но пользователь не авторизовался
    const handleCloseWithoutLogin = () => {
      if (!isLoggedIn) {
        router.push(fallbackRoute);
      }
    };

    // Здесь можно добавить слушатель для события закрытия модального окна
    // Это зависит от вашей реализации модального окна

    return () => {
      // Очистка слушателя при размонтировании
    };
  }, [isLoggedIn, router, fallbackRoute]);

  // Если идет проверка авторизации, показываем загрузку
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  // Если пользователь авторизован, показываем содержимое страницы
  if (isLoggedIn) {
    return <>{children}</>;
  }

  // В противном случае, не показываем содержимое (модальное окно будет показано через LoginModalWrapper)
  return null;
}