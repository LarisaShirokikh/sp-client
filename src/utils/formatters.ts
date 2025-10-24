/**
 * Форматирует число как валюту (рубли)
 */
export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('ru-RU', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

/**
 * Форматирует дату в российском формате
 */
export function formatDate(dateString: string): string {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

/**
 * Возвращает класс цвета для статуса закупки
 */
export function getStatusColor(status: string): string {
    const statusKey = getStatusKey(status);

    switch (statusKey) {
        case 'collecting': return 'bg-blue-100 text-blue-800';
        case 'payment': return 'bg-yellow-100 text-yellow-800';
        case 'ordered': return 'bg-purple-100 text-purple-800';
        case 'delivered': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

/**
 * Возвращает русское название статуса
 */
export function getStatusName(status: string): string {
    switch (getStatusKey(status)) {
        case 'collecting': return 'Сбор заказов';
        case 'payment': return 'Оплата';
        case 'ordered': return 'Заказан';
        case 'delivered': return 'Доставлен';
        default: return status;
    }
}

/**
 * Получение ключа статуса для фильтрации
 */
export function getStatusKey(status: string): string {
    switch (status) {
        case 'Сбор заказов':
        case 'collecting': return 'collecting';
        case 'Оплата':
        case 'payment': return 'payment';
        case 'Заказан':
        case 'ordered': return 'ordered';
        case 'Доставлен':
        case 'delivered': return 'delivered';
        default: return status.toLowerCase();
    }
}

/**
 * Получение цвета прогресса в зависимости от процента
 */
export function getProgressColor(progress: number): string {
    if (progress >= 100) return 'bg-green-600';
    if (progress >= 75) return 'bg-blue-600';
    if (progress >= 50) return 'bg-yellow-600';
    return 'bg-orange-600';
}