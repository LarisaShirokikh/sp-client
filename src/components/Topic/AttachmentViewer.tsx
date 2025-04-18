// components/AttachmentViewer.tsx
"use client"

import { useState } from 'react';
import { getMediaUrl } from '@/lib/utils';
import { FileText, Image, Film, Download } from 'lucide-react';

interface AttachmentViewerProps {
    url: string;
    fileName?: string;
    mimeType?: string;
}

const AttachmentViewer = ({ url, fileName, mimeType }: AttachmentViewerProps) => {
    const [error, setError] = useState(false);
    const fullUrl = getMediaUrl(url);

    // Определяем тип файла по расширению или MIME-типу
    const getFileType = () => {
        if (mimeType) {
            if (mimeType.startsWith('image/')) return 'image';
            if (mimeType.startsWith('video/')) return 'video';
            return 'file';
        }

        const extension = url.split('.').pop()?.toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension || '')) return 'image';
        if (['mp4', 'webm', 'ogg', 'mov'].includes(extension || '')) return 'video';
        return 'file';
    };

    const fileType = getFileType();
    const displayName = fileName || url.split('/').pop() || 'Файл';

    // Обработчик для скачивания файла
    const handleDownload = () => {
        const a = document.createElement('a');
        a.href = fullUrl;
        a.download = displayName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    // Рендер для изображений
    if (fileType === 'image' && !error) {
        return (
            <div className="my-4">
                <img
                    src={fullUrl}
                    alt={displayName}
                    className="max-w-full rounded-lg shadow-md"
                    onError={() => setError(true)}
                />
                <div className="mt-2 text-sm text-gray-500 flex items-center">
                    <Image size={16} className="mr-1" />
                    {displayName}
                    <button
                        onClick={handleDownload}
                        className="ml-2 text-purple-600 hover:text-purple-800"
                        aria-label="Скачать файл"
                    >
                        <Download size={16} />
                    </button>
                </div>
            </div>
        );
    }

    // Рендер для видео
    if (fileType === 'video' && !error) {
        return (
            <div className="my-4">
                <video
                    src={fullUrl}
                    controls
                    className="max-w-full rounded-lg shadow-md"
                    onError={() => setError(true)}
                />
                <div className="mt-2 text-sm text-gray-500 flex items-center">
                    <Film size={16} className="mr-1" />
                    {displayName}
                    <button
                        onClick={handleDownload}
                        className="ml-2 text-purple-600 hover:text-purple-800"
                        aria-label="Скачать файл"
                    >
                        <Download size={16} />
                    </button>
                </div>
            </div>
        );
    }

    // Рендер для других файлов или при ошибке
    return (
        <div className="my-4 p-3 border border-gray-200 rounded-lg bg-gray-50 flex items-center">
            <FileText size={24} className="text-gray-400 mr-2" />
            <div className="flex-1 truncate">{displayName}</div>
            <button
                onClick={handleDownload}
                className="ml-2 text-purple-600 hover:text-purple-800 p-1"
                aria-label="Скачать файл"
            >
                <Download size={20} />
            </button>
        </div>
    );
};

export default AttachmentViewer;