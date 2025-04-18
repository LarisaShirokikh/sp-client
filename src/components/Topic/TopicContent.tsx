import { FileText, File, FileImage, FileVideo, Download } from 'lucide-react';
import { Topic, Media } from '@/app/interface/topic';
import { getMediaUrl } from '@/lib/utils';
import { useState } from 'react';

type TopicContentProps = {
    topic: Topic;
    mediaFiles: Media[];
};

export default function TopicContent({ topic, mediaFiles }: TopicContentProps) {
    console.log("mediaFiles:", mediaFiles);

    // Форматирование контента (если это строка HTML)
    const renderContent = (content: string | null | undefined) => {
        if (!content) return null;

        const hasHTMLTags = /<\/?[a-z][\s\S]*>/i.test(content);

        if (hasHTMLTags) {
            return <div dangerouslySetInnerHTML={{ __html: content }} />;
        }

        return content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-1 last:mb-0">{paragraph}</p>
        ));
    };

    // Определяем тип файла на основе file_type или расширения
    const getFileType = (media: Media): string => {
        // Используем file_type если оно есть
        if (media.file_type) {
            return media.file_type;
        }

        // Иначе определяем по расширению файла
        const extension = media.file_path?.split('.').pop()?.toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension || '')) {
            return 'image';
        }
        if (['mp4', 'webm', 'ogg', 'mov'].includes(extension || '')) {
            return 'video';
        }
        return 'document';
    };

    // Получаем иконку для типа файла
    const getFileIcon = (fileType: string) => {
        switch (fileType) {
            case 'image': return <FileImage size={20} />;
            case 'video': return <FileVideo size={20} />;
            case 'document':
            default: return <File size={20} />;
        }
    };

    return (
        <div className="prose max-w-none mb-6">
            {renderContent(topic.content)}

            {/* Отображение медиа-файлов, если они есть */}
            {mediaFiles && mediaFiles.length > 0 && (
                <div className="mt-6">
                    <div className="space-y-4">
                        {mediaFiles.map((media, index) => {
                            // Используем file_path вместо url
                            const mediaUrl = getMediaUrl(media.file_path || '');
                            const fileName = media.file_name || `Файл ${index + 1}`;
                            const fileType = getFileType(media);

                            // Для изображений
                            if (fileType === 'image') {
                                return (
                                    <ImageWithFallback
                                        key={index}
                                        src={mediaUrl} fileName={''} />
                                );
                            }
                            // Для видео
                            else if (fileType === 'video') {
                                return (
                                    <div key={index} className="rounded-lg overflow-hidden border border-gray-200">
                                        <video
                                            controls
                                            className="w-full h-auto"
                                            onError={() => {
                                                console.error("Ошибка загрузки видео:", mediaUrl);
                                            }}
                                        >
                                            <source src={mediaUrl} type="video/mp4" />
                                            Ваш браузер не поддерживает видео.
                                        </video>
                                        <div className="p-2 bg-gray-50 border-t border-gray-200">
                                            <p className="text-gray-700 text-sm">{fileName}</p>
                                        </div>
                                    </div>
                                );
                            }
                            // Для документов и других типов файлов
                            else {
                                return (
                                    <div key={index} className="p-3 border rounded-lg bg-gray-50 flex items-center">
                                        <div className="text-gray-500 mr-3">
                                            {getFileIcon(fileType)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900">{fileName}</div>
                                        </div>
                                        <a
                                            href={mediaUrl}
                                            download={fileName}
                                            className="ml-2 p-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-full transition-colors"
                                            title="Скачать файл"
                                            aria-label="Скачать файл"
                                        >
                                            <Download size={20} />
                                        </a>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

// Вспомогательный компонент для изображений с заглушкой
function ImageWithFallback({ src }: { src: string, fileName: string, description?: string }) {
    const [error, setError] = useState(false);

    return (
        <div className="rounded-lg overflow-hidden border border-gray-200">
            {!error ? (
                <img
                    src={src}
                    className="max-w-full h-auto"
                    onError={() => {
                        console.error("Ошибка загрузки изображения:", src);
                        setError(true);
                    }}
                />
            ) : (
                <div className="bg-gray-100 p-6 text-center">
                    <FileImage size={48} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600">Не удалось загрузить изображение</p>
                </div>
            )}

        </div>
    );
}