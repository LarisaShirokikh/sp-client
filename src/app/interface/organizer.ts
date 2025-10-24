// app/interface/organizer.ts

// Общий ответ API
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
        totalPages?: number;
    };
}

// Статистика для дашборда
export interface StatsData {
    activeGroupBuys: number;    // Активные закупки
    totalParticipants: number;  // Всего участников
    totalAmount: number;        // Общая сумма (в рублях)
    completedGroupBuys: number; // Завершенные закупки
    lastMonthGrowth: number;    // Рост за последний месяц (%)
}

// Статусы закупок
export enum GroupBuyStatus {
    DRAFT = 'draft',           // Черновик
    COLLECTING = 'collecting', // Сбор заказов
    PAYMENT = 'payment',       // Ожидание оплаты
    ORDERED = 'ordered',       // Заказано у поставщика
    DELIVERED = 'delivered',   // Получено от поставщика
    COMPLETED = 'completed',   // Завершена
    CANCELLED = 'cancelled'    // Отменена
}

// Типы уведомлений
export enum NotificationType {
    INFO = 'info',        // Информационное
    WARNING = 'warning',  // Предупреждение
    SUCCESS = 'success',  // Успешное действие
    ERROR = 'error'       // Ошибка
}

// Уведомление
export interface Notification {
    id: string;
    message: string;
    type: NotificationType | string;
    date: string;
    read?: boolean;
    link?: string;
}


// Участник закупки
export interface Participant {
    id: string;
    userId: string;
    userName: string;
    email?: string;
    joinedAt: string;
    orderCount: number;
    totalAmount: number;
    status: 'active' | 'inactive' | 'blocked';
}

// Поля фильтрации для закупок
export interface GroupBuyFilters {
    status?: GroupBuyStatus | string;
    category?: string;
    search?: string;
    dateFrom?: string;
    dateTo?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}