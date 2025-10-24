// services/UsersApiService.ts
import { API_CONFIG, API_HELPERS } from "@/lib/apiConfig";

export interface UserData {
    id: number;
    name: string;
    email: string;
    full_name?: string;
    phone?: string;
    is_active: boolean;
    is_verified: boolean;
    is_superuser: boolean;
    roles: string[];
    avatar_url?: string;
    created_at: string;
    description?: string;
    rating?: number;
    followers_count?: number;
    following_count?: number;
}

export const UsersApiService = {
    // Получение списка пользователей
    async getUsers(page: number = 1, limit: number = 10, search?: string): Promise<{ users: UserData[], total: number }> {
        try {
            const params: Record<string, any> = { page, limit };
            if (search) {
                params.search = search;
            }

            const url = API_HELPERS.addQueryParams(
                API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.ADMIN.USERS.LIST),
                params
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

    // Получение данных конкретного пользователя
    async getUserById(userId: number): Promise<UserData> {
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

    // Обновление ролей пользователя
    async updateUserRoles(userId: number, roles: string[]): Promise<UserData> {
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
            console.error(`Error updating roles for user #${userId}:`, error);
            throw error;
        }
    },

    // Обновление статуса активности пользователя
    async updateUserStatus(userId: number, isActive: boolean): Promise<UserData> {
        try {
            const endpoint = API_CONFIG.ENDPOINTS.ADMIN.USERS.UPDATE_STATUS(userId);
            API_HELPERS.logRequest('PATCH', endpoint, { is_active: isActive });

            const response = await fetch(API_HELPERS.getFullUrl(endpoint), {
                method: "PATCH",
                headers: API_HELPERS.getJsonHeaders(),
                credentials: 'include',
                body: JSON.stringify({ is_active: isActive }),
            });

            await API_HELPERS.handleError(response);
            const data = await response.json();

            API_HELPERS.logResponse('PATCH', endpoint, { success: !!data });
            return data;
        } catch (error) {
            console.error(`Error updating status for user #${userId}:`, error);
            throw error;
        }
    },

    // Обновление данных пользователя
    async updateUser(userId: number, userData: Partial<UserData>): Promise<UserData> {
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

    // Получение профиля текущего пользователя
    async getCurrentUserProfile(): Promise<UserData> {
        try {
            API_HELPERS.logRequest('GET', API_CONFIG.ENDPOINTS.USERS.PROFILE);

            const response = await fetch(API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.USERS.PROFILE), {
                method: "GET",
                headers: API_HELPERS.getJsonHeaders(),
                credentials: 'include',
            });

            await API_HELPERS.handleError(response);
            const data = await response.json();

            API_HELPERS.logResponse('GET', API_CONFIG.ENDPOINTS.USERS.PROFILE, { success: !!data });
            return data;
        } catch (error) {
            console.error('Error fetching current user profile:', error);
            throw error;
        }
    },

    // Обновление профиля текущего пользователя
    async updateCurrentUserProfile(userData: Partial<UserData>): Promise<UserData> {
        try {
            API_HELPERS.logRequest('PUT', API_CONFIG.ENDPOINTS.USERS.UPDATE_PROFILE, userData);

            const response = await fetch(API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.USERS.UPDATE_PROFILE), {
                method: "PUT",
                headers: API_HELPERS.getJsonHeaders(),
                credentials: 'include',
                body: JSON.stringify(userData),
            });

            await API_HELPERS.handleError(response);
            const data = await response.json();

            API_HELPERS.logResponse('PUT', API_CONFIG.ENDPOINTS.USERS.UPDATE_PROFILE, { success: !!data });
            return data;
        } catch (error) {
            console.error('Error updating current user profile:', error);
            throw error;
        }
    },

    // Смена пароля текущего пользователя
    async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
        try {
            API_HELPERS.logRequest('POST', API_CONFIG.ENDPOINTS.USERS.CHANGE_PASSWORD);

            const response = await fetch(API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.USERS.CHANGE_PASSWORD), {
                method: "POST",
                headers: API_HELPERS.getJsonHeaders(),
                credentials: 'include',
                body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
            });

            await API_HELPERS.handleError(response);
            const data = await response.json();

            API_HELPERS.logResponse('POST', API_CONFIG.ENDPOINTS.USERS.CHANGE_PASSWORD, { success: data.success });
            return data;
        } catch (error) {
            console.error('Error changing password:', error);
            throw error;
        }
    },

    // Обновление настроек уведомлений
    async updateNotificationSettings(settings: any): Promise<{ success: boolean; settings: any }> {
        try {
            API_HELPERS.logRequest('PUT', API_CONFIG.ENDPOINTS.USERS.NOTIFICATIONS_SETTINGS, settings);

            const response = await fetch(API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.USERS.NOTIFICATIONS_SETTINGS), {
                method: "PUT",
                headers: API_HELPERS.getJsonHeaders(),
                credentials: 'include',
                body: JSON.stringify(settings),
            });

            await API_HELPERS.handleError(response);
            const data = await response.json();

            API_HELPERS.logResponse('PUT', API_CONFIG.ENDPOINTS.USERS.NOTIFICATIONS_SETTINGS, { success: data.success });
            return data;
        } catch (error) {
            console.error('Error updating notification settings:', error);
            throw error;
        }
    }
};