// services/ForumApiService.ts
import { Category, Topic, Reply, Media } from "@/app/interface/topic";
import { API_CONFIG, API_HELPERS } from "@/lib/apiConfig";

export const ForumApiService = {
  // Получение всех категорий форума
  async getCategories(): Promise<Category[]> {
    try {
      API_HELPERS.logRequest('GET', API_CONFIG.ENDPOINTS.FORUM.CATEGORIES);

      const response = await fetch(API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.FORUM.CATEGORIES), {
        method: "GET",
        headers: API_HELPERS.getJsonHeaders(),
        credentials: 'include',
      });

      await API_HELPERS.handleError(response);
      const data = await response.json();

      API_HELPERS.logResponse('GET', API_CONFIG.ENDPOINTS.FORUM.CATEGORIES, { count: data.length });
      return data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  // Получение категории по ID
  async getCategoryById(categoryId: number): Promise<Category> {
    try {
      const endpoint = API_CONFIG.ENDPOINTS.FORUM.CATEGORY(categoryId);
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
      console.error(`Error fetching category #${categoryId}:`, error);
      throw error;
    }
  },

  // Получение списка тем
  async getAllTopics(params?: {
    skip?: number,
    limit?: number,
    categoryId?: number
  }): Promise<Topic[]> {
    try {
      const { skip = 0, limit = 100, categoryId } = params || {};

      // Используем helper для добавления query параметров
      const url = API_HELPERS.addQueryParams(
        API_HELPERS.getFullUrl(API_CONFIG.ENDPOINTS.FORUM.TOPICS.ALL),
        { skip, limit, category_id: categoryId }
      );

      API_HELPERS.logRequest('GET', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: API_HELPERS.getJsonHeaders(),
        credentials: 'include',
      });

      await API_HELPERS.handleError(response);
      const data = await response.json();

      API_HELPERS.logResponse('GET', url, { count: data.length });
      return data;
    } catch (error) {
      console.error("Error fetching topics:", error);
      throw error;
    }
  },

  // Создание новой темы
  async createTopic(formData: FormData): Promise<Topic> {
    try {
      const endpoint = API_CONFIG.ENDPOINTS.FORUM.TOPICS.CREATE;
      API_HELPERS.logRequest('POST', endpoint, 'FormData content');

      const response = await fetch(API_HELPERS.getFullUrl(endpoint), {
        method: "POST",
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorText = await response.text();

        switch (response.status) {
          case 401:
            throw new Error("Необходима авторизация: Пожалуйста, войдите снова");
          case 403:
            throw new Error("Доступ запрещен: У вас нет необходимых прав");
          default:
            throw new Error(errorText || "Не удалось создать тему");
        }
      }

      const data = await response.json();
      API_HELPERS.logResponse('POST', endpoint, { success: !!data, id: data?.id });
      return data;
    } catch (error) {
      console.error("Ошибка создания темы:", error);
      throw error;
    }
  },

  // Получение темы по ID
  async getTopicById(topicId: number): Promise<Topic> {
    try {
      const endpoint = API_CONFIG.ENDPOINTS.FORUM.TOPICS.DETAILS(topicId);
      API_HELPERS.logRequest('GET', endpoint);

      const response = await fetch(API_HELPERS.getFullUrl(endpoint), {
        method: 'GET',
        headers: API_HELPERS.getJsonHeaders(),
        credentials: 'include',
      });

      await API_HELPERS.handleError(response);
      const data = await response.json();

      API_HELPERS.logResponse('GET', endpoint, { success: !!data });
      return data;
    } catch (error) {
      console.error("Error fetching topic:", error);
      throw error;
    }
  },

  // Получение всех ответов для темы
  async getTopicReplies(topicId: number | string): Promise<Reply[]> {
    try {
      const id = Number(topicId);
      if (isNaN(id)) throw new Error('Некорректный ID темы');

      const endpoint = API_CONFIG.ENDPOINTS.FORUM.TOPICS.REPLIES(id);
      API_HELPERS.logRequest('GET', endpoint);

      const response = await fetch(API_HELPERS.getFullUrl(endpoint), {
        method: 'GET',
        headers: API_HELPERS.getJsonHeaders(),
        credentials: 'include',
      });

      await API_HELPERS.handleError(response);
      const data = await response.json();

      API_HELPERS.logResponse('GET', endpoint, { count: data.length });
      return data;
    } catch (error) {
      console.error('Ошибка получения ответов:', error);
      throw error;
    }
  },

  // Получение медиа-файлов темы
  async getTopicMedia(topicId: number | string): Promise<Media[]> {
    try {
      const id = Number(topicId);
      if (isNaN(id)) throw new Error('Некорректный ID темы');

      const endpoint = API_CONFIG.ENDPOINTS.FORUM.TOPICS.MEDIA(id);
      API_HELPERS.logRequest('GET', endpoint);

      const response = await fetch(API_HELPERS.getFullUrl(endpoint), {
        method: 'GET',
        headers: API_HELPERS.getJsonHeaders(),
        credentials: 'include',
      });

      await API_HELPERS.handleError(response);
      const data = await response.json();

      API_HELPERS.logResponse('GET', endpoint, { count: data.length });
      return data;
    } catch (error) {
      console.error('Ошибка получения медиа:', error);
      throw error;
    }
  },

  // Увеличение счетчика просмотров
  async incrementViewCount(topicId: number): Promise<void> {
    try {
      const endpoint = API_CONFIG.ENDPOINTS.FORUM.TOPICS.VIEW(topicId);
      API_HELPERS.logRequest('POST', endpoint);

      const response = await fetch(API_HELPERS.getFullUrl(endpoint), {
        method: 'POST',
        headers: API_HELPERS.getJsonHeaders(),
        credentials: 'include',
      });

      await API_HELPERS.handleError(response);
      API_HELPERS.logResponse('POST', endpoint, { success: true });
    } catch (error) {
      console.error('Ошибка при увеличении счетчика просмотров:', error);
      // Не прерываем выполнение из-за ошибки счетчика просмотров
    }
  },

  // Проверка, поставил ли пользователь лайк
  async checkTopicLike(topicId: number, userId: number): Promise<{ isLiked: boolean }> {
    try {
      const endpoint = API_CONFIG.ENDPOINTS.FORUM.TOPICS.LIKE(topicId);
      const url = API_HELPERS.addQueryParams(API_HELPERS.getFullUrl(endpoint), { userId });
      API_HELPERS.logRequest('GET', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: API_HELPERS.getJsonHeaders(),
        credentials: 'include',
      });

      await API_HELPERS.handleError(response);
      const data = await response.json();

      API_HELPERS.logResponse('GET', url, data);
      return data;
    } catch (error) {
      console.error('Ошибка при проверке лайка:', error);
      throw error;
    }
  },

  // Добавление лайка
  async likeTopic(topicId: number): Promise<void> {
    try {
      const endpoint = API_CONFIG.ENDPOINTS.FORUM.TOPICS.LIKE(topicId);
      API_HELPERS.logRequest('POST', endpoint);

      const response = await fetch(API_HELPERS.getFullUrl(endpoint), {
        method: 'POST',
        headers: API_HELPERS.getJsonHeaders(),
        credentials: 'include',
      });

      await API_HELPERS.handleError(response);
      API_HELPERS.logResponse('POST', endpoint, { success: true });
    } catch (error) {
      console.error('Ошибка при добавлении лайка:', error);
      throw error;
    }
  },

  // Удаление лайка
  async unlikeTopic(topicId: number): Promise<void> {
    try {
      const endpoint = API_CONFIG.ENDPOINTS.FORUM.TOPICS.LIKE(topicId);
      API_HELPERS.logRequest('DELETE', endpoint);

      const response = await fetch(API_HELPERS.getFullUrl(endpoint), {
        method: 'DELETE',
        headers: API_HELPERS.getJsonHeaders(),
        credentials: 'include',
      });

      await API_HELPERS.handleError(response);
      API_HELPERS.logResponse('DELETE', endpoint, { success: true });
    } catch (error) {
      console.error('Ошибка при удалении лайка:', error);
      throw error;
    }
  },

  // Создание ответа с возможностью прикрепления медиа-файлов
  async createReply(topicId: number, content: string, mediaFiles?: File[]): Promise<Reply> {
    try {
      // Проверяем наличие медиа-файлов
      if (!mediaFiles || mediaFiles.length === 0) {
        // Отправляем обычный текстовый ответ на эндпоинт без медиа (JSON)
        const endpoint = API_CONFIG.ENDPOINTS.FORUM.REPLIES.CREATE(topicId);
        API_HELPERS.logRequest('POST', endpoint, { content });

        const response = await fetch(API_HELPERS.getFullUrl(endpoint), {
          method: 'POST',
          headers: API_HELPERS.getJsonHeaders(),
          body: JSON.stringify({ content }),
          credentials: 'include',
        });

        await API_HELPERS.handleError(response);
        const data = await response.json();

        API_HELPERS.logResponse('POST', endpoint, { success: !!data, id: data?.id });
        return data;
      } else {
        // Если есть медиа-файлы, используем FormData и отправляем на эндпоинт с медиа
        const endpoint = API_CONFIG.ENDPOINTS.FORUM.REPLIES.CREATE_WITH_MEDIA(topicId);
        API_HELPERS.logRequest('POST', endpoint, { content, filesCount: mediaFiles.length });

        const formData = new FormData();
        formData.append('content', content);

        // Добавляем каждый файл в formData
        mediaFiles.forEach((file) => {
          formData.append('media_files', file);
        });

        const response = await fetch(API_HELPERS.getFullUrl(endpoint), {
          method: 'POST',
          body: formData,
          credentials: 'include',
        });

        await API_HELPERS.handleError(response);
        const data = await response.json();

        API_HELPERS.logResponse('POST', endpoint, { success: !!data, id: data?.id });
        return data;
      }
    } catch (error) {
      console.error('Ошибка при создании ответа:', error);
      throw error;
    }
  },

  // Получение медиа-файлов для конкретного ответа
  async getReplyMedia(replyId: number): Promise<Media[]> {
    try {
      const endpoint = API_CONFIG.ENDPOINTS.FORUM.REPLIES.MEDIA(replyId);
      API_HELPERS.logRequest('GET', endpoint);

      const response = await fetch(API_HELPERS.getFullUrl(endpoint), {
        method: 'GET',
        headers: API_HELPERS.getJsonHeaders(),
        credentials: 'include',
      });

      await API_HELPERS.handleError(response);
      const data = await response.json();

      API_HELPERS.logResponse('GET', endpoint, { count: data.length });
      return data;
    } catch (error) {
      console.error('Ошибка при получении медиа для ответа:', error);
      throw error;
    }
  },

  // Лайк ответа
  async likeReply(replyId: number): Promise<void> {
    try {
      const endpoint = API_CONFIG.ENDPOINTS.FORUM.REPLIES.LIKE(replyId);
      API_HELPERS.logRequest('POST', endpoint);

      const response = await fetch(API_HELPERS.getFullUrl(endpoint), {
        method: 'POST',
        headers: API_HELPERS.getJsonHeaders(),
        credentials: 'include',
      });

      await API_HELPERS.handleError(response);
      API_HELPERS.logResponse('POST', endpoint, { success: true });
    } catch (error) {
      console.error('Ошибка при добавлении лайка к ответу:', error);
      throw error;
    }
  },

  // Удаление лайка ответа
  async unlikeReply(replyId: number): Promise<void> {
    try {
      const endpoint = API_CONFIG.ENDPOINTS.FORUM.REPLIES.LIKE(replyId);
      API_HELPERS.logRequest('DELETE', endpoint);

      const response = await fetch(API_HELPERS.getFullUrl(endpoint), {
        method: 'DELETE',
        headers: API_HELPERS.getJsonHeaders(),
        credentials: 'include',
      });

      await API_HELPERS.handleError(response);
      API_HELPERS.logResponse('DELETE', endpoint, { success: true });
    } catch (error) {
      console.error('Ошибка при удалении лайка к ответу:', error);
      throw error;
    }
  }
};