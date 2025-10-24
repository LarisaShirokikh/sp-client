"use client";

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Activity } from '@/services/adminApiService';

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities = [] }: RecentActivityProps) {
  const [filter, setFilter] = useState<'all' | 'success' | 'warning' | 'error' | 'info'>('all');

  // Function to format the timestamp
  const formatTime = (timestamp: string): string => {
    if (!timestamp) return '';

    try {
      // Convert timestamp to Date object
      const date = new Date(timestamp);
      return formatDistanceToNow(date, { addSuffix: true, locale: ru });
    } catch (error) {
      console.error('Error formatting date:', error);
      return timestamp; // Return the original string if there's an error
    }
  };

  // Filter activities based on selected filter
  const filteredActivities = filter === 'all'
    ? activities
    : activities.filter(activity => activity.type === filter);

  // Get activity icon based on type
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'success':
        return (
          <div className="p-1 rounded-full bg-green-100 text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="p-1 rounded-full bg-yellow-100 text-yellow-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="p-1 rounded-full bg-red-100 text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'info':
        return (
          <div className="p-1 rounded-full bg-blue-100 text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="p-1 rounded-full bg-gray-100 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-medium">Последние действия</h2>

        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-2 py-1 text-xs rounded ${filter === 'all'
              ? 'bg-gray-200 text-gray-800'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            Все
          </button>
          <button
            onClick={() => setFilter('success')}
            className={`px-2 py-1 text-xs rounded ${filter === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            Успех
          </button>
          <button
            onClick={() => setFilter('warning')}
            className={`px-2 py-1 text-xs rounded ${filter === 'warning'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            Предупреждения
          </button>
          <button
            onClick={() => setFilter('error')}
            className={`px-2 py-1 text-xs rounded ${filter === 'error'
              ? 'bg-red-100 text-red-800'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            Ошибки
          </button>
        </div>
      </div>

      <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
        {filteredActivities.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredActivities.map((activity, index) => (
              <li key={activity.id || index} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                        {formatTime(activity.timestamp)}
                      </p>
                    </div>

                    {activity.user && (
                      <p className="text-xs text-gray-500 mt-1">
                        Пользователь: {typeof activity.user === 'object' ? activity.user.name : activity.user}
                      </p>
                    )}

                    {activity.details && (
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.details}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-2 text-gray-500">Пока нет действий для отображения</p>
          </div>
        )}
      </div>

      {filteredActivities.length > 0 && (
        <div className="p-4 border-t bg-gray-50">
          <button
            className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
            onClick={() => {/* Navigate to full activity log */ }}
          >
            Посмотреть все активности
          </button>
        </div>
      )}
    </div>
  );
}