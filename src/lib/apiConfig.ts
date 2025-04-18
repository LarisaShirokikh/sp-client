// lib/apiConfig.ts
export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
    
    // Эндпоинты для удобства
    ENDPOINTS: {
      LOGIN: '/auth/login/email',
      REGISTER: '/auth/register',
      USER_PROFILE: '/users/me',
      LOGOUT: '/auth/logout',
      
      // Добавьте другие эндпоинты по необходимости
    },
  
    // Методы для работы с API
    getFullUrl: (endpoint: string) => `${API_CONFIG.BASE_URL}${endpoint}`,
  };