"use client"

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft, Edit, Trash2, Download, ShoppingBag,
    Calendar, Users, DollarSign, Percent, Clock, AlertCircle
} from 'lucide-react';
import {
    formatCurrency,
    getStatusColor,
    getStatusName,
    getProgressColor,
    formatDate
} from '@/utils/formatters';
import { GroupBuy, Participant } from '@/app/interface/product';
import { GroupBuyService } from '@/services/groupBuyService';

// Интерфейс для модального окна подтверждения удаления
interface DeleteModalProps {
    isOpen: boolean;
    groupBuyTitle: string;
    onConfirm: () => void;
    onCancel: () => void;
}

// Компонент модального окна для подтверждения удаления
const DeleteConfirmationModal: React.FC<DeleteModalProps> = ({
    isOpen,
    groupBuyTitle,
    onConfirm,
    onCancel
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                <div className="flex items-center mb-4">
                    <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
                    <h3 className="text-lg font-semibold">Подтверждение удаления</h3>
                </div>
                <p className="mb-6 text-gray-600">
                    Вы действительно хотите удалить закупку <span className="font-medium">"{groupBuyTitle}"</span>?
                    Это действие невозможно отменить.
                </p>
                <div className="flex justify-end space-x-3">
                    <button
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                        onClick={onCancel}
                    >
                        Отмена
                    </button>
                    <button
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
                        onClick={onConfirm}
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
};

// Интерфейс для компонента таблицы участников
interface ParticipantsTableProps {
    participants: Participant[];
}

// Компонент для отображения участников закупки
const ParticipantsTable: React.FC<ParticipantsTableProps> = ({ participants }) => {
    return (
        <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold">Участники закупки</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Пользователь
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Количество
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Сумма
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Статус оплаты
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {participants && participants.length > 0 ? (
                            participants.map((participant, index) => (
                                <tr key={participant.id || index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                                {participant.avatar ? (
                                                    <img
                                                        src={participant.avatar}
                                                        alt={participant.name}
                                                        className="h-8 w-8 rounded-full"
                                                    />
                                                ) : (
                                                    <span className="text-sm font-medium text-gray-500">
                                                        {participant.name.charAt(0)}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {participant.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {participant.quantity}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatCurrency(participant.amount)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${participant.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {participant.isPaid ? 'Оплачено' : 'Ожидается'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                                    Нет участников в этой закупке
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Основной компонент страницы просмотра деталей закупки
const GroupBuyDetails: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [groupBuy, setGroupBuy] = useState<GroupBuy | null>(null);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Состояния для модального окна подтверждения удаления
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    // Загрузка данных закупки
    useEffect(() => {
        const fetchGroupBuyData = async () => {
            if (!id) return;

            setLoading(true);
            setError(null);

            try {
                // Получаем детали закупки
                const groupBuyData = await GroupBuyService.getGroupBuyDetails(id);
                setGroupBuy(groupBuyData);

                // Получаем список участников
                const participantsData = await GroupBuyService.getParticipants(id);
                setParticipants(participantsData);
            } catch (err) {
                console.error('Ошибка при загрузке данных закупки:', err);
                setError(err instanceof Error ? err.message : 'Ошибка при загрузке данных закупки');
            } finally {
                setLoading(false);
            }
        };

        fetchGroupBuyData();
    }, [id]);

    // Функция для обработки удаления закупки
    const handleDeleteClick = (): void => {
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async (): Promise<void> => {
        if (!id || !groupBuy) return;

        setIsDeleting(true);
        try {
            // Вызываем API метод для удаления закупки
            await GroupBuyService.deleteGroupBuy(id);

            // После успешного удаления перенаправляем на страницу со списком закупок
            router.push('/organizer');
        } catch (err) {
            console.error('Ошибка при удалении закупки:', err);
            setError(err instanceof Error ? err.message : 'Не удалось удалить закупку. Пожалуйста, попробуйте позже.');
        } finally {
            setIsDeleting(false);
            setIsDeleteModalOpen(false);
        }
    };

    const handleCancelDelete = (): void => {
        setIsDeleteModalOpen(false);
    };

    // Функция для расчета прогресса
    const calculateProgress = (groupBuy: GroupBuy | null): number => {
        if (!groupBuy) return 0;

        if (typeof groupBuy.progress === 'number') {
            return groupBuy.progress;
        }

        const currentAmount = groupBuy.total_amount || 0;
        const targetAmount = groupBuy.min_order_amount || 1;

        return Math.min(100, Math.round((currentAmount / targetAmount) * 100));
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

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
                    <h2 className="text-xl font-semibold text-red-800 mb-2">Произошла ошибка</h2>
                    <p className="text-red-600">{error}</p>
                    <Link href="/organizer" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Вернуться к списку закупок
                    </Link>
                </div>
            </div>
        );
    }

    if (!groupBuy) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                    <AlertCircle className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
                    <h2 className="text-xl font-semibold text-yellow-800 mb-2">Закупка не найдена</h2>
                    <p className="text-yellow-600">Запрошенная закупка не существует или была удалена.</p>
                    <Link href="/organizer" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Вернуться к списку закупок
                    </Link>
                </div>
            </div>
        );
    }

    const progress = calculateProgress(groupBuy);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Навигация и действия */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div className="flex items-center mb-4 md:mb-0">
                    <Link href="/organizer" className="text-gray-600 hover:text-gray-900 mr-3">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Детали закупки</h1>
                </div>

                <div className="flex space-x-3">
                    <Link
                        href={`/organizer/${groupBuy.id}/edit`}
                        className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                        <Edit className="h-4 w-4 mr-2" />
                        Редактировать
                    </Link>
                    <button
                        onClick={handleDeleteClick}
                        className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                        ) : (
                            <Trash2 className="h-4 w-4 mr-2" />
                        )}
                        Удалить
                    </button>
                </div>
            </div>

            {/* Основной контент */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                {/* Заголовок и статус */}
                <div className="flex flex-col md:flex-row md:items-center justify-between p-6 border-b">
                    <div className="flex items-center mb-4 md:mb-0">
                        {groupBuy.image ? (
                            <div className="h-16 w-16 rounded-md overflow-hidden mr-4">
                                <img
                                    src={groupBuy.image}
                                    alt={groupBuy.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="h-16 w-16 bg-gray-200 rounded-md mr-4 flex items-center justify-center">
                                <ShoppingBag className="h-8 w-8 text-gray-500" />
                            </div>
                        )}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">{groupBuy.title}</h2>
                            <div className="flex items-center mt-1">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(groupBuy.status)}`}>
                                    {getStatusName(groupBuy.status)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Детали и прогресс */}
                <div className="p-6">
                    {/* Описание */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Описание</h3>
                        <p className="text-gray-700">{groupBuy.description}</p>
                    </div>

                    {/* Прогресс */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Прогресс</h3>
                        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                            <div
                                className={`h-4 rounded-full ${getProgressColor(progress)}`}
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Собрано: {formatCurrency(groupBuy.total_amount)}</span>
                            <span>Цель: {formatCurrency(groupBuy.min_order_amount)}</span>
                            <span className="font-medium">{progress}%</span>
                        </div>
                    </div>

                    {/* Информационные карточки */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {/* Дата начала */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                                <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                                <h4 className="text-sm font-medium text-gray-700">Дата начала</h4>
                            </div>
                            <p className="text-lg font-semibold">{formatDate(groupBuy.start_date)}</p>
                        </div>

                        {/* Дата окончания */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                                <Clock className="h-5 w-5 text-gray-500 mr-2" />
                                <h4 className="text-sm font-medium text-gray-700">Дата окончания</h4>
                            </div>
                            <p className="text-lg font-semibold">{formatDate(groupBuy.end_date)}</p>
                        </div>

                        {/* Участники */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                                <Users className="h-5 w-5 text-gray-500 mr-2" />
                                <h4 className="text-sm font-medium text-gray-700">Участники</h4>
                            </div>
                            <p className="text-lg font-semibold">{groupBuy.total_participants}</p>
                        </div>

                        {/* Сумма */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                                <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                                <h4 className="text-sm font-medium text-gray-700">Собрано</h4>
                            </div>
                            <p className="text-lg font-semibold">{formatCurrency(groupBuy.total_amount)}</p>
                        </div>
                    </div>

                    {/* Организатор */}
                    {groupBuy.organizer && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Организатор</h3>
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-gray-200 mr-3 flex items-center justify-center overflow-hidden">
                                    {groupBuy.organizer.avatar ? (
                                        <img
                                            src={groupBuy.organizer.avatar}
                                            alt={groupBuy.organizer.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-sm font-medium text-gray-500">
                                            {groupBuy.organizer.name.charAt(0)}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <p className="font-medium">{groupBuy.organizer.name}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Таблица участников */}
            <ParticipantsTable participants={participants} />

            {/* Модальное окно подтверждения удаления */}
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                groupBuyTitle={groupBuy.title}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </div>
    );
};

export default GroupBuyDetails;