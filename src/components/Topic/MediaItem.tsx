// 10. MediaItem.tsx (опционально - можно отделить отображение медиа в отдельный компонент)
import { ArrowUpRight } from 'lucide-react';
import { Media } from '@/app/interface/topic';

type MediaItemProps = {
    media: Media;
    index: number;
};

export default function MediaItem({ media, index }: MediaItemProps) {
    if (media.type?.startsWith('image/') || media.url?.match(/\.(jpeg|jpg|png|gif|webp)$/i)) {
        return (
            <div className="relative rounded-lg overflow-hidden">
                <img
                    src={media.url}
                    alt={media.description || `Изображение ${index + 1}`}
                    className="w-full h-auto object-cover"
                />
                {media.description && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                        <p className="text-white text-sm">{media.description}</p>
                    </div>
                )}
            </div>
        );
    } else if (media.type?.startsWith('video/') || media.url?.match(/\.(mp4|webm|ogg)$/i)) {
        return (
            <div className="relative rounded-lg overflow-hidden">
                <video
                    controls
                    className="w-full h-auto"
                >
                    <source src={media.url} type={media.type || 'video/mp4'} />
                    Ваш браузер не поддерживает видео.
                </video>
                {media.description && (
                    <div className="mt-1">
                        <p className="text-gray-700 text-sm">{media.description}</p>
                    </div>
                )}
            </div>
        );
    } else {
        return (
            <div className="p-4 border rounded-lg">
                <a
                    href={media.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-purple-600 hover:text-purple-800"
                >
                    <span className="mr-1">{media.name || `Файл ${index + 1}`}</span>
                    <ArrowUpRight size={16} />
                </a>
                {media.description && (
                    <p className="text-gray-700 text-sm mt-1">{media.description}</p>
                )}
            </div>
        );
    }
}