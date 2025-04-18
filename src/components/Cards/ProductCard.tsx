// components/ProductCard.tsx
import Link from 'next/link';
import { Heart, Star, ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  imageUrl: string;
  seller: string;
}

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isFavorite, onToggleFavorite }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="relative">
        <Link href={`/product/${product.id}`}>
          <div className="aspect-square overflow-hidden bg-gray-100">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            />
          </div>
        </Link>
        <button
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-pink-50"
          onClick={onToggleFavorite}
        >
          <Heart
            className={`h-5 w-5 ${isFavorite ? 'fill-pink-500 text-pink-500' : 'text-gray-400'}`}
          />
        </button>
        {/* {product.discount && (
          <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            -{product.discount}%
          </span>
        )} */}
      </div>
      <div className="p-4">
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="text-sm font-medium text-gray-800 hover:text-pink-600 mb-1 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 mb-2">Организатор: {product.seller}</p>
        <div className="flex items-center mb-2">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="font-semibold text-gray-800">
              {product.price.toLocaleString()} ₽
            </div>
            {product.originalPrice && (
              <div className="text-xs text-gray-500 line-through">
                {product.originalPrice.toLocaleString()} ₽
              </div>
            )}
          </div>
          <button className="p-2 bg-pink-100 rounded-full text-pink-600 hover:bg-pink-200">
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;