"use client";

import { useState } from 'react';
import { toast } from 'sonner';

export function CustomizationSettings({ initialSettings = {} }) {
  const [settings, setSettings] = useState({
    primaryColor: '#3b82f6', // blue-500
    secondaryColor: '#10b981', // emerald-500
    fontFamily: 'system-ui',
    fontSize: 'medium',
    borderRadius: 'medium',
    enableDarkMode: true,
    logoUrl: '',
    faviconUrl: '',
    customCSS: '',
    ...initialSettings
  });

  const [logoFile, setLogoFile] = useState(null);
  const [faviconFile, setFaviconFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (!file) return;

    if (fileType === 'logo') {
      setLogoFile(file);
    } else if (fileType === 'favicon') {
      setFaviconFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would save the settings to your backend
    // You would also handle file uploads
    console.log('Saving customization settings:', settings);
    console.log('Logo file:', logoFile);
    console.log('Favicon file:', faviconFile);

    // Mock success message
    toast.success('Настройки оформления успешно сохранены');
  };

  const fontFamilies = [
    { value: 'system-ui', label: 'Системный шрифт' },
    { value: 'serif', label: 'Serif' },
    { value: 'sans-serif', label: 'Sans Serif' },
    { value: 'monospace', label: 'Monospace' },
    { value: 'cursive', label: 'Cursive' }
  ];

  const fontSizes = [
    { value: 'small', label: 'Мелкий' },
    { value: 'medium', label: 'Средний' },
    { value: 'large', label: 'Крупный' }
  ];

  const borderRadiuses = [
    { value: 'none', label: 'Без скругления' },
    { value: 'small', label: 'Небольшое' },
    { value: 'medium', label: 'Среднее' },
    { value: 'large', label: 'Большое' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium mb-4">Настройки оформления</h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-4">Цвета</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700">
                  Основной цвет
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="color"
                    name="primaryColor"
                    id="primaryColor"
                    value={settings.primaryColor}
                    onChange={handleChange}
                    className="w-8 h-8 rounded-md cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.primaryColor}
                    onChange={handleChange}
                    name="primaryColor"
                    className="ml-2 block border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700">
                  Дополнительный цвет
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="color"
                    name="secondaryColor"
                    id="secondaryColor"
                    value={settings.secondaryColor}
                    onChange={handleChange}
                    className="w-8 h-8 rounded-md cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.secondaryColor}
                    onChange={handleChange}
                    name="secondaryColor"
                    className="ml-2 block border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium text-gray-700 mb-4">Типографика и стиль</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="fontFamily" className="block text-sm font-medium text-gray-700">
                  Шрифт
                </label>
                <select
                  id="fontFamily"
                  name="fontFamily"
                  value={settings.fontFamily}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {fontFamilies.map(font => (
                    <option key={font.value} value={font.value}>{font.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700">
                  Размер шрифта
                </label>
                <select
                  id="fontSize"
                  name="fontSize"
                  value={settings.fontSize}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {fontSizes.map(size => (
                    <option key={size.value} value={size.value}>{size.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="borderRadius" className="block text-sm font-medium text-gray-700">
                  Скругление углов
                </label>
                <select
                  id="borderRadius"
                  name="borderRadius"
                  value={settings.borderRadius}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {borderRadiuses.map(radius => (
                    <option key={radius.value} value={radius.value}>{radius.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="enableDarkMode"
                    name="enableDarkMode"
                    type="checkbox"
                    checked={settings.enableDarkMode}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="enableDarkMode" className="font-medium text-gray-700">
                    Включить темную тему
                  </label>
                  <p className="text-gray-500">
                    Позволяет пользователям переключаться между светлой и темной темой
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium text-gray-700 mb-4">Логотип и иконки</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="logoFile" className="block text-sm font-medium text-gray-700">
                  Логотип сайта
                </label>
                <input
                  type="file"
                  id="logoFile"
                  onChange={(e) => handleFileChange(e, 'logo')}
                  accept="image/*"
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {settings.logoUrl && (
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">Текущий логотип:</span>
                    <div className="mt-1 h-10 w-auto">
                      <img src={settings.logoUrl} alt="Текущий логотип" className="h-full" />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="faviconFile" className="block text-sm font-medium text-gray-700">
                  Favicon (иконка сайта)
                </label>
                <input
                  type="file"
                  id="faviconFile"
                  onChange={(e) => handleFileChange(e, 'favicon')}
                  accept="image/x-icon,image/png,image/svg+xml"
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {settings.faviconUrl && (
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">Текущий favicon:</span>
                    <div className="mt-1 h-8 w-8">
                      <img src={settings.faviconUrl} alt="Текущий favicon" className="h-full w-full" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium text-gray-700 mb-4">Дополнительные настройки</h3>

            <div>
              <label htmlFor="customCSS" className="block text-sm font-medium text-gray-700">
                Пользовательский CSS
              </label>
              <textarea
                id="customCSS"
                name="customCSS"
                rows="6"
                value={settings.customCSS}
                onChange={handleChange}
                placeholder="/* Ваш пользовательский CSS */"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono"
              ></textarea>
              <p className="mt-1 text-sm text-gray-500">
                Дополнительные стили CSS для тонкой настройки внешнего вида сайта
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md mr-2"
          >
            Сбросить
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Сохранить настройки
          </button>
        </div>
      </form>
    </div>
  );
}