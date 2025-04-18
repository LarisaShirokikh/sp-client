// src/utils/forumUtils.ts

import { Topic } from '@/app/interface/topic';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

// Типы цветов категорий 
export const COLOR_PALETTE = [
    "bg-purple-100 text-purple-800",
    "bg-green-100 text-green-800",
    "bg-blue-100 text-blue-800",
    "bg-yellow-100 text-yellow-800",
    "bg-red-100 text-red-800",
    "bg-indigo-100 text-indigo-800",
    "bg-pink-100 text-pink-800",
    "bg-teal-100 text-teal-800",
    "bg-orange-100 text-orange-800",
    "bg-cyan-100 text-cyan-800"
];

// Функция для форматирования даты
export const formatDate = (dateString: string | Date): string => {
    if (!dateString) return '';
    const date = new Date(dateString);

    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
        return 'Только что';
    } else if (diffInHours < 24) {
        return `${diffInHours} ${diffInHours === 1 ? 'час' : diffInHours < 5 ? 'часа' : 'часов'} назад`;
    } else {
        return format(date, 'dd MMMM в HH:mm', { locale: ru });
    }
};

// Функция для определения "горячих" тем
export const isHotTopic = (topic: Topic): boolean => {
    // Логика: много просмотров или лайков
    const viewThreshold = 100;
    const likeThreshold = 20;

    return (topic.view_count || 0) > viewThreshold || (topic.like_count || 0) > likeThreshold;
};

// Функция для расчета популярности темы
export const calculatePopularityScore = (topic: Topic): number => {
    const viewWeight = 1;
    const likeWeight = 3;
    const replyWeight = 2;

    // Дополнительный вес для недавних тем
    const recencyBonus = calculateRecencyBonus(topic.updated_at || topic.created_at);

    return (
        (topic.view_count || 0) * viewWeight +
        (topic.like_count || 0) * likeWeight +
        (topic.reply_count || 0) * replyWeight +
        recencyBonus
    );
};

// Функция для расчета бонуса за свежесть темы
export const calculateRecencyBonus = (dateString: string | Date): number => {
    if (!dateString) return 0;

    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    // Чем меньше часов прошло, тем выше бонус
    if (diffInHours < 24) {
        return 50 - diffInHours * 2; // От 50 до 2 бонусных баллов в первые сутки
    } else if (diffInHours < 72) {
        return 10; // Небольшой бонус для тем 1-3 дневной давности
    }

    return 0;
};

// Функция для получения самых популярных тем
export const getPopularTopics = (topics: Topic[], limit: number = 5): Topic[] => {
    // Рассчитываем показатель популярности для каждой темы
    const topicsWithPopularity = topics.map(topic => ({
        ...topic,
        popularityScore: calculatePopularityScore(topic)
    }));

    // Сортируем темы по рассчитанному показателю популярности
    const sortedTopics = topicsWithPopularity.sort((a, b) =>
        b.popularityScore - a.popularityScore
    );

    // Берем только указанное количество самых популярных тем
    return sortedTopics.slice(0, limit);
};

// Функция для создания карты цветов категорий
export const createCategoryColorMap = (topics: Topic[]): Record<string, string> => {
    // Собираем уникальные категории из полученных тем
    const uniqueCategories = new Set<string>();
    topics.forEach(topic => {
        if (topic.category?.name) {
            uniqueCategories.add(topic.category.name);
        }
    });

    // Создаем карту цветов для категорий
    const colorMap: Record<string, string> = {};
    Array.from(uniqueCategories).forEach((categoryName, index) => {
        colorMap[categoryName] = COLOR_PALETTE[index % COLOR_PALETTE.length];
    });

    return colorMap;
};