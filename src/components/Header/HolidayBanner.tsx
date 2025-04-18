// components/HolidayBanner.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { HolidayTheme } from '@/app/interface/holiday';

interface HolidayBannerProps {
  holiday: HolidayTheme;
}

export const HolidayBanner: React.FC<HolidayBannerProps> = ({ holiday }) => {
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  if (!isBannerVisible) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className={`${holiday.bgGradient} w-full`}
    >
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xl">{holiday.icon}</span>
          <p className="text-sm font-medium">{holiday.bannerText}</p>
        </div>
        <button 
          onClick={() => setIsBannerVisible(false)}
          className="p-1 rounded-full hover:bg-white/20 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};