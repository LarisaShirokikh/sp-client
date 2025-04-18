"use client"
import { Filter, MessageSquare, PlusCircle } from 'lucide-react';

import Link from 'next/link';
import { useForumContext } from '@/app/providers/ForumProvider';
import Pagination from './Pagination';
import { useEffect, useState } from 'react';
import TopicItem from './TopicItem';

// Палитра цветов для категорий
const colorPalette = [
  "bg-purple-100 text-purple-800 border-purple-200",
  "bg-green-100 text-green-800 border-green-200",
  "bg-blue-100 text-blue-800 border-blue-200",
  "bg-yellow-100 text-yellow-800 border-yellow-200",
  "bg-red-100 text-red-800 border-red-200",
  "bg-indigo-100 text-indigo-800 border-indigo-200",
  "bg-pink-100 text-pink-800 border-pink-200",
  "bg-teal-100 text-teal-800 border-teal-200",
  "bg-orange-100 text-orange-800 border-orange-200",
  "bg-cyan-100 text-cyan-800 border-cyan-200"
];

interface TopicsListProps {
  limit?: number;
}
const TopicsList = ({ limit }: TopicsListProps) => {
  const {
    processedTopics,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    topics,
    categoryColors
  } = useForumContext();

  // Создаем локальное состояние для цветов категорий
  const [localCategoryColors, setLocalCategoryColors] = useState<Record<string, string>>({});

  // Функция для назначения цветов категориям
  useEffect(() => {
    if (topics.length > 0) {
      // Собираем уникальные категории
      const uniqueCategories = new Set<string>();
      topics.forEach(topic => {
        if (topic.category?.name) {
          uniqueCategories.add(topic.category.name);
        }
      });

      // Начинаем с существующих цветов из контекста (если есть)
      const newColors = { ...(categoryColors || {}), ...localCategoryColors };

      // Считаем сколько категорий уже имеют цвета
      let colorIndex = Object.keys(newColors).length;

      // Назначаем цвета для новых категорий
      Array.from(uniqueCategories).forEach((categoryName) => {
        if (!newColors[categoryName]) {
          newColors[categoryName] = colorPalette[colorIndex % colorPalette.length];
          colorIndex++;
        }
      });

      setLocalCategoryColors(newColors);
    }
  }, [topics, categoryColors]);

  // Функция для получения цвета категории
  const getCategoryColor = (categoryName: string): string => {
    // Сначала проверяем цвета из контекста
    if (categoryColors && categoryColors[categoryName]) {
      return categoryColors[categoryName];
    }
    // Затем проверяем локальные цвета
    else if (localCategoryColors[categoryName]) {
      return localCategoryColors[categoryName];
    }
    // Возвращаем цвет по умолчанию
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  if (loading.topics) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
        <div className="animate-pulse flex flex-col space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex space-x-4">
              <div className="rounded-full bg-gray-200 h-12 w-12"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error.topics) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
        <p className="text-red-500">Ошибка загрузки тем: {error.topics}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  if (processedTopics.length === 0) {
    // Если есть поисковый запрос, но нет результатов
    if (searchQuery) {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="mb-4">
            <Filter size={48} className="mx-auto text-gray-400" />
          </div>
          <p className="text-gray-600 mb-2">Темы не найдены. Попробуйте изменить параметры поиска.</p>
          <button
            onClick={() => setSearchQuery('')}
            className="text-purple-600 hover:text-purple-800"
          >
            Сбросить поиск
          </button>
        </div>
      );
    }

    // Если нет тем вообще
    if (topics.length === 0) {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="mb-4">
            <MessageSquare size={48} className="mx-auto text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Нет активных тем</h3>
          <p className="text-gray-600 mb-6">Будьте первым, кто создаст новую тему на форуме!</p>
          <Link
            href="/forum/new"
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <PlusCircle size={18} className="mr-2" />
            Создать тему
          </Link>
        </div>
      );
    }
  }

  const visibleTopics = limit ? processedTopics.slice(0, limit) : processedTopics;

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
        {visibleTopics.map((topic) => {
          // Определяем цвет категории для конкретной темы
          const categoryName = topic.category?.name || 'Без категории';
          const categoryColorClass = getCategoryColor(categoryName);

          return (
            <TopicItem
              key={topic.id}
              topic={topic}
              categoryColorClass={categoryColorClass}
            />
          );
        })}
      </div>

      {/* {visibleTopics.length > 0 && <Pagination />} */}
    </>
  );
};

export default TopicsList;