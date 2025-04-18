// app/hooks/useHoliday.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { HolidayTheme } from '@/app/interface/holiday';

interface HolidayContextType {
  currentHoliday: HolidayTheme | null;
  setHoliday: (holiday: string | null) => void;
}

// Создаем красивые темы для праздников
const HOLIDAY_THEMES: Record<string, HolidayTheme> = {
  'valentine': {
    name: 'День Святого Валентина',
    colors: 'from-pink-400 to-red-400',
    bgGradient: 'bg-gradient-to-r from-pink-100 to-red-100',
    bannerText: 'Скидки ко Дню Святого Валентина до 30%!',
    icon: '❤️',
    buttonBg: 'bg-pink-500 hover:bg-pink-600',
    accentColor: 'text-pink-500',
    borderColor: 'border-pink-300',
    logo: '/valentine-logo.svg'
  },
  'spring': {
    name: 'Весна',
    colors: 'from-green-400 to-emerald-500',
    bgGradient: 'bg-gradient-to-r from-green-50 to-emerald-100',
    bannerText: 'Весенние новинки уже в продаже!',
    icon: '🌸',
    buttonBg: 'bg-emerald-500 hover:bg-emerald-600',
    accentColor: 'text-emerald-500',
    borderColor: 'border-emerald-300',
    logo: '/spring-logo.svg'
  },
  'summer': {
    name: 'Лето',
    colors: 'from-blue-400 to-cyan-500',
    bgGradient: 'bg-gradient-to-r from-blue-50 to-cyan-100',
    bannerText: 'Летняя коллекция со скидками до 25%!',
    icon: '☀️',
    buttonBg: 'bg-blue-500 hover:bg-blue-600',
    accentColor: 'text-blue-500',
    borderColor: 'border-blue-300',
    logo: '/summer-logo.svg'
  },
  'autumn': {
    name: 'Осень',
    colors: 'from-amber-400 to-orange-500',
    bgGradient: 'bg-gradient-to-r from-amber-50 to-orange-100',
    bannerText: 'Осенние тренды уже здесь!',
    icon: '🍂',
    buttonBg: 'bg-amber-500 hover:bg-amber-600',
    accentColor: 'text-amber-500',
    borderColor: 'border-amber-300',
    logo: '/autumn-logo.svg'
  },
  'winter': {
    name: 'Зима',
    colors: 'from-indigo-400 to-purple-500',
    bgGradient: 'bg-gradient-to-r from-indigo-50 to-purple-100',
    bannerText: 'Зимняя распродажа до 40%!',
    icon: '❄️',
    buttonBg: 'bg-indigo-500 hover:bg-indigo-600',
    accentColor: 'text-indigo-500',
    borderColor: 'border-indigo-300',
    logo: '/winter-logo.svg'
  },
  'newyear': {
    name: 'Новый Год',
    colors: 'from-green-500 to-red-500',
    bgGradient: 'bg-gradient-to-r from-green-100 to-red-100',
    bannerText: 'С Новым Годом! Праздничные скидки до 50%!',
    icon: '🎄',
    buttonBg: 'bg-green-500 hover:bg-green-600',
    accentColor: 'text-green-600',
    borderColor: 'border-green-300',
    logo: '/newyear-logo.svg'
  },
  'march8': {
    name: '8 Марта',
    colors: 'from-pink-400 to-purple-400',
    bgGradient: 'bg-gradient-to-r from-pink-100 to-purple-100',
    bannerText: 'С 8 Марта! Особые скидки для милых дам!',
    icon: '💐',
    buttonBg: 'bg-pink-500 hover:bg-pink-600',
    accentColor: 'text-pink-500',
    borderColor: 'border-pink-300',
    logo: '/march8-logo.svg'
  },
  'easter': {
    name: 'Пасха',
    colors: 'from-yellow-400 to-amber-500',
    bgGradient: 'bg-gradient-to-r from-yellow-50 to-amber-100',
    bannerText: 'Светлой Пасхи! Праздничные предложения!',
    icon: '🐰',
    buttonBg: 'bg-yellow-500 hover:bg-yellow-600',
    accentColor: 'text-amber-500',
    borderColor: 'border-amber-300',
    logo: '/easter-logo.svg'
  }
};

const HolidayContext = createContext<HolidayContextType | undefined>(undefined);

export const HolidayProvider = ({ children }: { children: ReactNode }) => {
  const [currentHoliday, setCurrentHoliday] = useState<HolidayTheme | null>(null);

  useEffect(() => {
    // Проверяем сохраненную тему в localStorage
    const savedTheme = localStorage.getItem('holidayTheme');
    if (savedTheme && HOLIDAY_THEMES[savedTheme]) {
      setCurrentHoliday(HOLIDAY_THEMES[savedTheme]);
    }
  }, []);

  const setHoliday = (holiday: string | null) => {
    if (holiday === null) {
      setCurrentHoliday(null);
      localStorage.removeItem('holidayTheme');
    } else if (HOLIDAY_THEMES[holiday]) {
      setCurrentHoliday(HOLIDAY_THEMES[holiday]);
      localStorage.setItem('holidayTheme', holiday);
    }
  };

  return (
    <HolidayContext.Provider value={{ currentHoliday, setHoliday }}>
      {children}
    </HolidayContext.Provider>
  );
};

export const useHoliday = () => {
  const context = useContext(HolidayContext);
  if (context === undefined) {
    throw new Error('useHoliday must be used within a HolidayProvider');
  }
  return context;
};