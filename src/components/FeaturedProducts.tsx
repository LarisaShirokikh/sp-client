// components/FeaturedProducts.tsx
"use client"
import Link from 'next/link';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { useMemo, useState } from 'react';
import ProductCard from './Cards/ProductCard';
import ReelCard from './Reels/ReelCard';

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

interface Reel {
    id: number;
    videoUrl: string;
    title: string;
    author: string;
    thumbnail: string;
  }

type FeedItem = { type: 'product'; data: Product } | { type: 'reel'; data: Reel };

const shuffleArray = <T,>(arr: T[]) => arr.sort(() => Math.random() - 0.5);

const FeaturedProducts: React.FC = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<number[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: 'Детский комбинезон "Пушистик"',
      price: 1890,
      originalPrice: 2490,
      discount: 24,
      rating: 4.8,
      imageUrl: 'https://ae01.alicdn.com/kf/Sfe246b7c41824c4e953bc2f6eeb3e789a.jpg',
      seller: 'КидсШоп'
    },
    {
      id: 2,
      name: 'Развивающий коврик "Лесные друзья"',
      price: 3290,
      rating: 4.7,
      imageUrl: 'https://www.ivd.ru/uploads/59c3b29b56a33.jpg',
      seller: 'БебиТойс'
    },
    {
      id: 3,
      name: 'Набор для кормления малыша',
      price: 990,
      originalPrice: 1290,
      discount: 23,
      rating: 4.5,
      imageUrl: 'https://ae01.alicdn.com/kf/S8bcd8583e42c4339ab18df1b048aa35d5.jpg',
      seller: 'МамаМаркет'
    },
    {
      id: 4,
      name: 'Музыкальная погремушка "Зайка"',
      price: 540,
      rating: 4.9,
      imageUrl: 'https://i-igrushki.ru/upload/iblock/ea7/7o5anv5efzcdgh0egq9uoxsz86fi3nkb.jpg',
      seller: 'ТойЛэнд'
    }
  ];

  const reels: Reel[] = [
    {
      id: 101,
      videoUrl: 'https://www.example.com/video1.mp4',
      title: 'Идеи для детской комнаты',
      author: 'MamaTips',
      thumbnail: 'https://www.example.com/thumb1.jpg',
    },
    {
      id: 102,
      videoUrl: 'https://www.example.com/video2.mp4',
      title: 'Утренняя зарядка с малышом',
      author: 'FitMom',
      thumbnail: 'https://www.example.com/thumb2.jpg',
    }
  ];

  const feedItems = useMemo(() => shuffleArray([
    ...products.map(p => ({ type: 'product', data: p } as FeedItem)),
    ...reels.map(r => ({ type: 'reel', data: r } as FeedItem))
  ]), []);

  const toggleFavorite = (productId: number) => {
    setFavoriteProducts(prev => prev.includes(productId)
      ? prev.filter(id => id !== productId)
      : [...prev, productId]);
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Популярное</h2>
        <Link href="/shop" className="text-pink-500 hover:text-pink-600 text-sm">
          Смотреть все
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {feedItems.map(item => item.type === 'product' ? (
          <ProductCard
            key={item.data.id}
            product={item.data}
            isFavorite={favoriteProducts.includes(item.data.id)}
            onToggleFavorite={() => toggleFavorite(item.data.id)}
          />
        ) : (
          <ReelCard key={item.data.id} reel={item.data} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;