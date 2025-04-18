// components/CartMenu.tsx
import Link from 'next/link';
import { ShoppingCart, X } from 'lucide-react';
import { HolidayTheme } from '@/app/interface/holiday';



export const CartMenu: React.FC = () => {
  return (
    <div className="relative group">
      <button className="p-2 rounded-full text-gray-500 hover:text-pink-500 hover:bg-pink-50 relative">
        <ShoppingCart className="h-5 w-5" />
        <span className={`absolute -top-1 -right-1 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center bg-gradient-to-r `}>4</span>
      </button>
      
      {/* Dropdown cart */}
      <div className="absolute right-0 mt-2 w-72 origin-top-right scale-95 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 bg-white rounded-lg shadow-lg py-1 border border-gray-100 z-10">
        <div className="px-4 py-2 border-b border-gray-100">
          <h3 className="font-medium text-sm">Корзина (4)</h3>
        </div>
        <div className="max-h-80 overflow-y-auto">
          <div className="px-4 py-2 hover:bg-pink-50 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded bg-gray-100 mr-2"></div>
              <div className="flex-1">
                <p className="text-sm">Подгузники</p>
                <p className="text-xs text-gray-500">1 × 1500 ₽</p>
              </div>
              <button className="text-gray-400 hover:text-pink-500">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="px-4 py-2 hover:bg-pink-50 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded bg-gray-100 mr-2"></div>
              <div className="flex-1">
                <p className="text-sm">Бутылочка</p>
                <p className="text-xs text-gray-500">2 × 450 ₽</p>
              </div>
              <button className="text-gray-400 hover:text-pink-500">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="px-4 py-2 hover:bg-pink-50 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded bg-gray-100 mr-2"></div>
              <div className="flex-1">
                <p className="text-sm">Игрушка</p>
                <p className="text-xs text-gray-500">1 × 900 ₽</p>
              </div>
              <button className="text-gray-400 hover:text-pink-500">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="px-4 py-2 hover:bg-pink-50">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded bg-gray-100 mr-2"></div>
              <div className="flex-1">
                <p className="text-sm">Крем детский</p>
                <p className="text-xs text-gray-500">1 × 350 ₽</p>
              </div>
              <button className="text-gray-400 hover:text-pink-500">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="px-4 py-2 border-t border-gray-100">
          <div className="flex justify-between py-1">
            <span className="text-sm">Итого:</span>
            <span className="text-sm font-medium">3200 ₽</span>
          </div>
          <Link 
            href="/cart" 
            className={`block w-full text-center bg-gradient-to-r  text-white py-2 px-4 rounded-full text-sm font-medium mt-2`}
          >
            Оформить заказ
          </Link>
        </div>
      </div>
    </div>
  );
};