import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'md',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Обработка клика вне модального окна для закрытия
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Обработка нажатия ESC для закрытия
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Блокировка прокрутки страницы, когда модальное окно открыто
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  // Не рендерим ничего, если модальное окно закрыто
  if (!isOpen) return null;

  // Определение максимальной ширины
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    'full': 'max-w-full',
  }[maxWidth];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/10 backdrop-blur-sm transition-opacity">
      <div 
        ref={modalRef}
        className={`relative mx-auto rounded-lg bg-white shadow-xl transition-all ${maxWidthClasses} w-full`}
      >
        {/* Заголовок модального окна */}
        {title && (
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h3 className="text-lg font-medium">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <span className="sr-only">Закрыть</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Содержимое модального окна */}
        <div className={title ? '' : 'pt-5'}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;