"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Edit, Trash, Plus } from 'lucide-react';
import { Category } from '@/app/interface/forum';
import { AdminNav } from '@/components/Admin/AdminNav';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import { ForumApiService } from '@/services/forumApiService';
import { Button } from '@/components/ui/button';
import { CategoryModal } from '@/components/Admin/Category/CategoryModal';
import { toast } from 'sonner';

export default function CategoriesManagementPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false);
const [deletingCategoryId, setDeletingCategoryId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await ForumApiService.getCategories();
        console.log("📦 Categories from API:", data);
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async (formData: { name: string; description: string }) => {
    try {
      const newCategoryData = await ForumApiService.createCategory(formData);
      setCategories([...categories, newCategoryData]);
      setShowAddForm(false);
      toast.success("Категория успешно добавлена");
    } catch (error: any) {
      const message =
        error?.response?.data?.detail || error?.message || "Ошибка при создании категории";
      toast.error(`❌ ${message}`);
      console.error('Error adding category:', error);
    }
  };

  const handleUpdateCategory = async (formData: { name: string; description: string }) => {
    if (!editingCategory?.id) return 
    try {
      const categoryId = editingCategory.id;
      console.log("🔧 updating category with id:", categoryId);
      const updatedCategory = await ForumApiService.updateCategory(categoryId, formData);

      setCategories(categories.map(cat =>
        cat.id === updatedCategory.id ? updatedCategory : cat
      ));

      setEditingCategory(null);
      toast.success("Категория успешно изменена");
    } catch (error: any) {
      const message =
        error?.response?.data?.detail || error?.message || "Ошибка при обновлении категории";
      toast.error(`❌ ${message}`);
      console.error('Error updating category:', error);
    }
  };

  const handleDeleteCategory = (id: number) => {
    setDeletingCategoryId(id);
    setShowDeleteConfirmDialog(true);
  };

  const confirmDeleteCategory = async () => {
    if (deletingCategoryId === null) return;
    
    try {
      await ForumApiService.deleteCategory(deletingCategoryId);
      setCategories(categories.filter(cat => cat.id !== deletingCategoryId));
      toast.success("Категория успешно удалена");
      cancelDeleteCategory();
    } catch (error: any) {
      const message =
        error?.response?.data?.detail || error?.message || "Ошибка при удалении категории";
      toast.error(`❌ ${message}`);
      console.error('Error deleting category:', error);
    }
  };
  
  // Handle cancel action
  const cancelDeleteCategory = () => {
    setShowDeleteConfirmDialog(false);
    setDeletingCategoryId(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminNav />

      <div className="flex-1">
        <AdminHeader />

        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link href="/admin/forum" className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
              <ArrowLeft size={16} className="mr-1" />
              Назад к управлению форумом
            </Link>

            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Управление категориями</h1>
              <Button
                onClick={() => setShowAddForm(true)}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} className="mr-2" />
                Новая категория
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500">Загрузка категорий...</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">

              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Название
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Описание
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Количество тем
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.map((category, index) => (
                    <tr key={category.id || `category-${index}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {category.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {category.description || "Нет описания"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {category.topicsCount || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          onClick={() => setEditingCategory(category)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          variant="ghost"
                          size="icon"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-red-600 hover:text-red-900"
                          variant="ghost"
                          size="icon"
                        >
                          <Trash size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Модалка создания категории */}
          <CategoryModal
            isOpen={showAddForm}
            onClose={() => setShowAddForm(false)}
            onSubmit={handleAddCategory}
            mode="create"
          />

          {/* Модалка редактирования категории */}
          <CategoryModal
            isOpen={editingCategory !== null}
            onClose={() => setEditingCategory(null)}
            onSubmit={handleUpdateCategory}
            initialData={editingCategory}
            mode="edit"
          />

          {/* Диалог подтверждения удаления */}
          {/* <AlertDialog open={showDeleteConfirmDialog} onOpenChange={setShowDeleteConfirmDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center text-red-600">
                  <AlertTriangle className="mr-2 h-5 w-5" /> Подтвердите удаление
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Вы уверены, что хотите удалить эту категорию? Это действие невозможно отменить, и все связанные темы также будут удалены.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={cancelDeleteCategory}>Отмена</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={confirmDeleteCategory}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Удалить
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog> */}

        </main>
      </div>
    </div>
  );
}
