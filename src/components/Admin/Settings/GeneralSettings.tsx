import React, { useState } from 'react';

export const GeneralSettings: React.FC = () => {
  const [siteName, setSiteName] = useState('Ваш интернет-магазин');
  const [siteDescription, setSiteDescription] = useState('Лучшие товары по лучшим ценам');
  const [contactEmail, setContactEmail] = useState('contact@example.com');
  const [contactPhone, setContactPhone] = useState('+7 (999) 123-45-67');
  const [logoUrl, setLogoUrl] = useState('/images/logo.png');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Здесь будет запрос к API для сохранения настроек
      await new Promise(resolve => setTimeout(resolve, 1000)); // Имитация запроса
      alert('Настройки успешно сохранены');
    } catch (error) {
      console.error('Ошибка при сохранении настроек:', error);
      alert('Произошла ошибка при сохранении настроек');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-gray-800">Общие настройки</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
            Название сайта
          </label>
          <input
            type="text"
            id="siteName"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700">
            Описание сайта
          </label>
          <textarea
            id="siteDescription"
            value={siteDescription}
            onChange={(e) => setSiteDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
              Контактный email
            </label>
            <input
              type="email"
              id="contactEmail"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
              Контактный телефон
            </label>
            <input
              type="text"
              id="contactPhone"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700">
            URL логотипа
          </label>
          <div className="mt-1 flex items-center">
            <input
              type="text"
              id="logoUrl"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {logoUrl && (
              <div className="ml-4 h-12 w-12 flex-shrink-0">
                <img src={logoUrl} alt="Логотип" className="h-full w-full object-contain" />
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isLoading ? 'Сохранение...' : 'Сохранить настройки'}
          </button>
        </div>
      </form>
    </div>
  );
};