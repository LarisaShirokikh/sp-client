// CoverPhoto.tsx - Компонент для фонового изображения
import Image from 'next/image';
import { Camera } from 'lucide-react';
import { CoverPhotoProps } from '@/app/interface/profile';

export default function CoverPhoto({
  coverPhotoUrl,
  onChangeCover,
  userData
}: CoverPhotoProps) {
  const mediaUrl = process.env.NEXT_PUBLIC_MEDIA_URL || "http://localhost:8000";
  // Only create the full URL if userData?.cover_photo exists
  const fullCoverUrl = userData?.cover_photo ? `${mediaUrl}/media/${userData.cover_photo}` : null;
  
  return (
    <div className="relative w-full h-48 ">
      {fullCoverUrl && (
        <Image
          src={fullCoverUrl}
          alt="Cover Photo"
          fill
          priority
          className="rounded-xl shadow-md "
        />
      )}
      
      {/* <div className="absolute top-0 left-0 w-full">
        <h1 className="text-center text-xl font-bold p-4">Личный кабинет</h1>
      </div> */}
      
      {/* Button container with a high z-index */}
      <div className="absolute bottom-4 right-4 z-10">
        <button 
          onClick={onChangeCover}
          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        >
          <Camera size={20} />
        </button>
      </div>
    </div>
  );
}