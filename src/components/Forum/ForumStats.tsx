"use client"

import { useForumContext } from "@/app/providers/ForumProvider";


const ForumStats = () => {
  const { topics, formatDate } = useForumContext();

  return (
    <div className="mt-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white p-6 shadow-md">
      <h2 className="text-xl font-bold mb-4">Статистика сообщества</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold">{topics.length}</div>
          <div className="text-purple-200">Тем</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">{topics.reduce((sum, topic) => sum + (topic.reply_count || 0), 0)}</div>
          <div className="text-purple-200">Сообщений</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">{
            [...new Set(topics.map(topic => topic.author?.id))].filter(Boolean).length
          }</div>
          <div className="text-purple-200">Участников</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">{
            topics.length > 0 
              ? formatDate(topics.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0].created_at)
              : 'Н/Д'
          }</div>
          <div className="text-purple-200">Последняя активность</div>
        </div>
      </div>
    </div>
  );
};

export default ForumStats;