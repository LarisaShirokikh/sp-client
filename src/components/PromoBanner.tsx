// components/PromoBanner.tsx
import Link from 'next/link';

interface PromoBannerProps {
  title: string;
  description: string;
  imageUrl: string;
  bgColor?: string;
  textColor?: string;
  buttonText?: string;
  buttonLink?: string;
}

const PromoBanner: React.FC<PromoBannerProps> = ({
  title,
  description,
  imageUrl,
  bgColor = 'bg-pink-100',
  textColor = 'text-pink-800',
  buttonText = 'Подробнее',
  buttonLink = '/promo'
}) => {
  return (
    <div className={`overflow-hidden rounded-xl shadow-sm ${bgColor}`}>
      <div className="grid md:grid-cols-2 items-center">
        <div className="p-6 md:p-8">
          <h2 className={`text-2xl font-bold ${textColor} mb-3`}>{title}</h2>
          <p className={`${textColor} opacity-80 mb-6`}>{description}</p>
          <Link 
            href={buttonLink}
            className="bg-white hover:bg-opacity-90 text-pink-600 font-medium py-2 px-6 rounded-full inline-block shadow-sm"
          >
            {buttonText}
          </Link>
        </div>
        <div className="overflow-hidden h-48 md:h-full">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover" 
          />
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;