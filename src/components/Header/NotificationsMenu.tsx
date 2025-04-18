// components/NotificationsMenu.tsx
import Link from 'next/link';
import { Bell } from 'lucide-react';



export const NotificationsMenu: React.FC = () => {
  return (
    <div className="relative group">
      <button className="p-2 rounded-full text-gray-500 hover:text-pink-500 hover:bg-pink-50 relative">
        <Bell className="h-5 w-5" />
        <span className={`absolute -top-1 -right-1 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center bg-gradient-to-r `}>3</span>
      </button>
      
      {/* Dropdown notifications */}
      <div className="absolute right-0 mt-2 w-64 origin-top-right scale-95 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 bg-white rounded-lg shadow-lg py-1 border border-gray-100 z-10">
        <div className="px-4 py-2 border-b border-gray-100">
          <h3 className="font-medium text-sm">Уведомления</h3>
        </div>
        <div className="max-h-80 overflow-y-auto">
          <div className="px-4 py-2 hover:bg-pink-50 border-b border-gray-100">
            <p className="text-xs text-gray-500">Сегодня</p>
            <p className="text-sm">Ваш заказ №12345 отправлен</p>
          </div>
          <div className="px-4 py-2 hover:bg-pink-50 border-b border-gray-100">
            <p className="text-xs text-gray-500">Вчера</p>
            <p className="text-sm">Новый ответ в теме "Выбор коляски"</p>
          </div>
          <div className="px-4 py-2 hover:bg-pink-50">
            <p className="text-xs text-gray-500">20.03.2025</p>
            <p className="text-sm">Скидка 15% на товары для детей</p>
          </div>
        </div>
        <div className="px-4 py-2 border-t border-gray-100">
          <Link href="/notifications" className="text-sm text-pink-500 hover:underline">Все уведомления</Link>
        </div>
      </div>
    </div>
  );
};