"use client";

export function RecentActivity({ activities = [] }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-medium mb-4">Последние действия</h2>
      
      {activities.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {activities.map((activity, index) => (
            <li key={index} className="py-3">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className={`inline-block h-2 w-2 rounded-full ${
                    activity.type === 'error' ? 'bg-red-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">Пока нет действий для отображения</p>
      )}
    </div>
  );
}