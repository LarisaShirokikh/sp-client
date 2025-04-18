import Link from 'next/link';
import { Calendar, MapPin, Clock } from 'lucide-react';

const events = [
  {
    id: 1,
    title: "Семинар по грудному вскармливанию",
    date: "25 марта 2025",
    time: "15:00 - 17:00",
    location: "Онлайн",
    imageUrl: "https://ippss.ru/images/article/content/214a5bf835e535da3ff3781c55f49807.webp",
    category: "Здоровье"
  },
  {
    id: 2,
    title: "Мастер-класс по детской кулинарии",
    date: "2 апреля 2025",
    time: "12:00 - 14:00",
    location: "Кулинарная студия 'Вкусняшка'",
    imageUrl: "https://sxodim.com/uploads/posts/2023/11/16/optimized/ba554f018adc608975f06c458a052c9b_545x305-q-85.jpg",
    category: "Мастер-класс"
  },
  {
    id: 3,
    title: "Встреча с психологом: Детские капризы",
    date: "10 апреля 2025",
    time: "18:00 - 20:00",
    location: "Онлайн",
    imageUrl: "https://img.7ya.ru/pub/img/28732/1200depositphotos_680226504_l.webp",
    category: "Психология"
  }
];

const UpcomingEvents = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-900">Ближайшие мероприятия</h2>
        <Link href="/events" className="text-purple-600 hover:text-purple-800 font-medium">
          Все мероприятия
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={event.imageUrl} 
                alt={event.title} 
                className="w-full h-40 object-cover"
              />
              <span className="absolute top-3 right-3 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
                {event.category}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 text-purple-900">{event.title}</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <Calendar size={16} className="mr-2" />
                <span className="text-sm">{event.date}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <Clock size={16} className="mr-2" />
                <span className="text-sm">{event.time}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin size={16} className="mr-2" />
                <span className="text-sm">{event.location}</span>
              </div>
              <Link 
                href={`/events/${event.id}`}
                className="block w-full bg-purple-100 hover:bg-purple-200 text-purple-800 text-center py-2 rounded transition-colors"
              >
                Записаться
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;