"use client";

import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    siblingCount?: number;
}

export function Pagination({
    currentPage,
    totalItems,
    pageSize,
    onPageChange,
    siblingCount = 1,
}: PaginationProps) {
    // Рассчитываем количество страниц
    const totalPages = Math.ceil(totalItems / pageSize);

    // Не показываем пагинацию, если всего одна страница
    if (totalPages <= 1) return null;

    // Функция для генерации диапазона чисел
    const range = (start: number, end: number) => {
        const length = end - start + 1;
        return Array.from({ length }, (_, idx) => idx + start);
    };

    // Создает массив для отображения страниц
    const generatePagination = () => {
        // Если у нас меньше 7 страниц, показываем все
        if (totalPages <= 7) {
            return range(1, totalPages);
        }

        // Рассчитываем левый и правый разделители
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

        // Нужно ли показывать многоточие
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

        // Первая и последняя страницы всегда показываются
        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        // Если нет левых точек, но есть правые
        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount;
            const leftRange = range(1, leftItemCount);
            return [...leftRange, '...', totalPages];
        }

        // Если есть левые точки, но нет правых
        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount;
            const rightRange = range(totalPages - rightItemCount + 1, totalPages);
            return [firstPageIndex, '...', ...rightRange];
        }

        // Если есть и левые, и правые точки
        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
        }
    };

    const pages = generatePagination();

    // Кнопка страницы
    const PageButton = ({ page, isActive, onClick }: { page: number | string; isActive: boolean; onClick?: () => void }) => {
        if (page === '...') {
            return (
                <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300">
                    ...
                </span>
            );
        }

        return (
            <button
                onClick={onClick}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${isActive
                    ? 'z-10 bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                    : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
                    } border focus:z-20 focus:outline-none`}
            >
                {page}
            </button>
        );
    };

    return (
        <nav className="flex justify-center">
            <ul className="flex items-center">
                {/* Кнопка "Предыдущая" */}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border ${currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300'
                            : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
                            } text-sm font-medium focus:z-20 focus:outline-none`}
                    >
                        <span className="sr-only">Предыдущая</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </li>

                {/* Номера страниц */}
                {pages?.map((page, index) => (
                    <li key={index}>
                        <PageButton
                            page={page}
                            isActive={page === currentPage}
                            onClick={() => typeof page === 'number' && onPageChange(page)}
                        />
                    </li>
                ))}

                {/* Кнопка "Следующая" */}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border ${currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300'
                            : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
                            } text-sm font-medium focus:z-20 focus:outline-none`}
                    >
                        <span className="sr-only">Следующая</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    );
}