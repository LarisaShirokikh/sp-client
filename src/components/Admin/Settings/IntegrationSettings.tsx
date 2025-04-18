import React, { useState } from 'react';

interface IntegrationConfig {
  enabled: boolean;
  apiKey: string;
  secretKey?: string;
  endpoint?: string;
  additionalSettings?: Record<string, string>;
}

export const IntegrationSettings: React.FC = () => {
  const [integrations, setIntegrations] = useState<Record<string, IntegrationConfig>>({
    payment: {
      enabled: true,
      apiKey: 'pk_test_51H************',
      secretKey: 'sk_test_51H************',
      additionalSettings: {
        webhookUrl: 'https://example.com/webhook/payment'
      }
    },
    shipping: {
      enabled: true,
      apiKey: 'ship_api_************',
      endpoint: 'https://api.shipping-service.com/v1'
    },
    analytics: {
      enabled: false,
      apiKey: '',
    },
    crm: {
      enabled: false,
      apiKey: '',
      endpoint: ''
    },
    social: {
      enabled: true,
      apiKey: 'soc_************',
      additionalSettings: {
        facebook: 'enabled',
        instagram: 'enabled',
        twitter: 'disabled'
      }
    }
  });

  const [expandedIntegration, setExpandedIntegration] = useState<string | null>('payment');
  const [isLoading, setIsLoading] = useState(false);
  const [testStatus, setTestStatus] = useState<Record<string, string>>({});

  const handleToggleIntegration = (key: string) => {
    setIntegrations(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        enabled: !prev[key].enabled
      }
    }));
  };

  const handleExpandIntegration = (key: string) => {
    setExpandedIntegration(expandedIntegration === key ? null : key);
  };

  const handleInputChange = (integrationKey: string, field: string, value: string) => {
    setIntegrations(prev => ({
      ...prev,
      [integrationKey]: {
        ...prev[integrationKey],
        [field]: value
      }
    }));
  };

  const handleAdditionalSettingChange = (integrationKey: string, settingKey: string, value: string) => {
    setIntegrations(prev => ({
      ...prev,
      [integrationKey]: {
        ...prev[integrationKey],
        additionalSettings: {
          ...prev[integrationKey].additionalSettings,
          [settingKey]: value
        }
      }
    }));
  };

  const handleTestConnection = async (key: string) => {
    setTestStatus({
      ...testStatus,
      [key]: 'testing'
    });
    
    try {
      // Здесь будет запрос к API для тестирования соединения
      await new Promise(resolve => setTimeout(resolve, 1500)); // Имитация запроса
      
      // Имитация результата тестирования (для демонстрации)
      const success = Math.random() > 0.3;
      
      setTestStatus({
        ...testStatus,
        [key]: success ? 'success' : 'failed'
      });
      
      setTimeout(() => {
        setTestStatus(prev => ({
          ...prev,
          [key]: ''
        }));
      }, 3000);
    } catch (error) {
      setTestStatus({
        ...testStatus,
        [key]: 'failed'
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Здесь будет запрос к API для сохранения настроек интеграций
      await new Promise(resolve => setTimeout(resolve, 1000)); // Имитация запроса
      alert('Настройки интеграций успешно сохранены');
    } catch (error) {
      console.error('Ошибка при сохранении настроек интеграций:', error);
      alert('Произошла ошибка при сохранении настроек интеграций');
    } finally {
      setIsLoading(false);
    }
  };

  const getIntegrationTitle = (key: string): string => {
    switch (key) {
      case 'payment': return 'Платежная система';
      case 'shipping': return 'Служба доставки';
      case 'analytics': return 'Аналитика';
      case 'crm': return 'CRM система';
      case 'social': return 'Социальные сети';
      default: return key;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-gray-800">Настройки интеграций</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {Object.entries(integrations).map(([key, config]) => (
          <div key={key} className="border rounded-md overflow-hidden">
            <div 
              className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
              onClick={() => handleExpandIntegration(key)}
            >
              <div className="flex items-center">
                <input
                  id={`enable-${key}`}
                  type="checkbox"
                  checked={config.enabled}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleToggleIntegration(key);
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={`enable-${key}`} className="ml-3 font-medium text-gray-700">
                  {getIntegrationTitle(key)}
                </label>
              </div>
              <div className="flex items-center">
                {testStatus[key] === 'testing' && (
                  <span className="text-sm text-yellow-600 mr-4">Тестирование...</span>
                )}
                {testStatus[key] === 'success' && (
                  <span className="text-sm text-green-600 mr-4">Соединение установлено</span>
                )}
                {testStatus[key] === 'failed' && (
                  <span className="text-sm text-red-600 mr-4">Ошибка соединения</span>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (config.enabled && config.apiKey) {
                      handleTestConnection(key);
                    }
                  }}
                  disabled={!config.enabled || !config.apiKey || testStatus[key] === 'testing'}
                  className="mr-2 px-3 py-1 text-xs font-medium rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Тест
                </button>
                <svg 
                  className={`h-5 w-5 text-gray-500 transition-transform ${expandedIntegration === key ? 'transform rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            {expandedIntegration === key && (
              <div className="p-4 border-t border-gray-200 space-y-4">
                <div>
                  <label htmlFor={`${key}-apiKey`} className="block text-sm font-medium text-gray-700">
                    API Ключ
                  </label>
                  <input
                    type="text"
                    id={`${key}-apiKey`}
                    value={config.apiKey}
                    onChange={(e) => handleInputChange(key, 'apiKey', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                {config.secretKey !== undefined && (
                  <div>
                    <label htmlFor={`${key}-secretKey`} className="block text-sm font-medium text-gray-700">
                      Секретный ключ
                    </label>
                    <input
                      type="password"
                      id={`${key}-secretKey`}
                      value={config.secretKey}
                      onChange={(e) => handleInputChange(key, 'secretKey', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                )}
                
                {config.endpoint !== undefined && (
                  <div>
                    <label htmlFor={`${key}-endpoint`} className="block text-sm font-medium text-gray-700">
                      Endpoint URL
                    </label>
                    <input
                      type="text"
                      id={`${key}-endpoint`}
                      value={config.endpoint}
                      onChange={(e) => handleInputChange(key, 'endpoint', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                )}
                
                {config.additionalSettings && Object.entries(config.additionalSettings).length > 0 && (
                  <div className="pt-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Дополнительные настройки</h4>
                    {Object.entries(config.additionalSettings).map(([settingKey, settingValue]) => (
                      <div key={settingKey} className="mb-2">
                        <label htmlFor={`${key}-${settingKey}`} className="block text-sm font-medium text-gray-700">
                          {settingKey}
                        </label>
                        <input
                          type="text"
                          id={`${key}-${settingKey}`}
                          value={settingValue}
                          onChange={(e) => handleAdditionalSettingChange(key, settingKey, e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        
        <div className="pt-4 flex justify-end">
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