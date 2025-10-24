import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/UI/avatar';
import { Reply, Media } from '@/app/interface/topic';
import { getMediaUrl } from '@/lib/utils';
import { UserData } from '@/app/interface/auth';
import ReplyMedia from './ReplyMedia';

type TopicRepliesProps = {
    replies: Reply[];
    formatDate: (date: string | Date) => string;
    getUserById?: (id: number) => UserData | null;
    replyMediaMap?: Record<number, Media[]>;
    currentUserId?: number | null; // ID текущего пользователя
};

export default function TopicReplies({
    replies,
    formatDate,
    getUserById,
    replyMediaMap = {},
    currentUserId = null
}: TopicRepliesProps) {
    if (!replies || replies.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <p className="text-center text-gray-500">Пока нет ответов на эту тему. Будьте первым!</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold mb-4">Ответы ({replies.length})</h3>
            <div className="space-y-6">
                {replies.map((reply) => {
                    const isAuthor = currentUserId === reply.author_id;
                    const author = reply.author_id ? getUserById?.(reply.author_id) : null;
                    const authorName = author?.name || 'Неизвестный автор';
                    const authorAvatar = getMediaUrl(author?.avatar_url ?? undefined);
                    const replyMedia = reply.id ? replyMediaMap[reply.id] || [] : [];

                    return (
                        <div key={reply.id} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                            <div className="flex gap-4">
                                <Avatar>
                                    <AvatarImage src={authorAvatar} alt={authorName} />
                                    <AvatarFallback>{authorName[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-semibold">{authorName}</h4>
                                            <p className="text-sm text-gray-500">
                                                {formatDate(reply.created_at || new Date())}
                                            </p>
                                        </div>
                                        {isAuthor && (
                                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                                Вы
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-2 text-gray-700 whitespace-pre-wrap">{reply.content}</div>

                                    {/* Display reply media files */}
                                    {replyMedia.length > 0 && (
                                        <ReplyMedia media={replyMedia} />
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}