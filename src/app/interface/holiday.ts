// @/types/holiday.ts
export interface HolidayTheme {
    name: string;
    colors: string; // градиент для кнопок и элементов, например 'from-pink-400 to-red-400'
    bgGradient: string; // градиент для фонов, например 'bg-gradient-to-r from-pink-100 to-red-100'
    bannerText: string; // текст баннера
    icon: string; // эмодзи или иконка
    buttonBg: string; // фон для кнопок
    accentColor: string; // акцентный цвет текста
    borderColor: string; // цвет границ
    logo?: string; // путь к логотипу (опционально)
  }
  
  
  
  