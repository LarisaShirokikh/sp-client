import React from 'react';

const PurchaseTab = () => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Мои закупки</h3>
        <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Новая закупка
        </button>
      </div>
      <div className="p-6">
        <p className="text-center text-gray-500">Выберите этот раздел для отображения закупок</p>
      </div>
    </div>
  );
};

export default PurchaseTab;