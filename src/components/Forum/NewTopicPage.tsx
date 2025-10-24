"use client"
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForumContext } from '@/app/providers/ForumProvider';
import { Input } from '../UI/input';
import { Label } from '../UI/label';
import { Button } from '../UI/button';

export default function NewTopicPage() {
    const router = useRouter();
    const { categories, createTopic } = useForumContext();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryId, setCategoryId] = useState<number | ''>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // State for media files
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<{
        file: File;
        preview: string;
        type: 'image' | 'video' | 'document';
    }[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        const newFiles = Array.from(e.target.files);
        setFiles(prev => [...prev, ...newFiles]);

        // Create previews for the files
        const newPreviews = newFiles.map(file => {
            const fileType = file.type.split('/')[0];

            // Determine file type category
            let type: 'image' | 'video' | 'document' = 'document';
            if (fileType === 'image') type = 'image';
            else if (fileType === 'video') type = 'video';

            // Create object URL for preview
            const preview = URL.createObjectURL(file);

            return { file, preview, type };
        });

        setPreviews(prev => [...prev, ...newPreviews]);

        // Reset the file input value to allow selecting the same file again
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const removeFile = (index: number) => {
        // Revoke object URL to prevent memory leaks
        URL.revokeObjectURL(previews[index].preview);

        setFiles(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            setError('Введите название темы');
            return;
        }

        if (!content.trim()) {
            setError('Введите содержание темы');
            return;
        }

        if (!categoryId) {
            setError('Выберите категорию');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            // Create FormData to handle file uploads
            const formData = new FormData();
            formData.append('title', title.trim());
            formData.append('content', content.trim());
            formData.append('category_id', categoryId.toString());

            // Append all files to FormData
            files.forEach((file) => {
                formData.append(`files`, file);
            });

            // Using credentials: 'include' to send cookies automatically
            await createTopic(formData);

            // Redirect to forum home page after creating the topic
            router.push('/forum');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Не удалось создать тему');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Helper function to get file icon based on extension
    const getFileIcon = (filename: string) => {
        const extension = filename.split('.').pop()?.toLowerCase();

        switch (extension) {
            case 'pdf':
                return '/icons/pdf.svg';
            case 'doc':
            case 'docx':
                return '/icons/doc.svg';
            case 'xls':
            case 'xlsx':
                return '/icons/xls.svg';
            case 'ppt':
            case 'pptx':
                return '/icons/ppt.svg';
            case 'zip':
            case 'rar':
                return '/icons/zip.svg';
            default:
                return '/icons/file.svg';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Создание новой темы</h1>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
                    <p>{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Название темы
                    </Label>
                    <Input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Введите название темы"
                        disabled={isSubmitting}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Категория
                    </label>
                    <select
                        id="category"
                        value={categoryId}
                        onChange={(e) => setCategoryId(Number(e.target.value))}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        disabled={isSubmitting}
                    >
                        <option value="">Выберите категорию</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <Label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                        Содержание
                    </Label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={8}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Введите содержание вашей темы..."
                        disabled={isSubmitting}
                    ></textarea>
                </div>

                {/* File upload section */}
                <div className="mb-6">
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                        Медиа-файлы
                    </Label>

                    <div className="flex flex-wrap gap-2 mb-3">
                        <Button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 border bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 flex items-center"
                            disabled={isSubmitting}
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Добавить файлы
                        </Button>

                        <Input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar"
                        />
                    </div>

                    {/* Preview of uploaded files */}
                    {previews.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                            {previews.map((item, index) => (
                                <div key={index} className="relative border border-gray-200 rounded-lg p-2 bg-gray-50">
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center z-10"
                                    >
                                        ×
                                    </button>

                                    {item.type === 'image' && (
                                        <div className="h-28 relative">
                                            <img
                                                src={item.preview}
                                                alt={item.file.name}
                                                className="h-full mx-auto object-contain"
                                            />
                                        </div>
                                    )}

                                    {item.type === 'video' && (
                                        <div className="h-28 bg-black relative flex items-center justify-center">
                                            <video
                                                src={item.preview}
                                                className="h-full max-w-full"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <svg className="w-12 h-12 text-white opacity-70" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}

                                    {item.type === 'document' && (
                                        <div className="h-28 flex items-center justify-center">
                                            <img
                                                src={getFileIcon(item.file.name)}
                                                alt={item.file.name}
                                                className="w-16 h-16"
                                            />
                                        </div>
                                    )}

                                    <p className="text-xs mt-2 text-center truncate" title={item.file.name}>
                                        {item.file.name.length > 18
                                            ? `${item.file.name.substring(0, 15)}...`
                                            : item.file.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-end space-x-4">
                    <Button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 border bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100"
                        disabled={isSubmitting}
                    >
                        Отмена
                    </Button>
                    <Button
                        type="submit"
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Создание...' : 'Создать тему'}
                    </Button>
                </div>
            </form>
        </div>
    );
}