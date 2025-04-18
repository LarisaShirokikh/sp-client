// components/WishlistMenu.tsx
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { HolidayTheme } from '@/app/interface/holiday';



export const WishlistMenu: React.FC = () => {
  return (
    <div className="relative group">
      <button className="p-2 rounded-full text-gray-500 hover:text-pink-500 hover:bg-pink-50 relative">
        <Heart className="h-5 w-5" />
        <span className={`absolute -top-1 -right-1 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center bg-gradient-to-r`}>2</span>
      </button>
      
      {/* Dropdown wishlist */}
      <div className="absolute right-0 mt-2 w-64 origin-top-right scale-95 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 bg-white rounded-lg shadow-lg py-1 border border-gray-100 z-10">
        <div className="px-4 py-2 border-b border-gray-100">
          <h3 className="font-medium text-sm">Избранное</h3>
        </div>
        <div className="max-h-80 overflow-y-auto">
          <div className="px-4 py-2 hover:bg-pink-50 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded bg-gray-100 mr-2"></div>
              <div>
                <p className="text-sm">Детское питание</p>
                <p className="text-xs text-gray-500">1200 ₽</p>
              </div>
            </div>
          </div>
          <div className="px-4 py-2 hover:bg-pink-50">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded bg-gray-100 mr-2"></div>
              <div>
                <p className="text-sm">Игрушка развивающая</p>
                <p className="text-xs text-gray-500">890 ₽</p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-2 border-t border-gray-100">
          <Link href="/wishlist" className="text-sm text-pink-500 hover:underline">Все избранное</Link>
        </div>
      </div>
    </div>
  );
};