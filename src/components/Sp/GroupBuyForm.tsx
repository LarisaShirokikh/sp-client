"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/UI/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/UI/tabs';

import { MainInfoTab } from './MainInfoTab';
import { DeliveryTab } from './DeliveryTab';
import { TermsTab } from './TermsTab';
import { PreviewTab } from './PreviewTab';
import { useFormContext } from '@/app/providers/FormProvider';
import { GroupBuyService } from '@/services/groupBuyService';

// Определяем типы категорий
const categories = [
    { id: 'clothes', name: 'Одежда и обувь' },
    { id: 'home', name: 'Товары для дома' },
    { id: 'kids', name: 'Детские товары' },
    { id: 'food', name: 'Продукты питания' },
    { id: 'beauty', name: 'Косметика и парфюмерия' },
    { id: 'school', name: 'Школьный базар' },
    { id: 'other', name: 'Другое' }
];

export const GroupBuyForm: React.FC = () => {
    const router = useRouter();
    const {
        formData,
        loading,
        setLoading,
        error,
        setError,
        success,
        setSuccess
    } = useFormContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Валидация формы
            if (!formData.title.trim()) {
                throw new Error('Название закупки обязательно');
            }

            if (!formData.supplier.trim()) {
                throw new Error('Поставщик обязателен');
            }

            if (!formData.endDate) {
                throw new Error('Дата окончания сбора заказов обязательна');
            }

            const transformedData = {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                supplier: formData.supplier,
                min_order_amount: formData.minOrderAmount,
                end_date: new Date(formData.endDate).toISOString(),
                fee_percent: formData.feePercent,
                delivery_time: formData.deliveryTime,
                delivery_location: formData.deliveryLocation,
                transportation_cost: formData.transportationCost,
                participation_terms: formData.participationTerms,
                image_url: formData.imageUrl,
                allow_partial_purchase: formData.allowPartialPurchase,
                is_visible: formData.isVisible
            };

            // Отправка данных на бэкенд
            const groupBuy = await GroupBuyService.createGroupBuy(transformedData);
            setSuccess(true);

            // Перенаправление на страницу созданной закупки
            setTimeout(() => {
                router.push(`/organizer/create/${groupBuy.id}`);
            }, 1500);

        } catch (err: any) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Произошла неизвестная ошибка при создании закупки');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Tabs defaultValue="main" className="mb-6">
                <TabsList className="mb-4">
                    <TabsTrigger value="main">Основная информация</TabsTrigger>
                    <TabsTrigger value="delivery">Условия доставки</TabsTrigger>
                    <TabsTrigger value="terms">Условия участия</TabsTrigger>
                    <TabsTrigger value="preview">Предпросмотр</TabsTrigger>
                </TabsList>

                <TabsContent value="main">
                    <MainInfoTab categories={categories} />
                </TabsContent>

                <TabsContent value="delivery">
                    <DeliveryTab />
                </TabsContent>

                <TabsContent value="terms">
                    <TermsTab />
                </TabsContent>

                <TabsContent value="preview">
                    <PreviewTab />
                </TabsContent>
            </Tabs>

            <div className="bg-white rounded-lg shadow px-6 py-4 flex justify-end">
                <Link
                    href="/organizer"
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mr-3"
                >
                    Отмена
                </Link>
                <Button
                    type="submit"
                    disabled={loading}
                    className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Создание...
                        </>
                    ) : 'Создать закупку'}
                </Button>
            </div>
        </form>
    );
};