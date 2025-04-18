import { useState } from 'react';
import Image from 'next/image';
import { Media } from '@/app/interface/topic';
import { getMediaUrl } from '@/lib/utils';

type ReplyMediaProps = {
    media: Media[];
};

export default function ReplyMedia({ media }: ReplyMediaProps) {
    const [activeMedia, setActiveMedia] = useState<Media | null>(null);

    // Сортируем медиа по типам
    const images = media.filter(m =>
        m.mime_type?.startsWith('image/') ||
        m.file_type === 'image'
    );

    const videos = media.filter(m =>
        m.mime_type?.startsWith('video/') ||
        m.file_type === 'video'
    );

    const pdfs = media.filter(m =>
        m.mime_type === 'application/pdf' ||
        m.file_type === 'pdf'
    );

    // Открыть модальное окно с медиа-файлом
    const openModal = (item: Media) => {
        setActiveMedia(item);
        document.body.style.overflow = 'hidden';
    };

    // Закрыть модальное окно
    const closeModal = () => {
        setActiveMedia(null);
        document.body.style.overflow = '';
    };

    // Функция для определения размера сетки на основе количества изображений
    const getGridClass = (count: number) => {
        if (count === 1) return 'grid-cols-1';
        if (count === 2) return 'grid-cols-2';
        if (count === 3) return 'grid-cols-3';
        if (count >= 4) return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
        return 'grid-cols-2 md:grid-cols-3';
    };

    if (media.length === 0) return null;

    return (
        <div className="mt-4 space-y-6">
            {/* Изображения */}
            {images.length > 0 && (
                <div className={`grid ${getGridClass(images.length)} gap-3`}>
                    {images.map((image, index) => (
                        <div
                            key={`img-${image.id || index}`}
                            className="relative aspect-square rounded-lg overflow-hidden shadow-sm group cursor-pointer"
                            onClick={() => openModal(image)}
                        >
                            <Image
                                src={getMediaUrl(image.url)}
                                alt={image.filename || `Изображение ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                        </div>
                    ))}
                </div>
            )}

            {/* Видео */}
            {videos.length > 0 && (
                <div className={`grid ${videos.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-3`}>
                    {videos.map((video, index) => (
                        <div
                            key={`video-${video.id || index}`}
                            className="aspect-video rounded-lg overflow-hidden shadow-md"
                        >
                            <video
                                src={getMediaUrl(video.url)}
                                className="w-full h-full object-cover"
                                controls
                                preload="metadata"
                                poster={video.thumbnail_url ? getMediaUrl(video.thumbnail_url) : undefined}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* PDF документы */}
            {pdfs.length > 0 && (
                <div className="flex flex-wrap gap-3">
                    {pdfs.map((pdf, index) => (
                        <a
                            key={`pdf-${pdf.id || index}`}
                            href={getMediaUrl(pdf.url)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:shadow-md transition-all duration-200"
                        >
                            <div className="w-10 h-10 flex-shrink-0 text-red-600 mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23 22h-22v-20h22v20zm-1-19h-20v18h20v-18zm-12.989 2.724l-1.242.256v1.498c0 .099-.065.17-.17.17-.3.018-.1.018-.19.018h-2.944l2.083.944-2.083 3.208v.847l5.93-2.34.34.106v-2.842l-1.925-.867zm-.722 1.064l3.243 1.382v1.151l-3.243-1.042v-1.491zm3.243 2.715l-3.243 1.31v-1.558l3.243-.94v1.188zm1.606 6.685h-2.271c-.101 0-.183.082-.183.183 0 .1.082.183.183.183h2.271c.101 0 .183-.083.183-.183s-.082-.183-.183-.183zm0 .915h-2.271c-.101 0-.183.082-.183.183 0 .1.082.183.183.183h2.271c.101 0 .183-.083.183-.183s-.082-.183-.183-.183zm0 .915h-2.271c-.101 0-.183.082-.183.183 0 .1.082.183.183.183h2.271c.101 0 .183-.083.183-.183s-.082-.183-.183-.183zm-4.724-9.601h-3.608v7.532h3.608v-7.532zm-.732.732v6.067h-2.143v-6.067h2.143zm-1.8-5.785l1.8.813v1.022l-1.8-.579v-1.256zm-1.989 4.321h3.789v7.992h-3.789v-7.992zm.732.732v6.527h2.324v-6.527h-2.324zm2.054 5.052c.001-.5.042-.91.092-.091.05 0 .091.041.092.091-.001.05-.042.091-.092.091-.05 0-.091-.041-.092-.091zm.183 0c.001-.05.042-.091.091-.091.051 0 .091.041.091.091 0 .05-.04.091-.091.091-.049 0-.09-.041-.091-.091zm.183 0c0-.05.04-.091.091-.091.05 0 .09.041.091.091-.001.05-.041.091-.091.091-.051 0-.091-.041-.091-.091zm-2.216-1.525c.262.115.543.176.829.176.286 0 .566-.061.829-.176v-2.701h-1.658v2.701zm.322-.294c.166.060.342.092.52.094.178-.002.354-.034.522-.096v-2.101h-1.042v2.103zm-4.6-1.33l.445.959.45-.959.451.959.444-.959.451.959.445-.959.451.959.444-.959.451.959.445-.959v1.037h-3.789v-1.037l.445.959zm0 1.403h3.789v.732h-3.789v-.732zm0 1.098h3.789v.732h-3.789v-.732z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-medium truncate">
                                    {pdf.filename || `Документ ${index + 1}.pdf`}
                                </div>
                                {pdf.file_size && (
                                    <div className="text-xs text-gray-500 mt-1">
                                        {(Number(pdf.file_size) / (1024 * 1024)).toFixed(1)} MB
                                    </div>
                                )}
                            </div>
                        </a>
                    ))}
                </div>
            )}

            {/* Модальное окно для просмотра изображений */}
            {activeMedia && activeMedia.mime_type?.startsWith('image/') && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    onClick={closeModal}
                >
                    <div className="relative max-w-5xl max-h-screen p-4">
                        <button
                            className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 rounded-full p-2 z-10 transition-colors"
                            onClick={closeModal}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="relative" onClick={(e) => e.stopPropagation()}>
                            <Image
                                src={getMediaUrl(activeMedia.url)}
                                alt={activeMedia.filename || 'Изображение'}
                                width={1200}
                                height={800}
                                className="object-contain max-h-screen rounded-lg"
                            />
                            {activeMedia.filename && (
                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm text-white p-3 text-center rounded-b-lg">
                                    {activeMedia.filename}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}