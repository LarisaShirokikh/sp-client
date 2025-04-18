import React from 'react';

const DashboardLoading: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Скелетон для Header */}
      <div className="bg-white shadow-sm w-full p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="h-8 w-32 bg-gray-200 animate-pulse rounded"></div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-gray-200 animate-pulse rounded-full"></div>
            <div className="h-5 w-24 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Скелетон для приветствия */}
        <div className="mb-8">
          <div className="h-8 w-64 bg-gray-200 animate-pulse rounded mb-2"></div>
          <div className="h-4 w-48 bg-gray-200 animate-pulse rounded"></div>
        </div>
        
        {/* Скелетон для карточек статистики */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
              <div className="flex justify-between items-start mb-4">
                <div className="h-5 w-20 bg-gray-200 rounded"></div>
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              </div>
              <div className="h-8 w-24 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
        
        {/* Скелетон для табов */}
        <div className="bg-white rounded-lg shadow-md mt-8">
          <div className="border-b">
            <div className="flex p-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-6 w-24 bg-gray-200 animate-pulse rounded"></div>
              ))}
            </div>
          </div>
          
          <div className="p-6">
            {/* Скелетон для содержимого табов */}
            <div className="space-y-6">
              <div className="h-5 w-48 bg-gray-200 animate-pulse rounded mb-4"></div>
              
              {/* Скелетон карточек */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2].map((item) => (
                  <div key={item} className="bg-gray-50 p-4 rounded-lg animate-pulse">
                    <div className="flex gap-4">
                      <div className="h-16 w-16 bg-gray-200 rounded"></div>
                      <div className="flex-1">
                        <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Скелетон для таблицы активности */}
              <div className="mt-8">
                <div className="h-5 w-32 bg-gray-200 animate-pulse rounded mb-4"></div>
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center gap-3 p-3 border-b animate-pulse">
                      <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 w-48 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 w-24 bg-gray-200 rounded"></div>
                      </div>
                      <div className="h-6 w-16 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Скелетон для Footer */}
      <div className="bg-white shadow-sm w-full p-6 mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between items-center">
            <div className="h-5 w-40 bg-gray-200 animate-pulse rounded mb-2"></div>
            <div className="flex gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-4 w-4 bg-gray-200 animate-pulse rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLoading;