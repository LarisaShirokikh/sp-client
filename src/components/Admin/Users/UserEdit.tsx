"use client";

import { useState, useEffect } from 'react';
import { UserData, UsersApiService } from '@/services/usersApiService';
import { toast } from 'sonner';

interface UserEditProps {
    userId: number;
    onSave: (userId: number, updatedUser: UserData) => void;
    onCancel: () => void;
}

export function UserEdit({ userId, onSave, onCancel }: UserEditProps) {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Состояние формы
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        full_name: '',
        phone: '',
        description: ''
    });

    // Загрузка данных пользователя
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const user = await UsersApiService.getUserById(userId);
                setUserData(user);

                // Заполняем форму данными пользователя
                setFormData({
                    name: user.name || '',
                    email: user.email || '',
                    full_name: user.full_name || '',
                    phone: user.phone || '',
                    description: user.description || ''
                });

                setError(null);
            } catch (err) {
                console.error("Ошибка при загрузке данных пользователя:", err);
                const errorMessage = err instanceof Error ? err.message : 'Не удалось загрузить данные пользователя';
                setError(errorMessage);
                toast.error('Ошибка при загрузке данных пользователя');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    // Обработчик изменения полей формы
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Обработчик отправки формы
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userData) return;

        setIsSubmitting(true);
        setError(null);

        try {
            // Отправляем только измененные данные
            const updates: Partial<UserData> = {};

            if (formData.name !== userData.name) updates.name = formData.name;
            if (formData.email !== userData.email) updates.email = formData.email;
            if (formData.full_name !== userData.full_name) updates.full_name = formData.full_name;
            if (formData.phone !== userData.phone) updates.phone = formData.phone;
            if (formData.description !== userData.description) updates.description = formData.description;

            console.log('Отправка обновленных данных:', updates);

            const updatedUser = await UsersApiService.updateUser(userId, updates);
            console.log('Пользователь успешно обновлен:', updatedUser);

            toast.success('Данные пользователя успешно обновлены');
            onSave(userId, updatedUser);
        } catch (err) {
            console.error("Ошибка при обновлении пользователя:", err);
            const errorMessage = err instanceof Error ? err.message : 'Не удалось обновить данные пользователя';
            setError(errorMessage);
            toast.error('Ошибка при обновлении данных пользователя');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow p-6 flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error && !userData) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    >
                        Вернуться
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b">
                <h2 className="text-lg font-medium">Редактирование пользователя</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Обновите информацию о пользователе. ID: {userId}
                </p>
            </div>

            {error && (
                <div className="mx-6 mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                    <p>{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Имя пользователя
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                            disabled={isSubmitting}
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            Уникальное имя для входа в систему
                        </p>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div>
                        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                            Полное имя
                        </label>
                        <input
                            type="text"
                            name="full_name"
                            id="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Телефон
                        </label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            disabled={isSubmitting}
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Описание
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        disabled={isSubmitting}
                    ></textarea>
                </div>

                {userData?.is_superuser && (
                    <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm">
                                    Данный пользователь имеет права Суперпользователя. Будьте осторожны при редактировании.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-8 flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={isSubmitting}
                    >
                        Отмена
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Сохранение...
                            </span>
                        ) : 'Сохранить изменения'}
                    </button>
                </div>
            </form>
        </div>
    );
}