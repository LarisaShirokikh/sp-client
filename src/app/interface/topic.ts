import { UserData } from "./auth";

// Интерфейс для категории форума
export interface Category {
    id: number;
    name: string;
    description?: string;
    icon?: string;
    color?: string;
    created_at: string;
    updated_at: string;
}

// Интерфейс для автора (пользователя)
export interface Author {
    id: number;
    name: string;
    avatar_url?: string;
    role?: string;
}

// Интерфейс для темы форума
export interface Topic {
    id: number;
    title: string;
    content: string;
    user_id: number | null;  // Обратите внимание на изменение с author_id на user_id
    created_at: string;
    updated_at: string;
    view_count: number;
    reply_count: number;
    like_count: number;
    dislike_count: number;
    save_count: number;
    is_pinned: boolean;
    is_locked: boolean;
    last_reply_at: string | null;
    tags: any[];
    files: any[];
    // Добавим после обработки
    author?: UserData;
    category?: Category;
}

// Интерфейс для создания новой темы
export interface CreateTopicData {
    title: string;
    content: string;
    category_id: number;
    media_files?: File[];
}

// Интерфейс для ответа на тему
export interface Reply {
    id: number;
    topic_id: number;
    content: string;
    author_id: number;
    created_at: string;
    updated_at: string;
    like_count: number;
    author?: Author;
    media?: Media[];
}

// Интерфейс для создания ответа
export interface CreateReplyData {
    topic_id: number;
    content: string;
    media_files?: File[];
}

export interface Media {
    name: string;
    type: any;
    id: number;
    topic_id: number;
    reply_id?: number;
    file_path: string;
    file_name: string;
    file_type: 'image' | 'video' | 'document' | 'pdf';
    file_size?: number;     // Размер файла в байтах
    mime_type?: string;     // MIME-тип файла
    created_at: string;

    // Клиентские поля для удобства
    url?: string;           // URL для доступа к файлу
    thumbnail_url?: string; // URL превью для видео
    description?: string;   // Описание файла

    // Совместимость с FormData API
    filename?: string;
}