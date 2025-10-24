// services/AdminApiService.ts
import { UserData } from "@/app/interface/auth";
import { API_CONFIG, API_HELPERS } from "@/lib/apiConfig";

// Интерфейсы для типизации данных
export interface DashboardStats {
    totalUsers: number;
    activeUsers: number;
    newUsers: number;
    totalOrders: number;
    userGrowth?: Array<{ name: string; users: number }>;
    activeUsersByDay?: Array<{ day: string; users: number }>;
}

export interface Activity {
    id: number;
    type: 'success' | 'warning' | 'error' | 'info';
    message: string;
    timestamp: string; // ISO дата
    user?: { id: number; name: string } | string;
    details?: string;
}

export interface UserDetail extends UserData {
    phone?: string;
    is_phone_verified: boolean;
    description?: string;
    rating: number;
    avatar_url?: string;
    followers_count: number;
    following_count: number;
}

export interface Order {
    id: number;
    order_number: string;
    customer_name: string;
    amount: number;
    status: string;
    created_at: string;
}

export interface SiteSettings {
    site_name: string;
    description?: string;
    contact_email: string;
    maintenance_mode: boolean;
    registration_enabled: boolean;
    theme: string;
    social_media?: Record<string, string>;
}

// Основной API сервис для админ-панели
export const AdminApiService = {
    // Dashboard endpoints
    async getDashboardStats(): Promise<DashboardStats> {
        try {
            API_HELPERS.logRequest('GET', API_CONFIG.ENDPOINTS.ADMIN.DASHBOARD.STATS);

            const response = await fetch(API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.ADMIN.DASHBOARD.STATS), {
                method: "GET",
                headers: API_HELPERS.getJsonHeaders(),
                credentials: 'include',
            });

            await API_HELPERS.handleError(response);
            const data = await response.json();

            API_HELPERS.logResponse('GET', API_CONFIG.ENDPOINTS.ADMIN.DASHBOARD.STATS, { success: !!data });
            return data;
        } catch (error) {
            console.error("Error fetching dashboard stats:", error);
            throw error;
        }
    },

    async getActivities(limit: number = 10): Promise<Activity[]> {
        try {
            const url = API_HELPERS.addQueryParams(
                API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.ADMIN.DASHBOARD.ACTIVITIES),
                { limit }
            );

            API_HELPERS.logRequest('GET', url);

            const response = await fetch(url, {
                method: "GET",
                headers: API_HELPERS.getJsonHeaders(),
                credentials: 'include',
            });

            await API_HELPERS.handleError(response);
            const data = await response.json();

            API_HELPERS.logResponse('GET', url, { count: data.length });
            return data;
        } catch (error) {
            console.error("Error fetching activities:", error);
            throw error;
        }
    },

    // User management endpoints
    async getUsers(page: number = 1, limit: number = 10): Promise<{ users: UserData[], total: number }> {
        try {
            const url = API_HELPERS.addQueryParams(
                API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.ADMIN.USERS.LIST),
                { page, limit }
            );

            API_HELPERS.logRequest('GET', url);

            const response = await fetch(url, {
                method: "GET",
                headers: API_HELPERS.getJsonHeaders(),
                credentials: 'include',
            });

            await API_HELPERS.handleError(response);
            const data = await response.json();

            API_HELPERS.logResponse('GET', url, { count: data.users?.length, total: data.total });
            return data;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    },

    async getUserById(userId: number): Promise<UserDetail> {
        try {
            const endpoint = API_CONFIG.ENDPOINTS.ADMIN.USERS.DETAILS(userId);
            API_HELPERS.logRequest('GET', endpoint);

            const response = await fetch(API_HELPERS.getFullUrl(endpoint), {
                method: "GET",
                headers: API_HELPERS.getJsonHeaders(),
                credentials: 'include',
            });

            await API_HELPERS.handleError(response);
            const data = await response.json();

            API_HELPERS.logResponse('GET', endpoint, { success: !!data });
            return data;
        } catch (error) {
            console.error(`Error fetching user #${userId}:`, error);
            throw error;
        }
    },

    async updateUser(userId: number, userData: Partial<UserDetail>): Promise<UserDetail> {
        try {
            const endpoint = API_CONFIG.ENDPOINTS.ADMIN.USERS.UPDATE(userId);
            API_HELPERS.logRequest('PUT', endpoint, userData);

            const response = await fetch(API_HELPERS.getFullUrl(endpoint), {
                method: "PUT",
                headers: API_HELPERS.getJsonHeaders(),
                credentials: 'include',
                body: JSON.stringify(userData),
            });

            await API_HELPERS.handleError(response);
            const data = await response.json();

            API_HELPERS.logResponse('PUT', endpoint, { success: !!data });
            return data;
        } catch (error) {
            console.error(`Error updating user #${userId}:`, error);
            throw error;
        }
    },

    async updateUserRole(userId: number, roles: string[]): Promise<UserDetail> {
        try {
            const endpoint = API_CONFIG.ENDPOINTS.ADMIN.USERS.CHANGE_ROLE(userId);
            API_HELPERS.logRequest('PUT', endpoint, { roles });

            const response = await fetch(API_HELPERS.getFullUrl(endpoint), {
                method: "PUT",
                headers: API_HELPERS.getJsonHeaders(),
                credentials: 'include',
                body: JSON.stringify({ roles }),
            });

            await API_HELPERS.handleError(response);
            const data = await response.json();

            API_HELPERS.logResponse('PUT', endpoint, { success: !!data });
            return data;
        } catch (error) {
            console.error(`Error updating role for user #${userId}:`, error);
            throw error;
        }
    },

    // Order management endpoints
    async getOrders(page: number = 1, limit: number = 10): Promise<{ orders: Order[], total: number }> {
        try {
            const url = API_HELPERS.addQueryParams(
                API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.ADMIN.ORDERS.LIST),
                { page, limit }
            );

            API_HELPERS.logRequest('GET', url);

            const response = await fetch(url, {
                method: "GET",
                headers: API_HELPERS.getJsonHeaders(),
                credentials: 'include',
            });

            await API_HELPERS.handleError(response);
            const data = await response.json();

            API_HELPERS.logResponse('GET', url, { count: data.orders?.length, total: data.total });
            return data;
        } catch (error) {
            console.error("Error fetching orders:", error);
            throw error;
        }
    },

    async getOrderById(orderId: number): Promise<Order> {
        try {
            const endpoint = API_CONFIG.ENDPOINTS.ADMIN.ORDERS.DETAILS(orderId);
            API_HELPERS.logRequest('GET', endpoint);

            const response = await fetch(API_HELPERS.getFullUrl(endpoint), {
                method: "GET",
                headers: API_HELPERS.getJsonHeaders(),
                credentials: 'include',
            });

            await API_HELPERS.handleError(response);
            const data = await response.json();

            API_HELPERS.logResponse('GET', endpoint, { success: !!data });
            return data;
        } catch (error) {
            console.error(`Error fetching order #${orderId}:`, error);
            throw error;
        }
    },

    async updateOrderStatus(orderId: number, status: string): Promise<Order> {
        try {
            const endpoint = API_CONFIG.ENDPOINTS.ADMIN.ORDERS.UPDATE_STATUS(orderId);
            API_HELPERS.logRequest('PATCH', endpoint, { status });

            const response = await fetch(API_HELPERS.getFullUrl(endpoint), {
                method: "PATCH",
                headers: API_HELPERS.getJsonHeaders(),
                credentials: 'include',
                body: JSON.stringify({ status }),
            });

            await API_HELPERS.handleError(response);
            const data = await response.json();

            API_HELPERS.logResponse('PATCH', endpoint, { success: !!data });
            return data;
        } catch (error) {
            console.error(`Error updating order #${orderId} status:`, error);
            throw error;
        }
    },

    // Site settings endpoints
    async getSiteSettings(): Promise<SiteSettings> {
        try {
            API_HELPERS.logRequest('GET', API_CONFIG.ENDPOINTS.ADMIN.SETTINGS);

            const response = await fetch(API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.ADMIN.SETTINGS), {
                method: "GET",
                headers: API_HELPERS.getJsonHeaders(),
                credentials: 'include',
            });

            await API_HELPERS.handleError(response);
            const data = await response.json();

            API_HELPERS.logResponse('GET', API_CONFIG.ENDPOINTS.ADMIN.SETTINGS, { success: !!data });
            return data;
        } catch (error) {
            console.error("Error fetching site settings:", error);
            throw error;
        }
    },

    async updateSiteSettings(settings: SiteSettings): Promise<SiteSettings> {
        try {
            API_HELPERS.logRequest('PUT', API_CONFIG.ENDPOINTS.ADMIN.SETTINGS, settings);

            const response = await fetch(API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.ADMIN.SETTINGS), {
                method: "PUT",
                headers: API_HELPERS.getJsonHeaders(),
                credentials: 'include',
                body: JSON.stringify(settings),
            });

            await API_HELPERS.handleError(response);
            const data = await response.json();

            API_HELPERS.logResponse('PUT', API_CONFIG.ENDPOINTS.ADMIN.SETTINGS, { success: !!data });
            return data;
        } catch (error) {
            console.error("Error updating site settings:", error);
            throw error;
        }
    }
};