// 
import { useState } from 'react';
import { Button } from '@/components/UI/button';
import { Label } from '@/components/UI/label';
import { Input } from '@/components/UI/input';
import { Textarea } from '@/components/UI/textarea';
import Modal from '@/components/UI/modal';
import { Category } from '@/app/interface/forum';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (category: { id?: number; name: string; description: string }) => void;
  initialData?: Category | null;
  mode: 'create' | 'edit';
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  mode,
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload =
      mode === 'edit' && initialData?.id !== undefined
        ? { id: initialData.id, ...formData }
        : { ...formData };

    onSubmit(payload);
    setFormData({ name: '', description: '' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={mode === 'edit' ? 'Редактировать категорию' : 'Добавить категорию'} maxWidth="md">
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Название
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              Описание
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            >
              Отмена
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {mode === 'edit' ? 'Сохранить' : 'Добавить'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
