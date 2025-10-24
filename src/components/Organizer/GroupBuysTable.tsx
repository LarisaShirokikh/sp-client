import React, { useState } from 'react';
import Link from 'next/link';
import {
    Loader2, Plus, Edit, Eye, Filter,
    Download, Search, ShoppingBag,
    AlertCircle,
    Trash2
} from 'lucide-react';
import {
    formatCurrency,
    getStatusColor,
    getStatusName,
    getStatusKey,
    getProgressColor,
    formatDate
} from '@/utils/formatters';
import { GroupBuy } from '@/app/interface/product';

// Добавляем интерфейс модального окна для подтверждения удаления
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

interface GroupBuysTableProps {
    groupBuys: GroupBuy[];
    loading: boolean;
    onExport: () => void;
    onDelete: (id: string) => Promise<void>;
}

const GroupBuysTable: React.FC<GroupBuysTableProps> = ({
    groupBuys,
    loading,
    onExport,
    onDelete
}) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    // Состояния для модального окна подтверждения удаления
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [groupBuyToDelete, setGroupBuyToDelete] = useState<{ id: string, title: string } | null>(null);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    // Функция для подтверждения удаления
    const handleConfirmDelete = async () => {
        if (!groupBuyToDelete) return;

        setIsDeleting(true);
        try {
            await onDelete(groupBuyToDelete.id);
            // После успешного удаления закрываем модальное окно
            setIsDeleteModalOpen(false);
            setGroupBuyToDelete(null);
        } catch (error) {
            console.error('Ошибка при удалении закупки:', error);
            // Здесь можно добавить отображение сообщения об ошибке
        } finally {
            setIsDeleting(false);
        }
    };

    // Функция для отмены удаления
    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
        setGroupBuyToDelete(null);
    };

    // Фильтрация закупок
    const filteredGroupBuys = groupBuys.filter(groupBuy => {
        const matchesSearch = groupBuy.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || getStatusKey(groupBuy.status) === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Функция для открытия модального окна подтверждения удаления
    const handleDeleteClick = (id: string, title: string) => {
        setGroupBuyToDelete({ id, title });
        setIsDeleteModalOpen(true);
    };

    // Функция для расчета прогресса, если он не указан в данных
    const calculateProgress = (groupBuy: GroupBuy): number => {
        // Если progress уже есть в объекте, используем его
        if (typeof groupBuy.progress === 'number') {
            return groupBuy.progress;
        }

        // Расчет на основе суммы заказа и минимальной суммы
        const currentAmount = groupBuy.total_amount || groupBuy.total_amount || 0;
        const targetAmount = groupBuy.min_order_amount || 1;

        // Ограничиваем максимальное значение 100%
        return Math.min(100, Math.round((currentAmount / targetAmount) * 100));
    };

    // Получаем сумму заказа
    const getAmount = (groupBuy: GroupBuy): number => {
        return groupBuy.total_amount || groupBuy.total_amount || 0;
    };

    // Получаем количество участников
    const getParticipantsCount = (groupBuy: GroupBuy): number => {
        return groupBuy.total_participants || 0;
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold mb-4 md:mb-0">Мои закупки</h2>

                    <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                        {/* Поле поиска */}
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Поиск закупок..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Фильтр по статусу */}
                        <div className="flex items-center space-x-2">
                            <Filter className="h-4 w-4 text-gray-500" />
                            <select
                                className="border border-gray-300 rounded-md px-3 py-2"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">Все статусы</option>
                                <option value="collecting">Сбор заказов</option>
                                <option value="payment">Оплата</option>
                                <option value="ordered">Заказан</option>
                                <option value="delivered">Доставлен</option>
                            </select>
                        </div>

                        {/* Кнопка создания закупки */}
                        <Link
                            href="/organizer/create"
                            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Создать закупку
                        </Link>
                    </div>
                </div>

                {/* Индикатор загрузки */}
                {loading ? (
                    <div className="py-20 flex justify-center items-center">
                        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Название
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Статус
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Участники
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Сумма (₽)
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Прогресс
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Конец сбора
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Действия
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredGroupBuys.map((groupBuy) => {
                                    const progress = calculateProgress(groupBuy);

                                    return (
                                        <tr key={groupBuy.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {groupBuy.image ? (
                                                        <div className="flex-shrink-0 h-10 w-10 mr-3">
                                                            <img
                                                                className="h-10 w-10 rounded-md object-cover"
                                                                src={groupBuy.image}
                                                                alt={groupBuy.title}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md mr-3 flex items-center justify-center">
                                                            <ShoppingBag className="h-5 w-5 text-gray-500" />
                                                        </div>
                                                    )}
                                                    <div className="text-sm font-medium text-gray-900">{groupBuy.title}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(groupBuy.status)}`}>
                                                    {getStatusName(groupBuy.status)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {getParticipantsCount(groupBuy)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatCurrency(getAmount(groupBuy))}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div
                                                        className={`h-2.5 rounded-full ${getProgressColor(progress)}`}
                                                        style={{ width: `${progress}%` }}
                                                    ></div>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1 text-right">
                                                    {progress}%
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(groupBuy.end_date)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <Link
                                                        href={`/organizer/${groupBuy.id}`}
                                                        className="text-blue-600 hover:text-blue-900 p-1"
                                                        title="Просмотр деталей"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                    <Link
                                                        href={`/organizer/${groupBuy.id}/edit`}
                                                        className="text-gray-600 hover:text-gray-900 p-1"
                                                        title="Редактировать"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteClick(groupBuy.id, groupBuy.title)}
                                                        className="text-red-600 hover:text-red-900 p-1"
                                                        title="Удалить закупку"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Сообщение, если нет закупок */}
                {!loading && filteredGroupBuys.length === 0 && (
                    <div className="py-8 text-center text-gray-500">
                        {searchTerm || statusFilter !== 'all'
                            ? 'Нет закупок, соответствующих заданным критериям'
                            : 'У вас пока нет активных закупок'}
                    </div>
                )}

                {/* Футер таблицы */}
                <div className="border-t px-6 py-4 bg-gray-50 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                        Показано {filteredGroupBuys.length} из {groupBuys.length} закупок
                    </div>
                    <button
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                        onClick={onExport}
                    >
                        <Download className="h-4 w-4 mr-1" />
                        Экспорт данных
                    </button>
                </div>
            </div>

            {/* Модальное окно подтверждения удаления */}
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                groupBuyTitle={groupBuyToDelete?.title || ''}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </>
    );
};

export default GroupBuysTable;