// components/SearchBox.tsx
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <motion.div 
      className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg p-2 border border-gray-100 z-10"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Искать товары, темы, события..."
          className="w-full py-2 px-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-500">
          <Search className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};