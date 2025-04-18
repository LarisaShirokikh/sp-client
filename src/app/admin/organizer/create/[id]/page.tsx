"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import { AdminNav } from '@/components/Admin/AdminNav';
import ProtectedRoute from '@/components/Common/ProtectedRoute';
import { useAdminPermissions } from '@/app/hooks/useAdminPermissions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { API_CONFIG } from '@/lib/apiConfig';


// Типы данных
interface GroupBuy {
    id: number;
    title: string;
    description: string;
    category: string;
    supplier: string;
    min_order_amount: number;
    end_date: string;
    fee_percent: number;
    allow_partial_purchase: boolean;
    is_visible: boolean;
    status: string;
    organizer_id: number;
    created_at: string;
    updated_at: string;
    total_participants: number;
    total_amount: number;
    products_count: number;
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string | null;
    vendor: string | null;
    vendor_code: string | null;
    available: boolean;
    group_buy_id: number;
    created_at: string;
    updated_at: string;
    quantity_ordered: number;
}

interface ProductFormData {
    name: string;
    description: string;
    price: number;
    image_url: string | null;
    vendor: string | null;
    vendor_code: string | null;
    available: boolean;
}

export default function GroupBuyDetailPage() {
    const router = useRouter();
    const params = useParams();
    const groupBuyId = params.id;
    const permissions = useAdminPermissions();

    // Состояния
    const [groupBuy, setGroupBuy] = useState<GroupBuy | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('details');

    // Состояния для добавления/редактирования продукта
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [productFormData, setProductFormData] = useState<ProductFormData>({
        name: '',
        description: '',
        price: 0,
        image_url: null,
        vendor: null,
        vendor_code: null,
        available: true
    });

    // Состояние для модального окна удаления
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deletingProductId, setDeletingProductId] = useState<number | null>(null);

    // Загрузка данных о закупке
    useEffect(() => {
        const fetchGroupBuy = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${API_CONFIG.BASE_URL}/group_buy/${groupBuyId}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Не удалось загрузить данные о закупке');
                }

                const data = await response.json();
                setGroupBuy(data);

                // Загрузка продуктов
                await fetchProducts();
            } catch (err: any) {
                console.error('Ошибка при загрузке закупки:', err);
                setError(err.message || 'Произошла ошибка при загрузке данных');
            } finally {
                setLoading(false);
            }
        };

        if (groupBuyId) {
            fetchGroupBuy();
        }
    }, [groupBuyId]);

    // Загрузка продуктов
    const fetchProducts = async () => {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/group_buy/${groupBuyId}/products`, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Не удалось загрузить список товаров');
            }

            const data = await response.json();
            setProducts(data);
        } catch (err: any) {
            console.error('Ошибка при загрузке товаров:', err);
            setError(err.message || 'Произошла ошибка при загрузке товаров');
        }
    };

    // Обновление закупки
    const handleUpdateGroupBuy = async (updatedData: Partial<GroupBuy>) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/group_buy/${groupBuyId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Ошибка при обновлении закупки');
            }

            const data = await response.json();
            setGroupBuy(data);
            setSuccess('Закупка успешно обновлена');

            // Сброс сообщения об успехе через 3 секунды
            setTimeout(() => {
                setSuccess(null);
            }, 3000);
        } catch (err: any) {
            console.error('Ошибка при обновлении закупки:', err);
            setError(err.message || 'Произошла ошибка при обновлении закупки');
        } finally {
            setLoading(false);
        }
    };

    // Добавление нового товара
    const handleSubmitProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const isEditing = !!editingProduct;
        const url = isEditing
            ? `${API_CONFIG.BASE_URL}/group_buy/${groupBuyId}/products/${editingProduct.id}`
            : `${API_CONFIG.BASE_URL}/group_buy/${groupBuyId}/products`;

        const method = isEditing ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productFormData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || `Ошибка при ${isEditing ? 'обновлении' : 'добавлении'} товара`);
            }

            await fetchProducts();

            // Обновляем счетчик продуктов в закупке, если это новый товар
            if (!isEditing && groupBuy) {
                setGroupBuy({
                    ...groupBuy,
                    products_count: (groupBuy.products_count || 0) + 1
                });
            }

            setSuccess(`Товар успешно ${isEditing ? 'обновлён' : 'добавлен'}`);

            // Сброс формы и состояний
            resetProductForm();

            // Сброс сообщения об успехе через 3 секунды
            setTimeout(() => {
                setSuccess(null);
            }, 3000);
        } catch (err: any) {
            console.error(`Ошибка при ${isEditing ? 'обновлении' : 'добавлении'} товара:`, err);
            setError(err.message || `Произошла ошибка при ${isEditing ? 'обновлении' : 'добавлении'} товара`);
        } finally {
            setLoading(false);
        }
    };

    // Удаление товара
    const handleDeleteProduct = async (productId: number) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/group_buy/${groupBuyId}/products/${productId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Ошибка при удалении товара');
            }

            // Обновление списка товаров
            setProducts(products.filter(product => product.id !== productId));

            // Обновляем счетчик продуктов в закупке
            if (groupBuy) {
                setGroupBuy({
                    ...groupBuy,
                    products_count: (groupBuy.products_count || 0) - 1
                });
            }

            setSuccess('Товар успешно удален');

            // Сброс сообщения об успехе через 3 секунды
            setTimeout(() => {
                setSuccess(null);
            }, 3000);
        } catch (err: any) {
            console.error('Ошибка при удалении товара:', err);
            setError(err.message || 'Произошла ошибка при удалении товара');
        } finally {
            setLoading(false);
            setDeleteDialogOpen(false);
            setDeletingProductId(null);
        }
    };

    // Редактирование товара - установка данных формы
    const handleEditProduct = (product: Product) => {
        setProductFormData({
            name: product.name,
            description: product.description || '',
            price: product.price,
            image_url: product.image_url,
            vendor: product.vendor,
            vendor_code: product.vendor_code,
            available: product.available
        });

        setEditingProduct(product);
        setIsAddingProduct(true);
        setActiveTab('products');
    };

    // Сброс формы товара
    const resetProductForm = () => {
        setProductFormData({
            name: '',
            description: '',
            price: 0,
            image_url: null,
            vendor: null,
            vendor_code: null,
            available: true
        });

        setEditingProduct(null);
        setIsAddingProduct(false);
    };

    // Обработчик изменения полей формы товара
    const handleProductFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const target = e.target as HTMLInputElement;
            setProductFormData({
                ...productFormData,
                [name]: target.checked
            });
        } else if (type === 'number') {
            setProductFormData({
                ...productFormData,
                [name]: parseFloat(value)
            });
        } else {
            setProductFormData({
                ...productFormData,
                [name]: value
            });
        }
    };

    if (loading && !groupBuy) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen bg-gray-100">
                    <AdminHeader />
                    <div className="flex">
                        <AdminNav />
                        <main className="flex-1 p-6">
                            <div className="flex justify-center items-center h-full">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            </div>
                        </main>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    if (error && !groupBuy) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen bg-gray-100">
                    <AdminHeader />
                    <div className="flex">
                        <AdminNav />
                        <main className="flex-1 p-6">
                            <div className="max-w-4xl mx-auto">
                                <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
                                    {error}
                                </div>
                                <Button onClick={() => router.push('/admin/organizer')}>
                                    Вернуться к списку закупок
                                </Button>
                            </div>
                        </main>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    // Форматирование даты
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // Получение названия статуса закупки
    const getStatusName = (status: string) => {
        const statusMap: { [key: string]: string } = {
            draft: 'Черновик',
            active: 'Активная',
            collecting: 'Сбор средств',
            ordered: 'Заказано',
            delivered: 'Товар получен',
            distributing: 'Раздача',
            completed: 'Завершена',
            cancelled: 'Отменена'
        };

        return statusMap[status] || status;
    };

    // Получение названия категории
    const getCategoryName = (category: string) => {
        const categoryMap: { [key: string]: string } = {
            clothes: 'Одежда и обувь',
            home: 'Товары для дома',
            kids: 'Детские товары',
            food: 'Продукты питания',
            beauty: 'Косметика и парфюмерия',
            other: 'Другое'
        };

        return categoryMap[category] || category;
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-100">
                <AdminHeader />
                <div className="flex">
                    <AdminNav />
                    <main className="flex-1 p-6">
                        <div className="max-w-6xl mx-auto">
                            {/* Заголовок и кнопки */}
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {groupBuy?.title || 'Детали закупки'}
                                </h1>
                                <div className="flex gap-2">
                                    <Link
                                        href="/admin/organizer"
                                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        К списку закупок
                                    </Link>
                                </div>
                            </div>

                            {/* Информационные сообщения */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-6">
                                    {success}
                                </div>
                            )}

                            {/* Вкладки */}
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="mb-4">
                                    <TabsTrigger value="details">Информация о закупке</TabsTrigger>
                                    <TabsTrigger value="products">
                                        Товары ({groupBuy?.products_count || 0})
                                    </TabsTrigger>
                                    <TabsTrigger value="orders">Заказы (0)</TabsTrigger>
                                </TabsList>

                                {/* Вкладка деталей */}
                                <TabsContent value="details">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Основная информация</CardTitle>
                                            <CardDescription>
                                                Детали вашей закупки и настройки
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <Label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                                        Статус
                                                    </Label>
                                                    <div className="text-lg font-semibold">
                                                        {getStatusName(groupBuy?.status || 'draft')}
                                                    </div>
                                                    <div className="mt-4">
                                                        <Label htmlFor="created" className="block text-sm font-medium text-gray-700 mb-1">
                                                            Дата создания
                                                        </Label>
                                                        <div>
                                                            {groupBuy?.created_at ? formatDate(groupBuy.created_at) : '-'}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <Label htmlFor="supplier" className="block text-sm font-medium text-gray-700 mb-1">
                                                        Поставщик
                                                    </Label>
                                                    <div className="text-lg">
                                                        {groupBuy?.supplier || '-'}
                                                    </div>
                                                    <div className="mt-4">
                                                        <Label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                                            Категория
                                                        </Label>
                                                        <div>
                                                            {getCategoryName(groupBuy?.category || 'other')}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-6">
                                                <Label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Описание закупки
                                                </Label>
                                                <div className="p-3 border border-gray-200 rounded-md bg-gray-50">
                                                    {groupBuy?.description || 'Описание не заполнено'}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                                <div>
                                                    <Label htmlFor="min_order_amount" className="block text-sm font-medium text-gray-700 mb-1">
                                                        Мин. сумма заказа
                                                    </Label>
                                                    <div>
                                                        {groupBuy?.min_order_amount?.toLocaleString('ru-RU')} ₽
                                                    </div>
                                                </div>

                                                <div>
                                                    <Label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-1">
                                                        Дата окончания сбора
                                                    </Label>
                                                    <div>
                                                        {groupBuy?.end_date ? formatDate(groupBuy.end_date) : '-'}
                                                    </div>
                                                </div>

                                                <div>
                                                    <Label htmlFor="fee_percent" className="block text-sm font-medium text-gray-700 mb-1">
                                                        Комиссия организатора
                                                    </Label>
                                                    <div>
                                                        {groupBuy?.fee_percent}%
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-6 flex flex-col gap-2">
                                                <div className="flex items-center">
                                                    <span className="mr-2">
                                                        {groupBuy?.allow_partial_purchase ? '✅' : '❌'}
                                                    </span>
                                                    <span>Разрешить выкуп части заказа, если не набрана минимальная сумма</span>
                                                </div>

                                                <div className="flex items-center">
                                                    <span className="mr-2">
                                                        {groupBuy?.is_visible ? '✅' : '❌'}
                                                    </span>
                                                    <span>Закупка видна пользователям</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex justify-end">
                                            <Button
                                                variant="outline"
                                                onClick={() => handleUpdateGroupBuy({
                                                    is_visible: !groupBuy?.is_visible
                                                })}
                                                disabled={loading}
                                            >
                                                {groupBuy?.is_visible ? 'Скрыть закупку' : 'Опубликовать закупку'}
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </TabsContent>

                                {/* Вкладка товаров */}
                                <TabsContent value="products">
                                    <div className="mb-4 flex justify-between items-center">
                                        <h2 className="text-xl font-semibold">Товары в закупке</h2>
                                        <Button onClick={() => setIsAddingProduct(!isAddingProduct)}>
                                            {isAddingProduct ? 'Отменить' : 'Добавить товар'}
                                        </Button>
                                    </div>

                                    {isAddingProduct && (
                                        <Card className="mb-6">
                                            <CardHeader>
                                                <CardTitle>{editingProduct ? 'Редактирование товара' : 'Добавление нового товара'}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <form onSubmit={handleSubmitProduct}>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="md:col-span-2">
                                                            <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                                                Название товара *
                                                            </Label>
                                                            <Input
                                                                type="text"
                                                                id="name"
                                                                name="name"
                                                                value={productFormData.name}
                                                                onChange={handleProductFormChange}
                                                                required
                                                                className="w-full"
                                                            />
                                                        </div>

                                                        <div>
                                                            <Label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                                                Цена *
                                                            </Label>
                                                            <Input
                                                                type="number"
                                                                id="price"
                                                                name="price"
                                                                value={productFormData.price}
                                                                onChange={handleProductFormChange}
                                                                min="0"
                                                                step="0.01"
                                                                required
                                                                className="w-full"
                                                            />
                                                        </div>

                                                        <div>
                                                            <Label htmlFor="vendor" className="block text-sm font-medium text-gray-700 mb-1">
                                                                Производитель
                                                            </Label>
                                                            <Input
                                                                type="text"
                                                                id="vendor"
                                                                name="vendor"
                                                                value={productFormData.vendor || ''}
                                                                onChange={handleProductFormChange}
                                                                className="w-full"
                                                            />
                                                        </div>

                                                        <div>
                                                            <Label htmlFor="vendor_code" className="block text-sm font-medium text-gray-700 mb-1">
                                                                Артикул
                                                            </Label>
                                                            <Input
                                                                type="text"
                                                                id="vendor_code"
                                                                name="vendor_code"
                                                                value={productFormData.vendor_code || ''}
                                                                onChange={handleProductFormChange}
                                                                className="w-full"
                                                            />
                                                        </div>

                                                        <div>
                                                            <Label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-1">
                                                                URL изображения
                                                            </Label>
                                                            <Input
                                                                type="url"
                                                                id="image_url"
                                                                name="image_url"
                                                                value={productFormData.image_url || ''}
                                                                onChange={handleProductFormChange}
                                                                className="w-full"
                                                            />
                                                        </div>

                                                        <div className="md:col-span-2">
                                                            <Label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                                                Описание товара
                                                            </Label>
                                                            <Textarea
                                                                id="description"
                                                                name="description"
                                                                value={productFormData.description}
                                                                onChange={handleProductFormChange}
                                                                rows={4}
                                                                className="w-full"
                                                            />
                                                        </div>

                                                        <div className="md:col-span-2">
                                                            <div className="flex items-center">
                                                                <Input
                                                                    type="checkbox"
                                                                    id="available"
                                                                    name="available"
                                                                    checked={productFormData.available}
                                                                    onChange={handleProductFormChange as any}
                                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                                />
                                                                <Label htmlFor="available" className="ml-2 block text-sm text-gray-700">
                                                                    Товар доступен для заказа
                                                                </Label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mt-6 flex justify-end gap-2">
                                                        <Button type="button" variant="outline" onClick={resetProductForm}>
                                                            Отмена
                                                        </Button>
                                                        <Button type="submit" disabled={loading}>
                                                            {loading ? 'Сохранение...' : (editingProduct ? 'Обновить товар' : 'Добавить товар')}
                                                        </Button>
                                                    </div>
                                                </form>
                                            </CardContent>
                                        </Card>
                                    )}

                                    {loading && products.length === 0 ? (
                                        <div className="flex justify-center items-center h-40">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {products.length === 0 ? (
                                                <div className="md:col-span-2 lg:col-span-3 p-6 text-center bg-gray-50 border border-gray-200 rounded-md">
                                                    <p className="text-gray-600">Товары в закупке отсутствуют.</p>
                                                    <Button
                                                        className="mt-2"
                                                        variant="outline"
                                                        onClick={() => setIsAddingProduct(true)}
                                                    >
                                                        Добавить первый товар
                                                    </Button>
                                                </div>
                                            ) : (
                                                products.map(product => (
                                                    <Card key={product.id} className="overflow-hidden">
                                                        {product.image_url && (
                                                            <div className="aspect-video w-full overflow-hidden">
                                                                <img
                                                                    src={product.image_url}
                                                                    alt={product.name}
                                                                    className="w-full h-full object-cover"
                                                                    onError={(e) => {
                                                                        const target = e.target as HTMLImageElement;
                                                                        target.src = '/placeholder-image.jpg';
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                        <CardHeader>
                                                            <CardTitle className="flex justify-between items-start">
                                                                <span className="text-lg">{product.name}</span>
                                                                <span className="text-xl font-bold">{product.price.toLocaleString('ru-RU')} ₽</span>
                                                            </CardTitle>
                                                            {product.vendor && (
                                                                <CardDescription>
                                                                    {product.vendor} {product.vendor_code ? `(Арт: ${product.vendor_code})` : ''}
                                                                </CardDescription>
                                                            )}
                                                        </CardHeader>
                                                        <CardContent>
                                                            {product.description && (
                                                                <p className="text-sm text-gray-700 mb-2">{product.description}</p>
                                                            )}
                                                            <div className="flex items-center mt-2">
                                                                <span className={`w-2 h-2 rounded-full mr-2 ${product.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                                <span className="text-xs text-gray-600">
                                                                    {product.available ? 'Доступен' : 'Недоступен'}
                                                                </span>
                                                            </div>
                                                        </CardContent>
                                                        <CardFooter className="flex justify-between">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleEditProduct(product)}
                                                            >
                                                                Редактировать
                                                            </Button>
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => {
                                                                    setDeletingProductId(product.id);
                                                                    setDeleteDialogOpen(true);
                                                                }}
                                                            >
                                                                Удалить
                                                            </Button>
                                                        </CardFooter>
                                                    </Card>
                                                ))
                                            )}
                                        </div>
                                    )}

                                    {/* Диалог подтверждения удаления */}
                                    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Удалить товар</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Вы уверены, что хотите удалить этот товар? Это действие нельзя отменить.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Отмена</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => {
                                                        if (deletingProductId) {
                                                            handleDeleteProduct(deletingProductId);
                                                        }
                                                    }}
                                                >
                                                    Удалить
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TabsContent>

                                {/* Вкладка заказов */}
                                <TabsContent value="orders">
                                    <div className="p-6 bg-white border border-gray-200 rounded-md shadow-sm">
                                        <p className="text-gray-600">Функциональность заказов в разработке.</p>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}