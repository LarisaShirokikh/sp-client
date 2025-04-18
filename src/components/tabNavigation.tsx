"use client";

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', name: 'Обзор' },
    { id: 'purchases', name: 'Закупки' },
    { id: 'products', name: 'Товары' },
    { id: 'activity', name: 'Активность' }
  ];

  return (
    <div className="mt-6">
      <div className="sm:hidden">
        <select 
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" 
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${activeTab === tab.id ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;