"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MessageSquare, Eye, ThumbsUp, ArrowUpRight, Heart } from 'lucide-react';
import { useForumContext } from '@/app/providers/ForumProvider';
import { AuthContext } from '@/app/providers/AuthProvider';
import { useContext } from 'react';
import { getMediaUrl } from '@/lib/utils';
import { Topic } from '@/app/interface/topic';
import { TopicApiService } from '@/services/topicApiService';
import { toast } from 'sonner';

type Props = {
  topic: Topic;
  categoryColorClass?: string;
};


const TopicItem = ({ topic, categoryColorClass }: Props) => {
  const {
    categories,
    categoryColors,
    isHotTopic,
    formatDate
  } = useForumContext();
  const [isLiked, setIsLiked] = useState(false);
  const [localLikeCount, setLocalLikeCount] = useState(topic.like_count || 0);

  // Получаем данные авторизации и функции для работы с пользователями
  const auth = useContext(AuthContext);

  // Запрашиваем данные об авторе, если нужно
  useEffect(() => {
    if (topic.user_id && auth?.fetchUsersByIds) {
      auth.fetchUsersByIds([topic.user_id]);
    }
  }, [topic.user_id, auth]);

  const checkIfLiked = async () => {
    try {
      if (!auth?.userData?.id) return;

      const result = await TopicApiService.checkTopicLike(topic.id, auth.userData.id);
      setIsLiked(result.isLiked);
    } catch (error) {
      console.error('Ошибка при проверке лайка:', error);
    }
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault(); // Предотвращаем переход по ссылке
    e.stopPropagation(); // Останавливаем всплытие события

    if (!auth?.userData?.id) {
      toast.error('Пожалуйста, войдите в систему, чтобы поставить лайк');
      return;
    }

    try {
      if (isLiked) {
        await TopicApiService.unlikeTopic(topic.id);
        setLocalLikeCount(prev => Math.max(prev - 1, 0));
      } else {
        await TopicApiService.likeTopic(topic.id);
        setLocalLikeCount(prev => prev + 1);
      }

      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Ошибка при обработке лайка:', error);
    }
  };

  // Получаем автора из кэша
  const author = auth?.getUserById?.(topic.user_id);
  // const author = auth?.getUserById?.(topic.user_id) || auth?.userData;

  // Имя автора и аватарка с запасными вариантами
  const authorName = author?.name || 'Неизвестный автор';
  const authorAvatar = getMediaUrl(author?.avatar_url || undefined);

  // Категория
  const category = topic.category;
  const categoryName = category ? category.name : 'Без категории';
  // const categoryColorClass = categoryColors?.[categoryName] || categoryColors?.default || 'border-gray-300 text-gray-700';

  // Определяем, является ли топик "горячим"
  const hot = isHotTopic?.(topic) || false;

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-start space-x-4">
        {/* Аватар пользователя */}
        <div className="flex-shrink-0">
          <img
            src={authorAvatar}
            alt={authorName}
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
          />
        </div>

        {/* Контент */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <Link href={`/forum/topic/${topic.id}`} className="group">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors line-clamp-2">
                {topic.title}
                {hot && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Горячая
                  </span>
                )}
              </h3>
            </Link>

            {/* Счетчики для десктопа */}
            <div className="hidden md:flex space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <MessageSquare size={16} className="mr-1" />
                <span>{topic.reply_count || 0}</span>
              </div>
              <div className="flex items-center">
                <Eye size={16} className="mr-1" />
                <span>{topic.view_count || 0}</span>
              </div>
              <div className="flex items-center">
                <Heart
                  size={16}
                  className={`mr-1 cursor-pointer ${isLiked ? 'fill-red-600 text-red-600' : ''}`}
                  onClick={handleLike}
                />
                <span>{localLikeCount}</span>
              </div>
            </div>
          </div>

          {/* Мета-информация */}
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
            <span className="font-medium">{authorName}</span>
            <span>•</span>
            <span>{formatDate?.(topic.created_at) || topic.created_at}</span>
            {category && (
              <>
                <span>•</span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryColorClass}`}
                >
                  {categoryName}
                </span>
              </>
            )}
          </div>

          {/* Превью контента */}
          {topic.content && (
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {typeof topic.content === 'string'
                ? `${topic.content.substring(0, 150)}...`
                : 'Нет содержимого'}
            </p>
          )}

          {/* Счетчики для мобильных */}
          <div className="mt-3 flex md:hidden items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <MessageSquare size={14} className="mr-1" />
              <span>{topic.reply_count || 0}</span>
            </div>
            <div className="flex items-center">
              <Eye size={14} className="mr-1" />
              <span>{topic.view_count || 0}</span>
            </div>
            <div className="flex items-center">
              <Heart
                size={14}
                className={`mr-1 cursor-pointer ${isLiked ? 'fill-red-600 text-red-600' : ''}`}
                onClick={handleLike}
              />
              <span>{localLikeCount}</span>
            </div>
          </div>
        </div>

        {/* Ссылка "Читать" (видна на больших экранах) */}
        <div className="hidden sm:block">
          <Link
            href={`/forum/topic/${topic.id}`}
            className="inline-flex items-center text-purple-600 hover:text-purple-800"
          >
            <span className="mr-1">Читать</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopicItem;