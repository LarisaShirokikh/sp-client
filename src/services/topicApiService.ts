import { Media, Reply, Topic } from "@/app/interface/topic";
import { API_CONFIG } from "@/lib/apiConfig";

export const TopicApiService = {
    async getAllTopics(params?: {
        skip?: number,
        limit?: number,
        categoryId?: number
    }): Promise<Topic[]> {
        const { skip = 0, limit = 100, categoryId } = params || {};

        // Construct URL with query parameters
        const url = new URL(`${API_CONFIG.BASE_URL}/forum/topic/all`);
        url.searchParams.append('skip', skip.toString());
        url.searchParams.append('limit', limit.toString());

        // Add category ID if provided
        if (categoryId !== undefined) {
            url.searchParams.append('category_id', categoryId.toString());
        }

        try {
            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Добавляем куки к запросу
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error fetching topics:", error);
            throw error;
        }
    },

    createTopic: async (formData: FormData): Promise<Topic> => {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/forum/topic/`, {
                method: "POST",
                body: formData, // Используем FormData для отправки файлов и данных
                credentials: 'include', // Добавляем куки к запросу
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

            return await response.json();
        } catch (error) {
            console.error("Ошибка создания темы:", error);
            throw error;
        }
    },

    // Если у вас есть другие методы, обновите их аналогично:
    getTopicById: async (topicId: number): Promise<Topic> => {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/forum/topic/${topicId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Добавляем куки к запросу
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error fetching topic:", error);
            throw error;
        }
    },

    async getTopicReplies(topicId: number | string): Promise<Reply[]> {
        const id = Number(topicId);
        if (isNaN(id)) throw new Error('Некорректный ID темы');

        const response = await fetch(`${API_CONFIG.BASE_URL}/forum/topic/${id}/replies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Ошибка получения ответов: ${response.status}`);
        }

        return await response.json();
    },

    async getTopicMedia(topicId: number | string): Promise<Media[]> {
        const id = Number(topicId);
        if (isNaN(id)) throw new Error('Некорректный ID темы');

        const response = await fetch(`${API_CONFIG.BASE_URL}/forum/topic/${id}/media`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Ошибка получения медиа: ${response.status}`);
        }

        return await response.json();
    },

    // Увеличение счетчика просмотров
    async incrementViewCount(topicId: number): Promise<void> {
        try {
            await fetch(`${API_CONFIG.BASE_URL}/forum/topic/${topicId}/view`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Добавляем куки для авторизации
            });
        } catch (error) {
            console.error('Ошибка при увеличении счетчика просмотров:', error);
            // Не прерываем выполнение из-за ошибки счетчика просмотров
        }
    },

    // Проверка, поставил ли пользователь лайк
    async checkTopicLike(topicId: number, userId: number): Promise<{ isLiked: boolean }> {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/forum/topic/${topicId}/like?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Добавляем куки для авторизации
            });

            if (!response.ok) {
                throw new Error('Ошибка при проверке лайка');
            }

            return response.json();
        } catch (error) {
            console.error('Ошибка при проверке лайка:', error);
            throw error;
        }
    },

    // Добавление лайка
    async likeTopic(topicId: number): Promise<void> {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/forum/topic/${topicId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Добавляем куки для авторизации
            });

            if (!response.ok) {
                throw new Error('Ошибка при добавлении лайка');
            }
        } catch (error) {
            console.error('Ошибка при добавлении лайка:', error);
            throw error;
        }
    },

    // Удаление лайка
    async unlikeTopic(topicId: number): Promise<void> {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/forum/topic/${topicId}/like`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Добавляем куки для авторизации
            });

            if (!response.ok) {
                throw new Error('Ошибка при удалении лайка');
            }
        } catch (error) {
            console.error('Ошибка при удалении лайка:', error);
            throw error;
        }
    },

    // НОВЫЕ МЕТОДЫ ДЛЯ РАБОТЫ С ОТВЕТАМИ И МЕДИА-ФАЙЛАМИ

    // Создание ответа с возможностью прикрепления медиа-файлов
    // Упрощенный метод createReply в TopicApiService
    async createReply(topicId: number, content: string, mediaFiles?: File[]): Promise<Reply> {
        try {
            // Проверяем наличие медиа-файлов
            if (!mediaFiles || mediaFiles.length === 0) {
                // Отправляем обычный текстовый ответ на эндпоинт без медиа (JSON)
                const response = await fetch(`${API_CONFIG.BASE_URL}/forum/topic/${topicId}/reply`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content }),
                    credentials: 'include',
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText || `Ошибка создания ответа: ${response.status}`);
                }

                return await response.json();
            } else {
                // Если есть медиа-файлы, используем FormData и отправляем на эндпоинт с медиа
                const formData = new FormData();
                formData.append('content', content);

                // Добавляем каждый файл в formData
                mediaFiles.forEach((file) => {
                    formData.append('media_files', file);
                });

                const response = await fetch(`${API_CONFIG.BASE_URL}/forum/topic/${topicId}/reply/with-media`, {
                    method: 'POST',
                    body: formData,
                    credentials: 'include',
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText || `Ошибка создания ответа с медиа: ${response.status}`);
                }

                return await response.json();
            }
        } catch (error) {
            console.error('Ошибка при создании ответа:', error);
            throw error;
        }
    },

    // Получение медиа-файлов для конкретного ответа
    async getReplyMedia(replyId: number): Promise<Media[]> {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/forum/reply/${replyId}/media`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `Ошибка получения медиа ответа: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Ошибка при получении медиа для ответа:', error);
            throw error;
        }
    },

    // Лайк ответа
    async likeReply(replyId: number): Promise<void> {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/forum/reply/${replyId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Ошибка при добавлении лайка к ответу');
            }
        } catch (error) {
            console.error('Ошибка при добавлении лайка к ответу:', error);
            throw error;
        }
    },

    // Удаление лайка ответа
    async unlikeReply(replyId: number): Promise<void> {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/forum/reply/${replyId}/like`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Ошибка при удалении лайка к ответу');
            }
        } catch (error) {
            console.error('Ошибка при удалении лайка к ответу:', error);
            throw error;
        }
    }
};