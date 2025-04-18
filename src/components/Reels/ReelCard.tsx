// components/ReelCard.tsx
import { Heart, MessageSquare } from 'lucide-react';

interface Reel {
  id: number;
  videoUrl: string;
  title: string;
  author: string;
  thumbnail: string;
  likes?: number;
  comments?: number;
  caption?: string;
}

interface ReelCardProps {
  reel: Reel
}

const ReelCard: React.FC<ReelCardProps> = ({ reel }) => (
  <div className="relative bg-black rounded-lg overflow-hidden">
    <video
      src={reel.videoUrl}
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
      poster={reel.thumbnail}
    >
      Ваш браузер не поддерживает видео.
    </video>
    {/* Оверлей с информацией */}
    <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black via-transparent">
      <div>
        <h3 className="text-m text-white">{reel.title}</h3>
        <p className="text-xs text-gray-100">{reel.author}</p>
        {reel.caption && (
          <p className="mt-2 text-sm text-gray-200">{reel.caption}</p>
        )}
      </div>
      <div className="flex items-center mt-4 space-x-4">
        <div className="flex items-center space-x-1">
          <Heart className="h-5 w-5 text-pink-500" />
          <span className="text-sm text-white">{reel.likes ?? 0}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MessageSquare className="h-5 w-5 text-white" />
          <span className="text-sm text-white">{reel.comments ?? 0}</span>
        </div>
      </div>
    </div>
  </div>
);

export default ReelCard;