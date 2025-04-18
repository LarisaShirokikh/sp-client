// components/Topic/ReplyForm.tsx
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { toast } from 'sonner';

// Определяем допустимые типы файлов
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];
const ALLOWED_PDF_TYPES = ['application/pdf'];
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 20MB максимальный размер файла
const MAX_FILES = 5; // Максимальное количество файлов

// Тип для превью медиа-файлов
type MediaPreview = {
    id: string;
    file: File;
    type: 'image' | 'video' | 'pdf';
    previewUrl: string;
    name: string;
    size: number;
};

type ReplyFormProps = {
    replyContent: string;
    setReplyContent: (content: string) => void;
    submittingReply: boolean;
    onSubmit: (e: React.FormEvent, mediaFiles?: File[]) => void;
};

export default function ReplyForm({
    replyContent,
    setReplyContent,
    submittingReply,
    onSubmit
}: ReplyFormProps) {
    const [mediaFiles, setMediaFiles] = useState<MediaPreview[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Обработка выбора файлов
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        // Проверяем, не превышен ли лимит файлов
        if (mediaFiles.length + files.length > MAX_FILES) {
            toast.error(`Максимум ${MAX_FILES} файлов можно прикрепить к ответу`);
            return;
        }

        // Обрабатываем каждый файл
        Array.from(files).forEach(file => {
            // Проверяем размер файла
            if (file.size > MAX_FILE_SIZE) {
                toast.error(`Файл "${file.name}" слишком большой (макс. 20МБ)`);
                return;
            }

            // Определяем тип файла
            let fileType: 'image' | 'video' | 'pdf' | null = null;

            if (ALLOWED_IMAGE_TYPES.includes(file.type)) {
                fileType = 'image';
            } else if (ALLOWED_VIDEO_TYPES.includes(file.type)) {
                fileType = 'video';
            } else if (ALLOWED_PDF_TYPES.includes(file.type)) {
                fileType = 'pdf';
            } else {
                toast.error(`Неподдерживаемый тип файла: ${file.type}`);
                return;
            }

            // Создаем превью файла
            const fileId = `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            const previewUrl = URL.createObjectURL(file);

            // Добавляем файл в список
            setMediaFiles(prev => [...prev, {
                id: fileId,
                file,
                type: fileType,
                previewUrl,
                name: file.name,
                size: file.size
            }]);
        });

        // Сбрасываем input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Удаление файла из списка
    const removeMediaFile = (id: string) => {
        setMediaFiles(prev => {
            const fileToRemove = prev.find(f => f.id === id);
            if (fileToRemove) {
                URL.revokeObjectURL(fileToRemove.previewUrl); // Освобождаем ресурсы
            }
            return prev.filter(f => f.id !== id);
        });
    };

    // Форматирование размера файла
    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    // Обработка отправки формы
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Проверка наличия контента или файлов
        if (!replyContent.trim() && mediaFiles.length === 0) {
            toast.error('Добавьте текст или прикрепите файлы для ответа');
            return;
        }

        // Получаем список файлов для отправки
        const files = mediaFiles.map(media => media.file);

        // Вызываем функцию отправки
        onSubmit(e, files);

        // Очищаем список файлов после отправки
        mediaFiles.forEach(media => URL.revokeObjectURL(media.previewUrl));
        setMediaFiles([]);
    };

    return (
        <form className="bg-white rounded-xl shadow-sm border border-gray-100 p-6" onSubmit={handleSubmit}>
            <h3 className="text-lg text-gray-700 font-semibold mb-4">Ответить на тему</h3>

            <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Введите ваш ответ..."
                className="resize-y min-h-32 mb-4"
            />

            {/* Превью загруженных файлов */}
            {mediaFiles.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                    {mediaFiles.map((media) => (
                        <div key={media.id} className="relative border rounded-md overflow-hidden">
                            <div className="aspect-square relative">
                                {media.type === 'image' && (
                                    <div className="w-full h-full relative">
                                        <Image
                                            src={media.previewUrl}
                                            alt={media.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                {media.type === 'video' && (
                                    <video
                                        src={media.previewUrl}
                                        className="w-full h-full object-cover"
                                        controls
                                    />
                                )}

                                {media.type === 'pdf' && (
                                    <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-xs mt-2 text-center truncate px-2 w-full">
                                            {media.name}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="p-2 text-xs truncate">
                                <div className="font-medium truncate">{media.name}</div>
                                <div className="text-gray-500">{formatFileSize(media.size)}</div>
                            </div>

                            <button
                                type="button"
                                onClick={() => removeMediaFile(media.id)}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                aria-label="Удалить файл"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                    {/* Кнопка для загрузки файлов */}
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={mediaFiles.length >= MAX_FILES}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Прикрепить файлы
                    </Button>

                    {/* Скрытый input для выбора файлов */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        multiple
                        accept={[...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES, ...ALLOWED_PDF_TYPES].join(',')}
                        className="hidden"
                    />
                </div>

                <Button
                    type="submit"
                    disabled={submittingReply || (!replyContent.trim() && mediaFiles.length === 0)}
                >
                    {submittingReply ? 'Отправка...' : 'Отправить ответ'}
                </Button>
            </div>

            {/* Информация о лимитах */}
            <p className="text-xs text-gray-500 mt-3">
                Допустимые форматы: изображения (JPEG, PNG, GIF, WebP), видео (MP4, WebM, OGG), документы (PDF).
                Максимальный размер файла: 100МБ. Не более {MAX_FILES} файлов на один ответ.
            </p>
        </form>
    );
}