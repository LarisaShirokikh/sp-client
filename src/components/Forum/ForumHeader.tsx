"use client"
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PlusCircle } from 'lucide-react';
import useAuth from '@/app/hooks/useAuth';
import Modal from '@/components/UI/modal'; // Adjust the import path as needed
import { LoginModal } from '@/components/Auth/LoginModal'; // Adjust the import path as needed

const ForumHeader = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleCreateTopic = () => {
    if (isLoggedIn) {
      router.push('/forum/new');
    } else {
      // Show the first modal explaining auth requirement
      setShowAuthModal(true);
    }
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleLoginClick = () => {
    // Close the first modal and open the login modal
    setShowAuthModal(false);
    setShowLoginModal(true);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Форум сообщества</h1>
        <p className="text-gray-600">Обсуждайте интересующие вас темы и делитесь опытом</p>
      </div>

      <button
        onClick={handleCreateTopic}
        className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        <PlusCircle size={18} className="mr-2" />
        Создать тему
      </button>

      {/* First modal - Authentication Required */}
      <Modal
        isOpen={showAuthModal}
        onClose={closeAuthModal}
        title="Требуется авторизация"
        maxWidth="md"
      >
        <div className="p-6">
          <p className="mb-6 text-gray-600">
            Для создания новой темы необходимо войти в систему или зарегистрироваться.
          </p>
          <div className="flex space-x-3">
            <button
              onClick={handleLoginClick}
              className="flex-1 px-4 py-2 bg-purple-600 text-white text-center rounded-lg hover:bg-purple-700 transition-colors"
            >
              Войти
            </button>
            {/* <Link 
              href="/register" 
              className="flex-1 px-4 py-2 border border-purple-600 text-purple-600 text-center rounded-lg hover:bg-purple-50 transition-colors"
            >
              Регистрация
            </Link> */}
            <button
              onClick={closeAuthModal}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
          </div>
        </div>
      </Modal>

      {/* Second modal - Login/Registration Form */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={closeLoginModal}
      />
    </div>
  );
};

export default ForumHeader;