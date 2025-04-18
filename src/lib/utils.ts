// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMediaUrl(path?: string): string {

  if (!path) {
    return '/avatar.png';
  }

  // Если уже абсолютный URL
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Получаем base URL из .env
  const baseUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL || 'http://localhost:8000';

  // Убираем возможные слэши в начале пути
  const cleanPath = path.replace(/^\/+/, '');

  // Проверяем, нужно ли добавить /media/ к пути
  if (cleanPath.startsWith('media/')) {
    const pathWithoutMedia = cleanPath.replace(/^media\//, '');
    const result = `${baseUrl}/media/${pathWithoutMedia}`;
    return result;
  }

  // Добавляем /media/ к пути
  const result = `${baseUrl}/media/${cleanPath}`;
  return result;
}