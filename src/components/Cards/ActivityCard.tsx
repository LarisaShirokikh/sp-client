// src/components/Cards/ActivityCard.tsx
interface Activity {
    id: string;
    title: string;
    author: string;
    authorAvatar: string;
    timestamp: string;
    type: 'post' | 'question' | 'comment';
  }
  
  interface ActivityCardProps {
    activity: Activity;
  }
  
  const ActivityCard = ({ activity }: ActivityCardProps) => {
    // Определим цвет фона и иконку в зависимости от типа активности
    const getTypeInfo = (type: string) => {
      switch(type) {
        case 'post':
          return { 
            label: 'Публикация', 
            bgColor: 'bg-green-100', 
            textColor: 'text-green-800',
            icon: '📝'
          };
        case 'question':
          return { 
            label: 'Вопрос', 
            bgColor: 'bg-blue-100', 
            textColor: 'text-blue-800',
            icon: '❓'
          };
        case 'comment':
          return { 
            label: 'Комментарий', 
            bgColor: 'bg-purple-100', 
            textColor: 'text-purple-800',
            icon: '💬'
          };
        default:
          return { 
            label: 'Активность', 
            bgColor: 'bg-gray-100', 
            textColor: 'text-gray-800',
            icon: '📌'
          };
      }
    };
  
    const typeInfo = getTypeInfo(activity.type);
  
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col">
        <div className={`${typeInfo.bgColor} p-4 flex items-center`}>
          <span className="text-2xl mr-2">{typeInfo.icon}</span>
          <span className={`${typeInfo.textColor} font-medium`}>{typeInfo.label}</span>
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-semibold text-lg mb-3">{activity.title}</h3>
          <div className="mt-auto flex items-center">
            <img src={activity.authorAvatar} alt={activity.author} className="w-8 h-8 rounded-full" />
            <div className="ml-2">
              <p className="text-sm font-medium">{activity.author}</p>
              <p className="text-xs text-gray-500">{activity.timestamp}</p>
            </div>
          </div>
        </div>
        <div className="px-4 pb-4 flex justify-between border-t pt-3">
          <button className="text-gray-500 hover:text-gray-700 text-sm">Ответить</button>
          <button className="text-gray-500 hover:text-gray-700 text-sm">Подробнее</button>
        </div>
      </div>
    );
  };
  
  export default ActivityCard;