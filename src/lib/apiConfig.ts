// lib/apiConfig.ts
export const API_CONFIG = {
  // Make sure BASE_URL always ends WITHOUT a trailing slash
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",

  TIMEOUT: 15000,
  ENABLE_LOGGING: process.env.NODE_ENV === 'development',
  // Настройки ретраев запросов при ошибках сети
  RETRY: {
    MAX_RETRIES: 2,        // Максимальное количество повторных попыток
    RETRY_DELAY: 1000,     // Задержка между попытками (мс)
    RETRY_STATUS_CODES: [  // HTTP коды, при которых нужно делать ретрай
      408, // Request Timeout
      429, // Too Many Requests
      500, // Internal Server Error
      502, // Bad Gateway
      503, // Service Unavailable
      504  // Gateway Timeout
    ]
  },

  // Эндпоинты для удобства
  ENDPOINTS: {
    // Аутентификация и пользователи
    AUTH: {
      LOGIN: '/auth/login/email',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH_TOKEN: '/auth/refresh-token',
      RESET_PASSWORD: '/auth/reset-password',
      FORGOT_PASSWORD: '/auth/forgot-password',
    },

    USERS: {
      PROFILE: '/users/me',
      UPDATE_PROFILE: '/users/me',
      CHANGE_PASSWORD: '/users/me/password',
      NOTIFICATIONS_SETTINGS: '/users/me/notifications-settings'
    },

    // Группбай (закупки)
    GROUP_BUY: {
      // Базовые операции
      LIST: '/group-buys',
      MY_LIST: '/group-buys/my',
      DETAILS: (id: string | number) => `/group-buys/${id}`,
      CREATE: '/group-buys',
      UPDATE: (id: string | number) => `/group-buys/${id}`,
      DELETE: (id: string | number) => `/group-buys/${id}`,

      // Панель организатора
      STATS: '/group-buys/stats',
      NOTIFICATIONS: '/group-buys/notifications',
      EXPORT: '/group-buys/export',

      // Продукты в закупках
      PRODUCTS: {
        LIST: (groupBuyId: string | number) => `/group-buys/${groupBuyId}/products`,
        DETAILS: (groupBuyId: string | number, productId: string | number) =>
          `/group-buys/${groupBuyId}/products/${productId}`,
        CREATE: (groupBuyId: string | number) => `/group-buys/${groupBuyId}/products`,
        UPDATE: (groupBuyId: string | number, productId: string | number) =>
          `/group-buys/${groupBuyId}/products/${productId}`,
        DELETE: (groupBuyId: string | number, productId: string | number) =>
          `/group-buys/${groupBuyId}/products/${productId}`
      },

      // Участники закупок
      PARTICIPANTS: {
        LIST: (groupBuyId: string | number) => `/group-buys/${groupBuyId}/participants`,
        INVITE: (groupBuyId: string | number) => `/group-buys/${groupBuyId}/invite`
      },

      // Комментарии к закупкам
      COMMENTS: {
        LIST: (groupBuyId: string | number) => `/group-buys/${groupBuyId}/comments`,
        CREATE: (groupBuyId: string | number) => `/group-buys/${groupBuyId}/comments`,
        UPDATE: (groupBuyId: string | number, commentId: string | number) =>
          `/group-buys/${groupBuyId}/comments/${commentId}`,
        DELETE: (groupBuyId: string | number, commentId: string | number) =>
          `/group-buys/${groupBuyId}/comments/${commentId}`
      }
    },

    // Заказы
    ORDERS: {
      LIST: '/orders',
      MY_ORDERS: '/orders/my',
      DETAILS: (id: string | number) => `/orders/${id}`,
      CREATE: '/orders',
      UPDATE: (id: string | number) => `/orders/${id}`,
      CANCEL: (id: string | number) => `/orders/${id}/cancel`,
      PAY: (id: string | number) => `/orders/${id}/pay`,
      CONFIRM: (id: string | number) => `/orders/${id}/confirm`
    },

    // Платежи
    PAYMENTS: {
      LIST: '/payments',
      DETAILS: (id: string | number) => `/payments/${id}`,
      CREATE: '/payments',
      METHODS: '/payments/methods',
      VERIFY: (id: string | number) => `/payments/${id}/verify`
    },

    // Административная панель
    ADMIN: {
      DASHBOARD: {
        STATS: '/admin/dashboard/stats',
        ACTIVITIES: '/admin/activities'
      },
      USERS: {
        LIST: '/admin/users',
        DETAILS: (id: string | number) => `/admin/users/${id}`,
        CREATE: '/admin/users',
        UPDATE: (id: string | number) => `/admin/users/${id}`,
        DELETE: (id: string | number) => `/admin/users/${id}`,
        CHANGE_ROLE: (id: string | number) => `/admin/users/${id}/role`,
        UPDATE_STATUS: (id: string | number) => `/admin/users/${id}/status`
      },
      GROUP_BUYS: {
        LIST: '/admin/group-buys',
        DETAILS: (id: string | number) => `/admin/group-buys/${id}`,
        UPDATE_STATUS: (id: string | number) => `/admin/group-buys/${id}/status`,
        DELETE: (id: string | number) => `/admin/group-buys/${id}`
      },
      ORDERS: {
        LIST: '/admin/orders',
        DETAILS: (id: string | number) => `/admin/orders/${id}`,
        UPDATE_STATUS: (id: string | number) => `/admin/orders/${id}/status`
      },
      SETTINGS: '/admin/settings',
      CONTENT: '/admin/content'
    },

    // Форум
    FORUM: {
      CATEGORIES: '/forum/categories',
      CATEGORY: (id: string | number) => `/forum/categories/${id}`,
      TOPICS: {
        LIST: '/forum/topics',
        DETAILS: (id: string | number) => `/forum/topics/${id}`,
        CREATE: '/forum/topics',
        UPDATE: (id: string | number) => `/forum/topics/${id}`,
        DELETE: (id: string | number) => `/forum/topics/${id}`,
        VIEW: (id: string | number) => `/forum/topics/${id}/view`,
        LIKE: (id: string | number) => `/forum/topics/${id}/like`,
        ALL: '/forum/topic/all', // Legacy endpoint
        REPLIES: (id: string | number) => `/forum/topics/${id}/replies`,
        MEDIA: (id: string | number) => `/forum/topics/${id}/media`
      },
      REPLIES: {
        CREATE: (topicId: string | number) => `/forum/topics/${topicId}/reply`,
        CREATE_WITH_MEDIA: (topicId: string | number) => `/forum/topics/${topicId}/reply/with-media`,
        LIKE: (id: string | number) => `/forum/reply/${id}/like`,
        MEDIA: (id: string | number) => `/forum/reply/${id}/media`
      }
    }
  }
};

// Хелперы для работы с API
export const API_HELPERS = {
  // Формирует URL с базовым адресом API
  getFullUrl: (endpoint: string): string => {
    // Убедимся, что endpoint всегда начинается со слеша
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${API_CONFIG.BASE_URL}${normalizedEndpoint}`;
  },

  // Добавляет параметры запроса (query string) к URL
  addQueryParams: (url: string, params: Record<string, any>): string => {
    // Проверим, все ли в порядке с URL
    if (!url || typeof url !== 'string') {
      console.error('Invalid URL provided to addQueryParams:', url);
      return url;
    }

    try {
      const urlObj = new URL(url);
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          urlObj.searchParams.append(key, String(value));
        }
      });
      return urlObj.toString();
    } catch (error) {
      console.error('Error adding query params to URL:', error);
      // Fallback to simple string concatenation
      const queryString = Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
        .join('&');

      return queryString ? `${url}${url.includes('?') ? '&' : '?'}${queryString}` : url;
    }
  },

  // Обрабатывает обычные ошибки HTTP-запросов
  handleError: async (response: Response): Promise<any> => {
    if (!response.ok) {
      try {
        // Пытаемся распарсить JSON с деталями ошибки
        const errorData = await response.json();
        const error = new Error(errorData.message || `HTTP error! status: ${response.status}`);
        Object.assign(error, { status: response.status, data: errorData });
        throw error;
      } catch (e) {
        // Если не получилось распарсить JSON, создаем стандартную ошибку
        if (e instanceof SyntaxError) {
          const error = new Error(`HTTP error! status: ${response.status}`);
          Object.assign(error, { status: response.status });
          throw error;
        }
        throw e;
      }
    }
    return response;
  },

  // Получаем стандартные HTTP заголовки для JSON
  getJsonHeaders: () => ({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }),

  // Логирование запросов в режиме разработки
  logRequest: (method: string, url: string, body?: any) => {
    if (API_CONFIG.ENABLE_LOGGING) {
      console.log(`API Request: ${method} ${url}`);
      if (body) console.log('Request Body:', body);
    }
  },

  // Логирование ответов в режиме разработки
  logResponse: (method: string, url: string, response: any) => {
    if (API_CONFIG.ENABLE_LOGGING) {
      console.log(`API Response: ${method} ${url}`, response);
    }
  }
};

// Экспортируем типы для хорошей типизации
export type ApiEndpoints = typeof API_CONFIG.ENDPOINTS;