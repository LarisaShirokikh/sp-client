// services/GroupBuyService.ts
import { ApiResponse,  StatsData, Notification, Participant } from "@/app/interface/organizer";
import { GroupBuy, Product } from "@/app/interface/product";
import { API_CONFIG, API_HELPERS } from "@/lib/apiConfig";

// Базовая функция для выполнения API-запросов
async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
    try {
        API_HELPERS.logRequest(options?.method || 'GET', url, options?.body);

        const response = await fetch(url, {
            ...options,
            credentials: 'include', // Always include credentials
        });

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const data = await response.json();
        API_HELPERS.logResponse(options?.method || 'GET', url, { success: data.success });

        // Проверка: если success явно установлен в false, выбрасываем ошибку
        if (data.success === false) {
            throw new Error(data.error || 'Неизвестная ошибка при запросе к API');
        }

        // Если data содержит свойство data, используем его
        if ('data' in data && data.data !== undefined) {
            return data.data as T;
        }

        // Иначе возвращаем весь объект, считая его данными
        return data as T;
    } catch (error) {
        console.error('Ошибка при запросе к API:', error);
        throw error;
    }
}

// Сервис для работы с API закупок
export const GroupBuyService = {
    // Получение статистики
    async getStats(): Promise<StatsData> {
        return fetchApi<StatsData>(
            API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.GROUP_BUY.STATS),
            {
                method: 'GET',
                headers: API_HELPERS.getJsonHeaders()
            }
        );
    },

    // Получение списка закупок
    async getGroupBuys(filters?: Record<string, any>): Promise<GroupBuy[]> {
        let url = API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.GROUP_BUY.LIST);

        if (filters) {
            url = API_HELPERS.addQueryParams(url, filters);
        }

        return fetchApi<GroupBuy[]>(url, {
            method: 'GET',
            headers: API_HELPERS.getJsonHeaders()
        });
    },

    // Получение моих закупок (для организатора)
    async getMyGroupBuys(filters?: Record<string, any>): Promise<GroupBuy[]> {
        let url = API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.GROUP_BUY.MY_LIST);

        if (filters) {
            url = API_HELPERS.addQueryParams(url, filters);
        }

        return fetchApi<GroupBuy[]>(url, {
            method: 'GET',
            headers: API_HELPERS.getJsonHeaders()
        });
    },

    // Получение уведомлений
    async getNotifications(): Promise<Notification[]> {
        return fetchApi<Notification[]>(
            API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.GROUP_BUY.NOTIFICATIONS),
            {
                method: 'GET',
                headers: API_HELPERS.getJsonHeaders()
            }
        );
    },

    // Получение детальной информации о закупке
    async getGroupBuyDetails(id: string): Promise<GroupBuy> {
        return fetchApi<GroupBuy>(
            API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.GROUP_BUY.DETAILS(id)),
            {
                method: 'GET',
                headers: API_HELPERS.getJsonHeaders()
            }
        );
    },

    // Создание новой закупки
    async createGroupBuy(data: Partial<GroupBuy>): Promise<GroupBuy> {
        return fetchApi<GroupBuy>(
            API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.GROUP_BUY.CREATE),
            {
                method: 'POST',
                headers: API_HELPERS.getJsonHeaders(),
                body: JSON.stringify(data)
            }
        );
    },

    // Обновление закупки
    async updateGroupBuy(id: string, data: Partial<GroupBuy>): Promise<GroupBuy> {
        return fetchApi<GroupBuy>(
            API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.GROUP_BUY.UPDATE(id)),
            {
                method: 'PUT',
                headers: API_HELPERS.getJsonHeaders(),
                body: JSON.stringify(data)
            }
        );
    },

    // Удаление закупки
    async deleteGroupBuy(id: string): Promise<{ success: boolean }> {
        return fetchApi<{ success: boolean }>(
            API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.GROUP_BUY.DELETE(id)),
            {
                method: 'DELETE',
                headers: API_HELPERS.getJsonHeaders()
            }
        );
    },

    // Экспорт данных о закупках
    async exportGroupBuys(format: 'csv' | 'xlsx' = 'csv'): Promise<Blob> {
        const url = API_HELPERS.addQueryParams(
            API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.GROUP_BUY.EXPORT),
            { format }
        );

        API_HELPERS.logRequest('GET', url);

        const response = await fetch(url, {
            method: 'GET',
            headers: API_HELPERS.getJsonHeaders(),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        API_HELPERS.logResponse('GET', url, { success: true });
        return response.blob();
    },

    // Получение продуктов закупки
    async getProducts(groupBuyId: string, filters?: Record<string, any>): Promise<Product[]> {
        let url = API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.GROUP_BUY.PRODUCTS.LIST(groupBuyId));

        if (filters) {
            url = API_HELPERS.addQueryParams(url, filters);
        }

        return fetchApi<Product[]>(url, {
            method: 'GET',
            headers: API_HELPERS.getJsonHeaders()
        });
    },

    // Создание продукта в закупке
    async createProduct(groupBuyId: string, data: Partial<Product>): Promise<Product> {
        return fetchApi<Product>(
            API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.GROUP_BUY.PRODUCTS.CREATE(groupBuyId)),
            {
                method: 'POST',
                headers: API_HELPERS.getJsonHeaders(),
                body: JSON.stringify(data)
            }
        );
    },

    // Обновление продукта в закупке
    async updateProduct(groupBuyId: string, productId: string, data: Partial<Product>): Promise<Product> {
        return fetchApi<Product>(
            API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.GROUP_BUY.PRODUCTS.UPDATE(groupBuyId, productId)),
            {
                method: 'PUT',
                headers: API_HELPERS.getJsonHeaders(),
                body: JSON.stringify(data)
            }
        );
    },

    // Удаление продукта из закупки
    async deleteProduct(groupBuyId: string, productId: string): Promise<{ success: boolean }> {
        return fetchApi<{ success: boolean }>(
            API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.GROUP_BUY.PRODUCTS.DELETE(groupBuyId, productId)),
            {
                method: 'DELETE',
                headers: API_HELPERS.getJsonHeaders()
            }
        );
    },

    // Получение участников закупки
    async getParticipants(groupBuyId: string): Promise<Participant[]> {
        return fetchApi<Participant[]>(
            API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.GROUP_BUY.PARTICIPANTS.LIST(groupBuyId)),
            {
                method: 'GET',
                headers: API_HELPERS.getJsonHeaders()
            }
        );
    },

    // Приглашение участника в закупку
    async inviteParticipant(groupBuyId: string, email: string): Promise<{ success: boolean }> {
        return fetchApi<{ success: boolean }>(
            API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.GROUP_BUY.PARTICIPANTS.INVITE(groupBuyId)),
            {
                method: 'POST',
                headers: API_HELPERS.getJsonHeaders(),
                body: JSON.stringify({ email })
            }
        );
    },

    // Получение комментариев к закупке
    async getComments(groupBuyId: string): Promise<any[]> {
        return fetchApi<any[]>(
            API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.GROUP_BUY.COMMENTS.LIST(groupBuyId)),
            {
                method: 'GET',
                headers: API_HELPERS.getJsonHeaders()
            }
        );
    },

    // Добавление комментария к закупке
    async addComment(groupBuyId: string, content: string): Promise<any> {
        return fetchApi<any>(
            API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.GROUP_BUY.COMMENTS.CREATE(groupBuyId)),
            {
                method: 'POST',
                headers: API_HELPERS.getJsonHeaders(),
                body: JSON.stringify({ content })
            }
        );
    }
};