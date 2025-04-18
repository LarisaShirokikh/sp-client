// src/components/auth/SocialLogin.tsx
import { FcGoogle } from 'react-icons/fc';
import { FaVk } from 'react-icons/fa';
import { SiMaildotru } from 'react-icons/si';

export const SocialLogin = () => {
  return (
    <div className="space-y-4 mt-6">
      <div className="relative flex items-center">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-sm">или продолжить через</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <button 
          className="flex justify-center items-center h-12 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
          type="button"
        >
          <FcGoogle className="text-xl" />
        </button>
        <button 
          className="flex justify-center items-center h-12 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
          type="button"
        >
          <FaVk className="text-xl text-blue-600" />
        </button>
        <button 
          className="flex justify-center items-center h-12 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
          type="button"
        >
          <SiMaildotru className="text-xl text-orange-500" />
        </button>
      </div>
    </div>
  );
};