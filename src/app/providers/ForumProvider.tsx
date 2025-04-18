"use client"
import React, { createContext, useContext, ReactNode } from 'react';
import { useForum } from '../hooks/useForum';
import { Topic } from '../interface/topic';

// Типизация контекста
export type ForumContextType = ReturnType<typeof useForum> & {
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  sortBy: 'newest' | 'popular' | 'active';
  setSortBy: React.Dispatch<React.SetStateAction<'newest' | 'popular' | 'active'>>;
  formatDate: (dateString: string) => string;
  processedTopics: any[]; // Уточните тип в соответствии с вашей моделью данных
  categoryColors: Record<string, string>;
  isHotTopic: (topic: any) => boolean;
};

// Создаем контекст
const ForumContext = createContext<ForumContextType | null>(null);

// Хук для использования контекста
export const useForumContext = () => {
  const context = useContext(ForumContext);
  if (!context) {
    throw new Error('useForumContext must be used within a ForumProvider');
  }
  return context;
};

// Провайдер контекста
export const ForumProvider = ({ children }: { children: ReactNode }) => {
  const forumData = useForum();
  const { topics, categories } = forumData;

  const [activeCategory, setActiveCategory] = React.useState<string>('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortBy, setSortBy] = React.useState<'newest' | 'popular' | 'active'>('newest');

  // Функция форматирования даты
  const formatDate = (dateInput: string | Date): string => {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Сегодня, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Вчера, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays < 7) {
      return `${diffDays} дн. назад`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Сортировка и фильтрация тем
  const processedTopics = topics
    .filter(topic => {
      const category = categories.find(cat => cat.id === topic.category?.id);
      const categoryName = category ? category.name : 'Без категории';

      const matchesCategory = activeCategory === 'all' || categoryName === activeCategory;
      const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortBy === 'popular') {
        return (b.view_count || 0) - (a.view_count || 0);
      } else { // 'active'
        return (b.reply_count || 0) - (a.reply_count || 0);
      }
    });

  const categoryColors: Record<string, string> = {
    "Психология": "bg-purple-100 text-purple-800 border-purple-200",
    "Питание": "bg-green-100 text-green-800 border-green-200",
    "Воспитание": "bg-blue-100 text-blue-800 border-blue-200",
    "Образование": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Здоровье": "bg-red-100 text-red-800 border-red-200",
    "default": "bg-gray-100 text-gray-800 border-gray-200"
  };

  // Проверка на "горячую" тему
  const isHotTopic = (topic: Topic | null | undefined) => {
    if (!topic) return false;

    const viewThreshold = 100;
    const replyThreshold = 10;
    return topic.view_count > viewThreshold || topic.reply_count > replyThreshold;
  };

  const value = {
    ...forumData,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    formatDate,
    processedTopics,
    categoryColors,
    isHotTopic
  };

  return (
    <ForumContext.Provider value={value}>
      {children}
    </ForumContext.Provider>
  );
};