// components/ThemeSwitcher.tsx
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHoliday } from '@/app/hooks/useHoliday';
import { Button } from './ui/button';

const THEMES = [
  { id: null, name: 'Обычная тема', icon: '🌈' },
  { id: 'valentine', name: 'День Святого Валентина', icon: '❤️' },
  { id: 'spring', name: 'Весна', icon: '🌸' },
  { id: 'summer', name: 'Лето', icon: '☀️' },
  { id: 'autumn', name: 'Осень', icon: '🍂' },
  { id: 'winter', name: 'Зима', icon: '❄️' },
  { id: 'newyear', name: 'Новый Год', icon: '🎄' },
  { id: 'march8', name: '8 Марта', icon: '💐' },
  { id: 'easter', name: 'Пасха', icon: '🐰' }
];

export const ThemeSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentHoliday, setHoliday } = useHoliday();
  
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const handleThemeSelect = (themeId: string | null) => {
    setHoliday(themeId);
    setIsOpen(false);
  };
  
  // Находим текущую тему для отображения
  const currentTheme = THEMES.find(theme => 
    theme.id === null ? !currentHoliday : currentHoliday?.name === THEMES.find(t => t.id === theme.id)?.name
  );

  return (
    <div className="relative">
      <Button
        onClick={toggleDropdown}
        className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
          currentHoliday ? currentHoliday.buttonBg : 'bg-gray-100 hover:bg-gray-200'
        } transition-colors`}
      >
        <span>{currentTheme?.icon || '🌈'}</span>
        <span className="text-sm font-medium">{currentTheme?.name || 'Тема'}</span>
        <ChevronDown className="h-4 w-4" />
      </Button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white z-50 py-2 border"
            >
              {THEMES.map((theme) => (
                <button
                  key={theme.id || 'default'}
                  onClick={() => handleThemeSelect(theme.id)}
                  className={`w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 ${
                    (theme.id === null && !currentHoliday) || 
                    (theme.id !== null && currentHoliday?.name === THEMES.find(t => t.id === theme.id)?.name)
                      ? 'bg-gray-50'
                      : ''
                  }`}
                >
                  <span className="text-lg">{theme.icon}</span>
                  <span className="text-sm">{theme.name}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};