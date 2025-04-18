import { Topic } from "@/app/interface/topic";

// 3. TopicHeader.tsx
type TopicHeaderProps = {
    topic: Topic;
    hot: boolean;
    authorName: string;
    authorAvatar: string;
    formatDate: (date: string | Date) => string;
    category: any;
    categoryName: string;
    categoryColorClass: string;
};

export default function TopicHeader({
    topic,
    hot,
    authorName,
    authorAvatar,
    formatDate,
    category,
    categoryName,
    categoryColorClass
}: TopicHeaderProps) {
    return (
        <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {topic.title}
                {hot && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Горячая
                    </span>
                )}
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
                <div className="flex items-center">
                    <img
                        src={authorAvatar}
                        alt={authorName}
                        className="w-6 h-6 rounded-full object-cover mr-2"
                    />
                    <span className="font-medium">{authorName}</span>
                </div>
                <span>•</span>
                <span>{formatDate(topic.created_at)}</span>
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
        </div>
    );
}