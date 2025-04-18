import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import Modal from '../ui/modal';
import { useAuth } from '@/app/hooks/useAuth';
import { toast } from 'sonner';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: (email: string, password: string) => Promise<void>;
  currentHoliday?: { colors: string } | null;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentHoliday
}) => {
  // Get auth functions directly from the hook
  const { login, register, isLoading: authLoading, error: authError } = useAuth();

  // State for login form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // State for registration form
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  
  // UI state
  const [isLoginView, setIsLoginView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [regErrors, setRegErrors] = useState<{ [key: string]: string }>({});

  // Display errors using toast when they change
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (authError) {
      toast.error(authError);
      setError(authError);
    }
  }, [authError]);

  // Handle login submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      await login(email, password);
      onClose();
    } catch (err) {
      setError(authError || (err instanceof Error ? err.message : 'Ошибка входа'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setRegErrors({}); // сбрасываем старые ошибки
  
    try {
      await register(name, regEmail, phone, regPassword);
      setIsLoading(false);
    onClose();
    } catch (err) {
      const message = authError || (err instanceof Error ? err.message : 'Ошибка регистрации');
  
      // Простая логика разметки по ключевым словам
      if (message.includes('email')) {
        setRegErrors({ email: message });
      } else if (message.includes('телефон')) {
        setRegErrors({ phone: message });
      } else if (message.includes('имя') || message.includes('name')) {
        setRegErrors({ name: message });
      } else {
        setError(message);
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle between login and registration views
  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError(null);
  };

  // Use a default gradient if currentHoliday is undefined or null
  const gradientColors = currentHoliday?.colors || 'from-pink-500 to-purple-500';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLoginView ? 'Вход' : 'Регистрация'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md text-sm">
            {error}
          </div>
        )}

        {isLoginView ? (
          // Login Form
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Введите email"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Пароль</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Введите пароль"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || authLoading}
              className={`w-full py-2 px-4 rounded-md text-white text-sm font-medium bg-gradient-to-r ${gradientColors} hover:opacity-90 transition-opacity`}
            >
              {isLoading || authLoading ? 'Входим...' : 'Войти'}
            </Button>
          </form>
        ) : (
          // Registration Form
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Имя</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Введите имя"
                  required
                />
                {regErrors.name && (
  <p className="mt-1 text-sm text-red-500">{regErrors.name}</p>
)}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Введите email"
                  required
                />
                {regErrors.email && (
  <p className="mt-1 text-sm text-red-500">{regErrors.email}</p>
)}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Телефон</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <Phone size={18} />
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Введите номер телефона"
                  required
                />
                {regErrors.phone && (
  <p className="mt-1 text-sm text-red-500">{regErrors.phone}</p>
)}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Пароль</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <Lock size={18} />
                </span>
                <input
                  type={showRegPassword ? "text" : "password"}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Придумайте пароль"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                  onClick={() => setShowRegPassword(!showRegPassword)}
                >
                  {showRegPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || authLoading}
              className={`w-full py-2 px-4 rounded-md text-white text-sm font-medium bg-gradient-to-r ${gradientColors} hover:opacity-90 transition-opacity`}
            >
              {isLoading || authLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>
          </form>
        )}

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={toggleView}
            className="text-sm text-pink-600 hover:text-pink-800 transition-colors"
          >
            {isLoginView ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
          </button>
        </div>
      </div>
    </Modal>
  );
};