// src/components/Cards/EventCard.tsx
interface Event {
    id: string;
    title: string;
    date: string;
    imageUrl: string;
    location: string;
    attendees: number;
  }
  
  interface EventCardProps {
    event: Event;
  }
  
  const EventCard = ({ event }: EventCardProps) => {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col">
        <div className="relative">
          <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-3">
            <span className="text-white font-medium px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm">
              {event.date}
            </span>
          </div>
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex items-center mb-2">
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Мероприятие</span>
          </div>
          <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <span className="mr-1">📍</span> {event.location}
          </div>
          <div className="text-sm text-gray-500 mb-3">
            <span className="mr-1">👥</span> {event.attendees} участников
          </div>
          <button className="mt-auto w-full bg-gradient-to-r from-pink-500 to-rose-400 hover:bg-pink-700 text-white py-2 rounded-md">
            Принять участие
          </button>
        </div>
      </div>
    );
  };
  
  export default EventCard;
  