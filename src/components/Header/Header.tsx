// components/Header.tsx
"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, Heart, ShoppingCart, Menu, X, User, Search, ChevronDown, LogOut, Settings, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/app/hooks/useAuth';
import { NavLinks } from './NavLinks';
import { SearchBox } from './SearchBox';
import { NotificationsMenu } from './NotificationsMenu';
import { WishlistMenu } from './WishlistMenu';
import { CartMenu } from './CartMenu';
import { ProfileMenu } from './ProfileMenu';
import { MobileMenu } from './MobileMenu';
import { LoginModal } from '../Auth/LoginModal';
import { HeaderLogo } from './HeaderLogo';
import { Button } from '../ui/button';
import { useLoginModal } from '@/app/providers/LoginModalProvider';

// Types for the header component
interface HeaderProps {
  initialTheme?: string;
}

const Header: React.FC<HeaderProps> = ({ initialTheme }) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showSearchBox, setShowSearchBox] = useState(false);
  
  // Используем хук аутентификации для получения состояния и функций
  const { isLoggedIn, userData, login, logout, isLoading } = useAuth();
  const { isOpen, open, close } = useLoginModal();
  
  // Handle scroll for header animation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setShowSearchBox(!showSearchBox);
  };

  // Обработчик авторизации
  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      close(); // Закрываем модальное окно после успешной авторизации
    } catch (error) {
      // Ошибка уже обрабатывается в AuthProvider
      console.log("Ошибка авторизации в интерфейсе");
    }
  };

  // Обработчик выхода
  const handleLogout = async () => {
    await logout();
    // Можно добавить дополнительные действия после выхода, например, редирект
    // router.push('/');
  };

  return (
    <>
      <nav className={`sticky top-0 w-full transition-all duration-300 z-50 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo with improved animation */}
            <HeaderLogo  />
            
            {/* Desktop navigation - centered with improved animation */}
            <NavLinks 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
            />

            {/* Right side - Search and user control elements */}
            <div className="hidden md:flex items-center space-x-2">
              {/* Search */}
              <div className="relative">
                <button 
                  onClick={toggleSearch}
                  className="p-2 rounded-full text-gray-500 hover:text-pink-500 hover:bg-pink-50 transition-all duration-200"
                >
                  <Search className="h-5 w-5" />
                </button>
                
                {/* Dropdown search */}
                <AnimatePresence>
                  {showSearchBox && (
                    <SearchBox 
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                    />
                  )}
                </AnimatePresence>
              </div>
              
              {isLoading ? (
                // Показываем индикатор загрузки, пока проверяем авторизацию
                <div className="w-8 h-8 rounded-full border-2 border-pink-500 border-t-transparent animate-spin"></div>
              ) : isLoggedIn ? (
                <div className="flex items-center space-x-1">
                  {/* Notifications */}
                  <NotificationsMenu  />
                  
                  {/* Wishlist */}
                  <WishlistMenu  />
                  
                  {/* Cart */}
                  <CartMenu  />
                  
                  {/* User menu с передачей данных пользователя */}
                  <ProfileMenu 
                    userData={userData}
                    onLogout={handleLogout}
                  />
                </div>
              ) : (
                <Button
                  onClick={open}
                  className={`py-2 px-4 rounded-full text-white text-sm font-medium bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 transition-opacity`}
                >
                  Войти
                </Button>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={toggleMenu}
                className="p-2 rounded-full text-gray-500 hover:text-pink-500 hover:bg-pink-50"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <MobileMenu 
              isLoggedIn={isLoggedIn} 
              userData={userData} 
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              setShowLoginModal={open}
              closeMenu={() => setIsMenuOpen(false)}
              logout={handleLogout}
            />
          )}
        </AnimatePresence>
      </nav>
      
      {/* Login modal */}
      <AnimatePresence>
        {isOpen && (
          <LoginModal 
            isOpen={isOpen} 
            onClose={close}
            onLogin={handleLogin}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;