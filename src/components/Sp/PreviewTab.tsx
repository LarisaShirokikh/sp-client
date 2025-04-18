"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormContext } from '@/app/providers/FormProvider';

export const PreviewTab: React.FC = () => {
    const { formData } = useFormContext();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Предпросмотр закупки</CardTitle>
                <CardDescription>
                    Так будет выглядеть ваша закупка для участников
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="relative h-48 bg-gray-200">
                        {formData.imageUrl ? (
                            <img
                                src={formData.imageUrl}
                                alt={formData.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <span>Загрузите изображение закупки</span>
                            </div>
                        )}
                    </div>

                    <div className="p-4">
                        <h3 className="text-xl font-bold text-gray-900">
                            {formData.title || 'Название закупки'}
                        </h3>

                        <div className="mt-2 text-sm text-gray-600">
                            <p className="line-clamp-3">
                                {formData.description || 'Описание закупки'}
                            </p>
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                            <div className="bg-blue-50 rounded-md p-3">
                                <p className="text-xs text-gray-500">Стоп</p>
                                <p className="text-sm font-medium text-gray-800">
                                    {formData.endDate ? new Date(formData.endDate).toLocaleDateString('ru-RU') : 'Не указано'}
                                </p>
                            </div>
                            <div className="bg-green-50 rounded-md p-3">
                                <p className="text-xs text-gray-500">Собрано</p>
                                <p className="text-sm font-medium text-gray-800">0 %</p>
                            </div>
                            <div className="bg-yellow-50 rounded-md p-3">
                                <p className="text-xs text-gray-500">Ожидание</p>
                                <p className="text-sm font-medium text-gray-800">~ {formData.deliveryTime} дней</p>
                            </div>
                        </div>

                        <div className="mt-4 border-t border-gray-200 pt-4">
                            <h4 className="font-medium text-gray-900">Информация о закупке:</h4>
                            <ul className="mt-2 space-y-1 text-sm text-gray-600">
                                <li>Организатор: Вы</li>
                                <li>Поставщик: {formData.supplier || 'Не указан'}</li>
                                <li>Комиссия организатора: {formData.feePercent}%</li>
                                <li>Минимальная сумма заказа: {formData.minOrderAmount} ₽</li>
                                <li>Местоположение: {formData.deliveryLocation}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};