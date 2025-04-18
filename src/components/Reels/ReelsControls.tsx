// src/components/Reels/ReelsControls.tsx
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ReelsControlsProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const ReelsControls = ({ 
  onPrevClick, 
  onNextClick, 
  hasPrev, 
  hasNext 
}: ReelsControlsProps) => {
  return (
    <>
      {hasPrev && (
        <button 
          onClick={onPrevClick}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md"
          aria-label="Previous reel"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
      )}
      
      {hasNext && (
        <button 
          onClick={onNextClick}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md"
          aria-label="Next reel"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
      )}
    </>
  );
};

export default ReelsControls;