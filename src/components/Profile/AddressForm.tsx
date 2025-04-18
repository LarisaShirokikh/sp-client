// forms/AddressForm.tsx
import { useState } from 'react';
import { MapPin } from 'lucide-react';

interface Address {
  id: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal: string;
  country: string;
  isDefault: boolean;
}

interface AddressFormProps {
  initialData: Address | null;
  onSave: (address: Address) => void;
  onCancel: () => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Address>(
    initialData || {
      id: '',
      name: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      postal: '',
      country: 'Россия',
      isDefault: false
    }
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 800));
      
      onSave(formData);
    } catch (error) {
      console.error('Ошибка сохранения адреса:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
        <MapPin className="h-5 w-5 mr-2 text-pink-500" />
        {initialData ? 'Редактирование адреса' : 'Новый адрес'}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Название адреса</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Например: Домашний, Рабочий"
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Адрес, строка 1</label>
          <input
            type="text"
            name="line1"
            value={formData.line1}
            onChange={handleChange}
            placeholder="Улица, номер дома"
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Адрес, строка 2</label>
          <input
            type="text"
            name="line2"
            value={formData.line2}
            onChange={handleChange}
            placeholder="Квартира, офис (опционально)"
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Город</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Область/Край</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Почтовый индекс</label>
          <input
            type="text"
            name="postal"
            value={formData.postal}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Страна</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            required
          >
            <option value="Россия">Россия</option>
            <option value="Беларусь">Беларусь</option>
            <option value="Казахстан">Казахстан</option>
            <option value="Украина">Украина</option>
          </select>
        </div>

        <div className="md:col-span-2 flex items-center mt-2">
          <input
            type="checkbox"
            name="isDefault"
            id="isDefault"
            checked={formData.isDefault}
            onChange={handleChange}
            className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
          />
          <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700">
            Сделать адресом по умолчанию
          </label>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          disabled={isLoading}
        >
          Отменить
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Сохранение...' : 'Сохранить адрес'}
        </button>
      </div>
    </form>
  );
};