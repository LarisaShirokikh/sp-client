// components/NavLinks.tsx
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HolidayTheme } from '@/app/interface/holiday';

interface NavLinksProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  
}

export const NavLinks: React.FC<NavLinksProps> = ({ 
  activeSection, 
  setActiveSection,
}) => {
  const navItems = ['Совместные закупки', 'Форум', 'События', 'Блог'];
  
  return (
    <div className="hidden md:flex justify-center space-x-1 flex-1">
      {navItems.map((item) => (
        <motion.div key={item} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link 
            href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => setActiveSection(item)}
            className={`
              relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
              ${activeSection === item 
                ? `text-white bg-gradient-to-r ` 
                : 'text-gray-600 hover:text-pink-500 hover:bg-pink-50'
              }
            `}
          >
            {item}
            
            {/* Active section indicator */}
            {activeSection === item && (
              <motion.div 
                className="absolute -bottom-1 left-1/2 w-1 h-1 bg-white rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1] }}
                transition={{ duration: 0.3 }}
              />
            )}
          </Link>
        </motion.div>
      ))}
    </div>
  );
};