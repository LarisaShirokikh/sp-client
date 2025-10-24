"use client"

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft, Save, Image, Calendar, Loader2, AlertCircle, X
} from 'lucide-react';
import { formatDate } from '@/utils/formatters';
import { GroupBuy } from '@/app/interface/product';
import { GroupBuyService } from '@/services/groupBuyService';

// Интерфейс для формы редактирования
interface FormData {
    title: string;
    description: string;
    min_order_amount: string;
    start_date: string;
    end_date: string;
    image: File | null;
    imagePreview: string | null;
}

// Интерфейс для ошибок валидации
interface FormErrors {
    title?: string;
    description?: string;
    min_order_amount?: string;
    start_date?: string;
    end_date?: string;
    image?: string;
}

// Компонент для вывода сообщения об ошибке
interface ErrorMessageProps {
    message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    if (!message) return null;

    return (
        <div className="text-red-500 text-sm mt-1">
            {message}
        </div>
    );
};

// Основной компонент страницы редактирования закупки
const EditGroupBuy: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    // Состояния формы
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        min_order_amount: '',
        start_date: '',
        end_date: '',
        image: null,
        imagePreview: null
    });

    // Состояния для обработки ошибок
    const [errors, setErrors] = useState<FormErrors>({});
    const [apiError, setApiError] = useState<string | null>(null);

    // Состояния загрузки
    const [loading, setLoading] = useState<boolean>(true);
    const [saving, setSaving] = useState<boolean>(false);

    // Загрузка данных закупки для редактирования
    useEffect(() => {
        const fetchGroupBuyData = async () => {
            if (!id) return;

            setLoading(true);
            setApiError(null);

            try {
                // Получаем детали закупки через API
                const groupBuyData = await GroupBuyService.getGroupBuyDetails(id);

                // Форматируем даты для input type="date"
                const startDate = formatDateForInput(groupBuyData.start_date);
                const endDate = formatDateForInput(groupBuyData.end_date);

                setFormData({
                    title: groupBuyData.title || '',
                    description: groupBuyData.description || '',
                    min_order_amount: groupBuyData.min_order_amount?.toString() || '',
                    start_date: startDate,
                    end_date: endDate,
                    image: null,
                    imagePreview: groupBuyData.image || null
                });
            } catch (err) {
                console.error('Ошибка при загрузке данных закупки:', err);
                setApiError(err instanceof Error ? err.message : 'Ошибка при загрузке данных закупки');
            } finally {
                setLoading(false);
            }
        };

        fetchGroupBuyData();
    }, [id]);

    // Функция форматирования даты для input type="date"
    const formatDateForInput = (dateString: string): string => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    // Обработчик изменения полей формы
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Очищаем ошибку поля при изменении
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    // Обработчик изменения изображения
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];

        // Проверяем тип файла
        if (!file.type.startsWith('image/')) {
            setErrors(prev => ({
                ...prev,
                image: 'Пожалуйста, выберите изображение'
            }));
            return;
        }

        // Создаем URL для предпросмотра
        const imageUrl = URL.createObjectURL(file);

        setFormData(prev => ({
            ...prev,
            image: file,
            imagePreview: imageUrl
        }));

        // Очищаем ошибку поля
        if (errors.image) {
            setErrors(prev => ({ ...prev, image: undefined }));
        }
    };

    // Обработчик удаления изображения
    const handleRemoveImage = (): void => {
        setFormData(prev => ({
            ...prev,
            image: null,
            imagePreview: null
        }));
    };

    // Валидация формы
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Название закупки обязательно';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Описание закупки обязательно';
        }

        if (!formData.min_order_amount) {
            newErrors.min_order_amount = 'Минимальная сумма заказа обязательна';
        } else if (isNaN(parseFloat(formData.min_order_amount)) || parseFloat(formData.min_order_amount) <= 0) {
            newErrors.min_order_amount = 'Сумма должна быть положительным числом';
        }

        if (!formData.start_date) {
            newErrors.start_date = 'Дата начала обязательна';
        }

        if (!formData.end_date) {
            newErrors.end_date = 'Дата окончания обязательна';
        } else if (formData.start_date && new Date(formData.end_date) <= new Date(formData.start_date)) {
            newErrors.end_date = 'Дата окончания должна быть позже даты начала';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Обработчик отправки формы
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        // Валидация формы
        if (!validateForm()) {
            return;
        }

        setSaving(true);
        setApiError(null);

        try {
            // Подготавливаем данные для API
            const updatedGroupBuy: Partial<GroupBuy> = {
                title: formData.title,
                description: formData.description,
                min_order_amount: parseFloat(formData.min_order_amount),
                start_date: formData.start_date,
                end_date: formData.end_date
            };

            // Если есть новое изображение, нужно его загрузить отдельно
            // Это зависит от конкретной реализации API
            // Здесь предполагается, что API принимает данные в формате JSON

            // Вызываем API для обновления закупки
            await GroupBuyService.updateGroupBuy(id, updatedGroupBuy);

            // После успешного обновления перенаправляем на страницу деталей закупки
            router.push(`/organizer/${id}`);
        } catch (err) {
            console.error('Ошибка при обновлении закупки:', err);
            setApiError(err instanceof Error ? err.message : 'Не удалось обновить закупку. Пожалуйста, попробуйте позже.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    if (apiError && !loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
                    <h2 className="text-xl font-semibold text-red-800 mb-2">Произошла ошибка</h2>
                    <p className="text-red-600">{apiError}</p>
                    <Link href={`/organizer/${id}`} className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Вернуться к деталям закупки
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Заголовок страницы и навигация */}
            <div className="flex items-center mb-6">
                <Link href={`/organizer/${id}`} className="text-gray-600 hover:text-gray-900 mr-3">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Редактирование закупки</h1>
            </div>

            {/* Форма редактирования */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-6">
                        {/* Отображение ошибки API */}
                        {apiError && (
                            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                                <div className="flex">
                                    <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                                    <p className="text-red-600">{apiError}</p>
                                </div>
                            </div>
                        )}

                        {/* Название закупки */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Название закупки *
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border ${errors.title ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="Введите название закупки"
                            />
                            <ErrorMessage message={errors.title} />
                        </div>

                        {/* Описание закупки */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Описание *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={4}
                                className={`w-full px-4 py-2 border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="Введите описание закупки"
                            />
                            <ErrorMessage message={errors.description} />
                        </div>

                        {/* Минимальная сумма заказа */}
                        <div>
                            <label htmlFor="min_order_amount" className="block text-sm font-medium text-gray-700 mb-1">
                                Минимальная сумма заказа (₽) *
                            </label>
                            <input
                                type="number"
                                id="min_order_amount"
                                name="min_order_amount"
                                value={formData.min_order_amount}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border ${errors.min_order_amount ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="Введите минимальную сумму заказа"
                                min={1}
                            />
                            <ErrorMessage message={errors.min_order_amount} />
                        </div>

                        {/* Даты начала и окончания */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-1">
                                    Дата начала *
                                </label>
                                <input
                                    type="date"
                                    id="start_date"
                                    name="start_date"
                                    value={formData.start_date}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border ${errors.start_date ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                <ErrorMessage message={errors.start_date} />
                            </div>

                            <div>
                                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-1">
                                    Дата окончания *
                                </label>
                                <input
                                    type="date"
                                    id="end_date"
                                    name="end_date"
                                    value={formData.end_date}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border ${errors.end_date ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                <ErrorMessage message={errors.end_date} />
                            </div>
                        </div>

                        {/* Загрузка изображения */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Изображение
                            </label>

                            {formData.imagePreview ? (
                                <div className="relative inline-block">
                                    <img
                                        src={formData.imagePreview}
                                        alt="Предпросмотр"
                                        className="h-40 w-40 object-cover rounded-md border border-gray-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <Image className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="image"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                                            >
                                                <span>Загрузите изображение</span>
                                                <input
                                                    id="image"
                                                    name="image"
                                                    type="file"
                                                    accept="image/*"
                                                    className="sr-only"
                                                    onChange={handleImageChange}
                                                />
                                            </label>
                                            <p className="pl-1">или перетащите его сюда</p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG, GIF до 10MB
                                        </p>
                                    </div>
                                </div>
                            )}
                            <ErrorMessage message={errors.image} />
                        </div>
                    </div>

                    {/* Кнопки действий */}
                    <div className="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-3">
                        <Link
                            href={`/organizer/${id}`}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                        >
                            Отмена
                        </Link>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                            disabled={saving}
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                    Сохранение...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4 mr-2" />
                                    Сохранить изменения
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditGroupBuy;