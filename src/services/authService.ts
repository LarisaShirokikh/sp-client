// app/services/authService.ts
import { API_CONFIG, API_HELPERS } from "@/lib/apiConfig";
import { UserData } from "@/app/interface/auth";

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterData {
    email: string;
    password: string;
    name: string;
    full_name?: string;
}

export const AuthService = {
    async login(credentials: LoginCredentials): Promise<{ token: string; user: UserData }> {
        try {
            API_HELPERS.logRequest('POST', API_CONFIG.ENDPOINTS.AUTH.LOGIN, { email: credentials.email });

            const response = await fetch(API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.AUTH.LOGIN), {
                method: "POST",
                headers: API_HELPERS.getJsonHeaders(),
                credentials: 'include',
                body: JSON.stringify(credentials),
            });

            await API_HELPERS.handleError(response);
            const data = await response.json();

            API_HELPERS.logResponse('POST', API_CONFIG.ENDPOINTS.AUTH.LOGIN, { success: !!data });
            return data;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    },

    async register(registerData: RegisterData): Promise<{ token: string; user: UserData }> {
        try {
            API_HELPERS.logRequest('POST', API_CONFIG.ENDPOINTS.AUTH.REGISTER, { email: registerData.email, name: registerData.name });

            const response = await fetch(API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.AUTH.REGISTER), {
                method: "POST",
                headers: API_HELPERS.getJsonHeaders(),
                credentials: 'include',
                body: JSON.stringify(registerData),
            });

            await API_HELPERS.handleError(response);
            const data = await response.json();

            API_HELPERS.logResponse('POST', API_CONFIG.ENDPOINTS.AUTH.REGISTER, { success: !!data });
            return data;
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    },

    async logout(): Promise<void> {
        try {
            API_HELPERS.logRequest('POST', API_CONFIG.ENDPOINTS.AUTH.LOGOUT);

            const response = await fetch(API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.AUTH.LOGOUT), {
                method: "POST",
                headers: API_HELPERS.getJsonHeaders(),
                credentials: 'include',
            });

            await API_HELPERS.handleError(response);

            API_HELPERS.logResponse('POST', API_CONFIG.ENDPOINTS.AUTH.LOGOUT, { success: true });
        } catch (error) {
            console.error("Logout error:", error);
            throw error;
        }
    },

    async getCurrentUser(): Promise<UserData> {
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
            console.error("Get current user error:", error);
            throw error;
        }
    },

    async refreshToken(): Promise<{ token: string }> {
        try {
            API_HELPERS.logRequest('POST', API_CONFIG.ENDPOINTS.AUTH.REFRESH_TOKEN);

            const response = await fetch(API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.AUTH.REFRESH_TOKEN), {
                method: "POST",
                headers: API_HELPERS.getJsonHeaders(),
                credentials: 'include',
            });

            await API_HELPERS.handleError(response);
            const data = await response.json();

            API_HELPERS.logResponse('POST', API_CONFIG.ENDPOINTS.AUTH.REFRESH_TOKEN, { success: !!data });
            return data;
        } catch (error) {
            console.error("Refresh token error:", error);
            throw error;
        }
    },

    async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
        try {
            API_HELPERS.logRequest('POST', API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });

            const response = await fetch(API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD), {
                method: "POST",
                headers: API_HELPERS.getJsonHeaders(),
                body: JSON.stringify({ email }),
            });

            await API_HELPERS.handleError(response);
            const data = await response.json();

            API_HELPERS.logResponse('POST', API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
            return data;
        } catch (error) {
            console.error("Forgot password error:", error);
            throw error;
        }
    },

    async resetPassword(token: string, password: string): Promise<{ success: boolean; message: string }> {
        try {
            API_HELPERS.logRequest('POST', API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD);

            const response = await fetch(API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD), {
                method: "POST",
                headers: API_HELPERS.getJsonHeaders(),
                body: JSON.stringify({ token, password }),
            });

            await API_HELPERS.handleError(response);
            const data = await response.json();

            API_HELPERS.logResponse('POST', API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD, { success: data.success });
            return data;
        } catch (error) {
            console.error("Reset password error:", error);
            throw error;
        }
    }
};