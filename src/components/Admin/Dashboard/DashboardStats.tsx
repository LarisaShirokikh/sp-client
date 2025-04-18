"use client";

export function DashboardStats({ stats }) {
  const defaultStats = {
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0,
    totalOrders: 0,
    ...stats
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Всего пользователей</h3>
        <p className="text-2xl font-semibold">{defaultStats.totalUsers}</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Активные пользователи</h3>
        <p className="text-2xl font-semibold">{defaultStats.activeUsers}</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Новые пользователи</h3>
        <p className="text-2xl font-semibold">{defaultStats.newUsers}</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Всего заказов</h3>
        <p className="text-2xl font-semibold">{defaultStats.totalOrders}</p>
      </div>
    </div>
  );
}