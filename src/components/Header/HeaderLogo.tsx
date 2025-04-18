// components/Header/HeaderLogo.tsx
import Link from 'next/link';
import { motion } from 'framer-motion';



export const HeaderLogo: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Link href="/" className="flex items-center">
        
          <img src="/images/logo.svg" alt="Все мамы" className="h-8" />
        
        <span className="ml-2 font-bold text-gray-800 text-lg hidden sm:inline-block">
          Все мамы
        </span>
      </Link>
    </motion.div>
  );
};