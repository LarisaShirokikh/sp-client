// src/components/Reels/ReelItem.tsx
"use client"
import { Heart, MessageCircle, Share2 } from 'lucide-react';

interface Reel {
  id: string;
  videoUrl: string;
  author: string;
  title: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

interface ReelItemProps {
  reel: Reel;
  isActive: boolean;
  onLikeToggle: () => void;
}

const ReelItem = ({ reel, isActive, onLikeToggle }: ReelItemProps) => {
  return (
    <div 
      className={`min-w-[300px] h-[500px] rounded-lg overflow-hidden snap-start mr-4 relative ${
        isActive ? 'ring-2 ring-pink-500' : ''
      }`}
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Video placeholder (in a real app, this would be a video player) */}
      <div 
        className="w-full h-full bg-gray-200 flex items-center justify-center"
        style={{
          backgroundImage: `url(${reel.videoUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
      </div>
      
      {/* Overlay content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
        <h3 className="font-bold text-lg">{reel.title}</h3>
        <p className="text-sm opacity-80 mb-3">@{reel.author}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onLikeToggle}
              className="flex items-center space-x-1"
            >
              <Heart 
                className={`w-5 h-5 ${reel.isLiked ? 'fill-pink-500 text-pink-500' : ''}`} 
              />
              <span>{reel.likes}</span>
            </button>
            
            <button className="flex items-center space-x-1">
              <MessageCircle className="w-5 h-5" />
              <span>{reel.comments}</span>
            </button>
            
            <button className="flex items-center">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelItem;