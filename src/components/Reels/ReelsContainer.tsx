// src/components/Reels/ReelsContainer.tsx
"use client"
import { useState, useRef } from 'react';
import ReelItem from './ReelItem';
import ReelsControls from './ReelsControls';

interface Reel {
  id: string;
  videoUrl: string;
  author: string;
  title: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

const ReelsContainer = () => {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const reels: Reel[] = [
    {
      id: '1',
      videoUrl: '/api/placeholder/300/500',
      author: 'Мама_Эксперт',
      title: 'Как научить ребенка самостоятельности',
      likes: 145,
      comments: 23,
      isLiked: false
    },
    {
      id: '2',
      videoUrl: '/api/placeholder/300/500',
      author: 'ДетскаяКухня',
      title: 'Быстрый и полезный завтрак для детей',
      likes: 327,
      comments: 56,
      isLiked: false
    },
    {
      id: '3',
      videoUrl: '/api/placeholder/300/500',
      author: 'ПсихологМам',
      title: 'Как справиться с детскими истериками',
      likes: 412,
      comments: 89,
      isLiked: false
    },
    {
      id: '4',
      videoUrl: '/api/placeholder/300/500',
      author: 'МодныйМалыш',
      title: 'Тренды детской моды 2025',
      likes: 278,
      comments: 45,
      isLiked: false
    }
  ];

  const handlePrevReel = () => {
    setCurrentReelIndex(prev => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextReel = () => {
    setCurrentReelIndex(prev => (prev < reels.length - 1 ? prev + 1 : prev));
  };

  const handleLikeToggle = (reelId: string) => {
    // In a real app, you would update this in your state management solution
    console.log(`Toggle like for reel: ${reelId}`);
  };

  return (
    <div className="w-full py-6">
      <h2 className="text-2xl font-bold mb-4">Популярные Рилсы</h2>
      
      <div className="relative">
        <div 
          ref={containerRef}
          className="flex overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollBehavior: 'smooth',
            scrollSnapType: 'x mandatory'
          }}
        >
          {reels.map((reel, index) => (
            <ReelItem 
              key={reel.id}
              reel={reel}
              isActive={index === currentReelIndex}
              onLikeToggle={() => handleLikeToggle(reel.id)}
            />
          ))}
        </div>
        
        <ReelsControls 
          onPrevClick={handlePrevReel}
          onNextClick={handleNextReel}
          hasPrev={currentReelIndex > 0}
          hasNext={currentReelIndex < reels.length - 1}
        />
      </div>
    </div>
  );
};

export default ReelsContainer;