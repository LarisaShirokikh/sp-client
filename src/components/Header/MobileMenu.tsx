import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, Bell, Heart, ShoppingCart, LogOut } from 'lucide-react';
import { UserData } from '@/app/interface/auth';
import { HolidayTheme } from '@/app/interface/holiday';
interface MobileMenuProps {
  isLoggedIn: boolean;
  userData: UserData | null;
  currentHoliday: HolidayTheme | null;
  activeSection: string;
  setActiveSection: (section: string) => void;
  setShowLoginModal: (show: boolean) => void;
  closeMenu: () => void;
  logout: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isLoggedIn,
  userData,
  currentHoliday,
  activeSection,
  setActiveSection,
  setShowLoginModal,
  closeMenu,
  logout
}) => {
  const navItems = ['Совместные закупки', 'Форум', 'События', 'Блог'];
  
  return (
    <motion.div 
      className="md:hidden bg-white shadow-lg border-t border-gray-100"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-3">
        {isLoggedIn && userData && (
          <div className="flex items-center space-x-3 py-3 border-b border-gray-100">
            {userData.avatar_url ? (
              <img 
                src={userData.avatar_url} 
                alt={userData.name} 
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-500" />
              </div>
            )}
            <div>
              <p className="font-medium text-gray-800">{userData.name}</p>
              <p className="text-sm text-gray-500">{userData.email}</p>
            </div>
          </div>
        )}

        <nav className="py-3">
          <ul>
            {navItems.map((item) => (
              <li key={item} className="mb-2">
                <button
                  className={`w-full text-left py-2 px-1 ${
                    activeSection === item
                      ? 'text-primary-600 font-medium'
                      : 'text-gray-700'
                  }`}
                  onClick={() => {
                    setActiveSection(item);
                    closeMenu();
                  }}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {currentHoliday && (
          <div className="py-3 border-t border-gray-100">
            <Link 
              className="flex items-center space-x-2 text-primary-600 py-2"
              onClick={closeMenu}
            >
              <span className="text-lg">🎉</span>
              <span>{currentHoliday.name}</span>
            </Link>
          </div>
        )}

        <div className="py-3 border-t border-gray-100">
          {isLoggedIn ? (
            <>
              <ul>
                <li className="mb-2">
                  <Link 
                    href="/notifications" 
                    className="flex items-center space-x-2 py-2"
                    onClick={closeMenu}
                  >
                    <Bell className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">Уведомления</span>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link 
                    href="/favorites" 
                    className="flex items-center space-x-2 py-2"
                    onClick={closeMenu}
                  >
                    <Heart className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">Избранное</span>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link 
                    href="/cart" 
                    className="flex items-center space-x-2 py-2"
                    onClick={closeMenu}
                  >
                    <ShoppingCart className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">Корзина</span>
                  </Link>
                </li>
                <li>
                  <button 
                    className="flex items-center space-x-2 py-2 text-red-500"
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Выйти</span>
                  </button>
                </li>
              </ul>
            </>
          ) : (
            <button
              className="w-full py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
              onClick={() => {
                setShowLoginModal(true);
                closeMenu();
              }}
            >
              Войти / Зарегистрироваться
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};