// components/Topic/TopicActions.tsx
import { useState, useContext, useEffect } from 'react';
import { MessageSquare, Eye, ThumbsUp, Share2, Heart } from 'lucide-react';
import { AuthContext } from '@/app/providers/AuthProvider';
import { TopicApiService } from '@/services/topicApiService';
import { Topic, Reply } from '@/app/interface/topic';
import { toast } from 'sonner';

type TopicActionsProps = {
    topic: Topic;
    replies: Reply[];
};

const TopicActions = ({ topic, replies }: TopicActionsProps) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(topic.like_count || 0);
    const auth = useContext(AuthContext);

    // Проверяем, лайкнул ли текущий пользователь этот топик
    useEffect(() => {
        if (auth?.userData?.id) {
            checkIfLiked();
        }
    }, [topic.id, auth?.userData?.id]);

    const checkIfLiked = async () => {
        try {
            if (!auth?.userData?.id) return;

            const result = await TopicApiService.checkTopicLike(topic.id, auth.userData.id);
            setIsLiked(result.isLiked);
        } catch (error) {
            console.error('Ошибка при проверке лайка:', error);
        }
    };

    const handleLike = async () => {
        if (!auth?.userData?.id) {
            toast.error('Пожалуйста, войдите в систему, чтобы поставить лайк');
            return;
        }

        try {
            if (isLiked) {
                await TopicApiService.unlikeTopic(topic.id);
                setLikeCount(prev => Math.max(prev - 1, 0));
            } else {
                await TopicApiService.likeTopic(topic.id);
                setLikeCount(prev => prev + 1);
            }

            setIsLiked(!isLiked);
        } catch (error) {
            console.error('Ошибка при обработке лайка:', error);
        }
    };

    const handleShare = () => {
        // Копируем URL в буфер обмена
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                toast.success('Ссылка скопирована в буфер обмена');
            })
            .catch(err => {
                console.error('Не удалось скопировать ссылку:', err);
            });
    };

    return (
        <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center">
                    <MessageSquare size={20} className="mr-2" />
                    <span>{replies.length}</span>
                </div>

                <div className="flex items-center">
                    <Eye size={20} className="mr-2" />
                    <span>{topic.view_count || 0}</span>
                </div>

                <div className="flex items-center">
                    <Heart
                        size={20}
                        className={`mr-2 cursor-pointer transition-colors ${isLiked ? 'fill-red-600 text-red-600' : 'hover:text-red-600'}`}
                        onClick={handleLike}
                    />
                    <span>{likeCount}</span>
                </div>

                <div className="flex items-center cursor-pointer" onClick={handleShare}>
                    <Share2 size={20} className="mr-2" />
                    <span>Поделиться</span>
                </div>
            </div>
        </div>
    );
};

export default TopicActions;