// src/app/forum/topic/[id]/page.tsx
"use client"
import { useState, useEffect, useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForumContext } from '../../../providers/ForumProvider';
import { TopicApiService } from '../../../../services/topicApiService';
import { AuthContext } from '@/app/providers/AuthProvider';
import { Media, Reply, Topic } from '@/app/interface/topic';
import LoadingSkeleton from '@/components/Topic/LoadingSkeleton';
import ErrorMessage from '@/components/Topic/ErrorMessage';
import BackNavigation from '@/components/Topic/BackNavigation';
import TopicHeader from '@/components/Topic/TopicHeader';
import TopicContent from '@/components/Topic/TopicContent';
import TopicActions from '@/components/Topic/TopicActions';
import TopicReplies from '@/components/Topic/TopicReplies';
import ReplyForm from '@/components/Topic/ReplyForm';
import { getMediaUrl } from '@/lib/utils';
import { toast } from 'sonner';

export default function TopicPage() {
  const params = useParams();
  const router = useRouter();
  const {
    categories,
    categoryColors,
    isHotTopic,
    formatDate
  } = useForumContext();

  const [topic, setTopic] = useState<Topic | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<Media[]>([]);
  const [replyMediaMap, setReplyMediaMap] = useState<Record<number, Media[]>>({});

  // Получаем данные авторизации и функции для работы с пользователями
  const auth = useContext(AuthContext);

  // Запрашиваем данные об авторе, если нужно
  useEffect(() => {
    if (topic?.user_id && auth?.fetchUsersByIds) {
      auth.fetchUsersByIds([topic.user_id]);
    }
  }, [topic?.user_id, auth]);

  // Получаем автора из кэша
  const author = (topic?.user_id != null) ? auth?.getUserById?.(topic.user_id) : null;


  // Имя автора и аватарка с запасными вариантами
  const authorName = author?.name || 'Неизвестный автор';
  const authorAvatar = getMediaUrl(author?.avatar_url ?? undefined);

  useEffect(() => {
    const fetchTopicData = async () => {
      const topicId = Number(params.id);
      if (isNaN(topicId)) {
        setError("Неверный идентификатор темы");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Увеличиваем счетчик просмотров при загрузке страницы
        try {
          await TopicApiService.incrementViewCount(topicId);
        } catch (viewError) {
          console.warn("Не удалось увеличить счетчик просмотров:", viewError);

        }

        const topicData = await TopicApiService.getTopicById(topicId);
        const repliesData = await TopicApiService.getTopicReplies(topicId);

        // Если у API есть метод получения медиа-файлов, используем его
        let mediaData: Media[] = [];
        try {
          mediaData = await TopicApiService.getTopicMedia(topicId);
        } catch (mediaErr) {
          console.warn("Не удалось загрузить медиа:", mediaErr);
          toast.error("Не удалось загрузить медиа")
        }

        setTopic(topicData);
        setReplies(repliesData);
        setMediaFiles(mediaData);

        // Загружаем медиа-файлы для каждого ответа
        const replyMediaData: Record<number, Media[]> = {};

        // Последовательно загружаем медиа для каждого ответа
        for (const reply of repliesData) {
          if (reply.id) {
            try {
              const replyMedia = await TopicApiService.getReplyMedia(reply.id);
              if (replyMedia.length > 0) {
                replyMediaData[reply.id] = replyMedia;
              }
            } catch (err) {
              console.warn(`Не удалось загрузить медиа для ответа #${reply.id}:`, err);
            }
          }
        }

        setReplyMediaMap(replyMediaData);

        // Загрузим данные авторов для всех ответов
        if (auth?.fetchUsersByIds) {
          const userIds = repliesData
            .map(reply => reply.author_id)
            .filter((id): id is number => id != null);

          if (userIds.length > 0) {
            auth.fetchUsersByIds(userIds);
          }
        }
      } catch (err) {
        console.error("Error fetching topic:", err);
        setError('Не удалось загрузить тему');
      } finally {
        setLoading(false);
      }
    };

    fetchTopicData();
  }, [params.id, auth]);


  const handleSubmitReply = async (e: React.FormEvent, mediaFiles?: File[]) => {
    e.preventDefault();

    // Проверка наличия контента (текста)
    if (!replyContent.trim() && (!mediaFiles || mediaFiles.length === 0)) {
      toast.error('Добавьте текст или прикрепите файлы для ответа');
      return;
    }

    setSubmittingReply(true);

    try {
      // Получаем ID темы
      const topicId = Number(params.id);
      const newReply = await TopicApiService.createReply(
        topicId,             // ID темы
        replyContent.trim(), // Содержимое ответа
        mediaFiles           // Медиа-файлы (могут быть undefined)
      );

      console.log("Ответ успешно создан:", newReply);
      // Обновляем состояние ответов
      setReplies(prev => [...prev, newReply]);
      setReplyContent('');

      // Если ответ содержит медиа и у него есть ID
      if (newReply.id && newReply.media && newReply.media.length > 0) {
        // Создаем новый объект, чтобы не нарушать типизацию
        const updatedMediaMap = { ...replyMediaMap };
        updatedMediaMap[newReply.id] = newReply.media;
        setReplyMediaMap(updatedMediaMap);
      }

      toast.success('Ответ успешно отправлен');
    } catch (err) {
      console.error("Ошибка при отправке ответа:", err);
      toast.error('Не удалось отправить ответ: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setSubmittingReply(false);
    }
  };

  // Определяем, является ли топик "горячим"
  const hot = isHotTopic?.(topic) || false;

  // Получение категории
  const category = categories?.find(cat => cat.id === topic?.category?.id) || topic?.category;
  const categoryName = category ? category.name : 'Без категории';
  const categoryColorClass = categoryColors?.[categoryName] || categoryColors?.default || 'border-gray-300 text-gray-700';

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error || !topic) {
    return <ErrorMessage error={error} onBack={() => router.back()} />;
  }

  return (
    <div className="space-y-6">
      {/* Навигация */}
      <BackNavigation />

      {/* Информация о теме */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <TopicHeader
          topic={topic}
          hot={hot}
          authorName={authorName}
          authorAvatar={authorAvatar}
          formatDate={formatDate as (date: string | Date) => string}
          category={category}
          categoryName={categoryName}
          categoryColorClass={categoryColorClass}
        />

        <TopicContent topic={topic} mediaFiles={mediaFiles} />

        <TopicActions topic={topic} replies={replies} />
      </div>

      {/* Ответы на тему */}
      <TopicReplies
        replies={replies}
        formatDate={formatDate as (date: string | Date) => string}
        getUserById={auth?.getUserById}
        replyMediaMap={replyMediaMap}
        currentUserId={auth?.userData?.id}
      />

      {/* Форма отправки ответа */}
      <ReplyForm
        replyContent={replyContent}
        setReplyContent={setReplyContent}
        submittingReply={submittingReply}
        onSubmit={handleSubmitReply}
      />
    </div>
  );
}