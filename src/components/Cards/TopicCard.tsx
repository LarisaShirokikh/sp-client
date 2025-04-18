// src/components/Cards/TopicCard.tsx
interface Topic {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    commentCount: number;
    isPopular: boolean;
  }
  
  interface TopicCardProps {
    topic: Topic;
  }
  
  const TopicCard = ({ topic }: TopicCardProps) => {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col">
        <img src={topic.imageUrl} alt={topic.title} className="w-full h-48 object-cover" />
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex items-center mb-2">
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Форум</span>
            {topic.isPopular && (
              <span className="ml-2 text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">Популярное</span>
            )}
          </div>
          <h3 className="font-semibold text-lg mb-2">{topic.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{topic.description}</p>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {topic.commentCount} комментариев
            </span>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              Обсудить
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default TopicCard;