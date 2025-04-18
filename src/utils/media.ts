// utils/media.ts

export const getMediaUrl = (path?: string): string | null => {
    if (!path) return null;
  
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
    // Убираем ведущий слеш, если есть, и добавляем /media
    const normalized = path.startsWith('/') ? path.slice(1) : path;
  
    return `${baseUrl}/media/${normalized}`;
  };