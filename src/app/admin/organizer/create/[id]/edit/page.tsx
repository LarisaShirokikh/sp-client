"use client";

import { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import { AdminNav } from '@/components/Admin/AdminNav';
import ProtectedRoute from '@/components/Common/ProtectedRoute';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useAdminPermissions } from '@/app/hooks/useAdminPermissions';

interface FormData {
    title: string;
    description: string;
    category: string;
    supplier: string;
    minOrderAmount: number;
    endDate: string;
    feePercent: number;
    allowPartialPurchase: boolean;
    isVisible: boolean;
    status: string;
}

export default function EditGroupBuy() {
    const router = useRouter();
    const params = useParams();
    const groupBuyId = params.id as string;
    const permissions = useAdminPermissions();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        category: '',
        supplier: '',
        minOrderAmount: 0,
        endDate: '',
        feePercent: 0,
        allowPartialPurchase: false,
        isVisible: true,
        status: ''
    });

    // Загрузка данных закупки при монтировании компонента
    useEffect(() => {
        const fetchGroupBuyData = async () => {
            try {
                setLoading(true);
                // В реальном приложении здесь будет запрос к API для получения данных закупки
                // const response = await fetch(`/api/group-buys/${groupBuyId}`);
                // const data = await response.json();

                // Имитация ответа от API
                await new Promise(resolve => setTimeout(resolve, 800));

                // Тестовые данные
                const mockData = {
                    id: groupBuyId,
                    title: 'Летняя одежда 2025',
                    description: 'Совместная закупка летней одежды из новой коллекции. Минимальная сумма заказа 50 000 руб.',
                    category: 'clothes',
                    supplier: 'ООО "Фэшн Трейд"',
                    minOrderAmount: 50000,
                    endDate: '2025-04-15',
                    feePercent: 5,
                    allowPartialPurchase: true,
                    isVisible: true,
                    status: 'active'
                };

                setFormData({
                    title: mockData.title,
                    description: mockData.description,
                    category: mockData.category,
                    supplier: mockData.supplier,
                    minOrderAmount: mockData.minOrderAmount,
                    endDate: mockData.endDate,
                    feePercent: mockData.feePercent,
                    allowPartialPurchase: mockData.allowPartialPurchase,
                    isVisible: mockData.isVisible,
                    status: mockData.status
                });

                setLoading(false);
            } catch (err) {
                console.error('Ошибка при загрузке данных закупки:', err);
                setError('Не удалось загрузить данные закупки');
                setLoading(false);
            }
        };

        fetchGroupBuyData();
    }, [groupBuyId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const isCheckbox = type === 'checkbox';

        if (isCheckbox) {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({
                ...prev,
                [name]: checked
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'number' ? parseFloat(value) : value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        setSuccess(false);

        try {
            // Валидация формы
            if (!formData.title.trim()) {
                throw new Error('Название закупки обязательно');
            }

            if (!formData.supplier.trim()) {
                throw new Error('Поставщик обязателен');
            }

            if (!formData.endDate) {
                throw new Error('Дата окончания сбора заказов обязательна');
            }

            // В реальном приложении здесь будет отправка данных на сервер
            // await fetch(`/api/group-buys/${groupBuyId}`, {
            //   method: 'PUT',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(formData)
            // });

            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log('Отправленные данные:', formData);

            setSuccess(true);

            // Перенаправление на страницу деталей закупки после успешного обновления
            setTimeout(() => {
                router.push(`/admin/organizer/${groupBuyId}`);
            }, 1500);

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Произошла ошибка при сохранении закупки');
            }
        } finally {
            setSaving(false);
        }
    };

    const categories = [
        { id: 'clothes', name: 'Одежда и обувь' },
        { id: 'home', name: 'Товары для дома' },
        { id: 'kids', name: 'Детские товары' },
        { id: 'food', name: 'Продукты питания' },
        { id: 'beauty', name: 'Косметика и парфюмерия' },
        { id: 'other', name: 'Другое' }
    ];

    const statuses = [
        { id: 'draft', name: 'Черновик' },
        { id: 'active', name: 'Активная' },
        { id: 'payment', name: 'Сбор оплаты' },
        { id: 'ordered', name: 'Заказана у поставщика' },
        { id: 'delivered', name: 'Получена от поставщика' },
        { id: 'distributing', name: 'Раздача участникам' },
        { id: 'completed', name: 'Завершена' },
        { id: 'canceled', name: 'Отменена' }
    ];

    // Если данные ещё загружаются, показываем индикатор загрузки
    if (loading) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen bg-gray-100">
                    <AdminHeader />
                    <div className="flex">
                        <AdminNav />
                        <main className="flex-1 p-6">
                            <div className="max-w-4xl mx-auto">
                                <div className="flex justify-center items-center h-64">
                                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-100">
                <AdminHeader />
                <div className="flex">
                    <AdminNav />
                    <main className="flex-1 p-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">Редактирование закупки</h1>
                                <div className="flex space-x-2">
                                    <Link
                                        href={`/admin/organizer/${groupBuyId}`}
                                        className="text-gray-600 hover:text-gray-900 px-3 py-2"
                                    >
                                        Вернуться к закупке
                                    </Link>
                                    <Link
                                        href="/admin/organizer"
                                        className="text-gray-600 hover:text-gray-900 px-3 py-2"
                                    >
                                        Все закупки
                                    </Link>
                                </div>
                            </div>

                            {/* Отладочная информация о правах для суперадмина */}
                            {permissions.isSuperAdmin && (
                                <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                                    <p className="text-green-800">
                                        Вы вошли как суперадминистратор и имеете полный доступ к редактированию закупок.
                                    </p>
                                </div>
                            )}

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-6">
                                    Закупка успешно обновлена! Вы будете перенаправлены на страницу закупки.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold">Основная информация</h2>
                                </div>

                                <div className="p-6 space-y-6">
                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                                Название закупки *
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                                Описание закупки
                                            </label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                rows={4}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            ></textarea>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Категория
                                                </label>
                                                <select
                                                    id="category"
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    <option value="">Выберите категорию</option>
                                                    {categories.map(category => (
                                                        <option key={category.id} value={category.id}>
                                                            {category.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label htmlFor="supplier" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Поставщик *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="supplier"
                                                    name="supplier"
                                                    value={formData.supplier}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 border-t border-gray-200">
                                    <h2 className="text-lg font-semibold mb-4">Параметры закупки</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="minOrderAmount" className="block text-sm font-medium text-gray-700 mb-1">
                                                Минимальная сумма заказа (₽)
                                            </label>
                                            <input
                                                type="number"
                                                id="minOrderAmount"
                                                name="minOrderAmount"
                                                value={formData.minOrderAmount}
                                                onChange={handleChange}
                                                min="0"
                                                step="100"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                                                Дата окончания сбора заказов *
                                            </label>
                                            <input
                                                type="date"
                                                id="endDate"
                                                name="endDate"
                                                value={formData.endDate}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="feePercent" className="block text-sm font-medium text-gray-700 mb-1">
                                                Комиссия организатора (%)
                                            </label>
                                            <input
                                                type="number"
                                                id="feePercent"
                                                name="feePercent"
                                                value={formData.feePercent}
                                                onChange={handleChange}
                                                min="0"
                                                max="25"
                                                step="0.5"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                                Статус закупки
                                            </label>
                                            <select
                                                id="status"
                                                name="status"
                                                value={formData.status}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">Выберите статус</option>
                                                {statuses.map(status => (
                                                    <option key={status.id} value={status.id}>
                                                        {status.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mt-4 space-y-3">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="allowPartialPurchase"
                                                name="allowPartialPurchase"
                                                checked={formData.allowPartialPurchase}
                                                onChange={handleChange as any}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="allowPartialPurchase" className="ml-2 block text-sm text-gray-700">
                                                Разрешить выкуп части заказа, если не набрана минимальная сумма
                                            </label>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="isVisible"
                                                name="isVisible"
                                                checked={formData.isVisible}
                                                onChange={handleChange as any}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="isVisible" className="ml-2 block text-sm text-gray-700">
                                                Закупка видна другим пользователям
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-6 py-4 bg-gray-50 flex justify-end rounded-b-lg">
                                    <Link
                                        href={`/admin/organizer/${groupBuyId}`}
                                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mr-3"
                                    >
                                        Отмена
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {saving ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Сохранение...
                                            </>
                                        ) : 'Сохранить изменения'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}