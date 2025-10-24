"use client";

import React from 'react';

interface LoaderProps {
    size?: 'small' | 'medium' | 'large';
    color?: 'primary' | 'secondary' | 'white';
    className?: string;
}

export function Loader({ size = 'medium', color = 'primary', className = '' }: LoaderProps) {
    // Определение размеров для разных вариантов
    const sizeClasses = {
        small: 'h-4 w-4 border-2',
        medium: 'h-8 w-8 border-2',
        large: 'h-12 w-12 border-3',
    };

    // Определение цветов для разных вариантов
    const colorClasses = {
        primary: 'border-blue-500',
        secondary: 'border-gray-500',
        white: 'border-white',
    };

    // Базовые классы для анимации загрузки
    const baseClasses = 'animate-spin rounded-full border-t-transparent';

    return (
        <div className={`flex justify-center items-center ${className}`}>
            <div
                className={`${baseClasses} ${sizeClasses[size]} ${colorClasses[color]}`}
                role="status"
                aria-label="Загрузка"
            >
                <span className="sr-only">Загрузка...</span>
            </div>
        </div>
    );
}

// Альтернативные варианты лоадеров, которые можно использовать в разных ситуациях
export function DotsLoader({ className = '' }: { className?: string }) {
    return (
        <div className={`flex space-x-2 ${className}`}>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
    );
}

export function LinearLoader({ className = '', progress = -1 }: { className?: string; progress?: number }) {
    // Если progress = -1, показываем бесконечную анимацию
    // Иначе показываем прогресс от 0 до 100%

    if (progress >= 0 && progress <= 100) {
        return (
            <div className={`w-full h-1 bg-gray-200 rounded-full overflow-hidden ${className}`}>
                <div
                    className="h-full bg-blue-500 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        );
    }

    return (
        <div className={`w-full h-1 bg-gray-200 rounded-full overflow-hidden ${className}`}>
            <div className="h-full bg-blue-500 animate-linearLoading" />
        </div>
    );
}

// Можно добавить в tailwind.config.js для LinearLoader анимацию:
// animations: {
//   linearLoading: {
//     '0%': { width: '0%', marginLeft: '-10%' },
//     '50%': { width: '30%', marginLeft: '30%' },
//     '100%': { width: '10%', marginLeft: '100%' }
//   }
// }