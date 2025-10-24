// 3. DeliveryTab.tsx - Вкладка с информацией о доставке
// -----------------------------------------------------

"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/UI/card';
import { Label } from '@/components/UI/label';
import { Input } from '@/components/UI/input';
import { Textarea } from '@/components/UI/textarea';
import { Clock } from 'lucide-react';
import { useFormContext } from '@/app/providers/FormProvider';

export const DeliveryTab: React.FC = () => {
    const { formData, handleChange } = useFormContext();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Условия доставки</CardTitle>
                <CardDescription>
                    Укажите информацию о доставке товаров
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700 mb-1">
                            Ожидаемое время доставки (дни)
                        </Label>
                        <div className="relative">
                            <Input
                                type="number"
                                id="deliveryTime"
                                name="deliveryTime"
                                value={formData.deliveryTime}
                                onChange={handleChange}
                                min="1"
                                step="1"
                                className="w-full pr-10"
                            />
                            <Clock className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="deliveryLocation" className="block text-sm font-medium text-gray-700 mb-1">
                            Местоположение (город)
                        </Label>
                        <Input
                            type="text"
                            id="deliveryLocation"
                            name="deliveryLocation"
                            value={formData.deliveryLocation}
                            onChange={handleChange}
                            className="w-full"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <Label htmlFor="transportationCost" className="block text-sm font-medium text-gray-700 mb-1">
                            Транспортные расходы
                        </Label>
                        <Textarea
                            id="transportationCost"
                            name="transportationCost"
                            value={formData.transportationCost}
                            onChange={handleChange}
                            placeholder="Укажите информацию о транспортных расходах, например: 'Включены в стоимость' или 'Оплачиваются дополнительно'"
                            rows={3}
                            className="w-full"
                        ></Textarea>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};