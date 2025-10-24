"use client";

import React, { useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/UI/card';
import { Label } from '@/components/UI/label';
import { Input } from '@/components/UI/input';
import { Textarea } from '@/components/UI/textarea';
import { Button } from '@/components/UI/button';
import { Calendar, Percent, Upload } from 'lucide-react';
import { useFormContext } from '@/app/providers/FormProvider';

export interface Category {
    id: string;
    name: string;
}

interface MainInfoTabProps {
    categories: Category[];
}

export const MainInfoTab: React.FC<MainInfoTabProps> = ({ categories }) => {
    const { formData, setFormData, handleChange } = useFormContext();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // Эмуляция URL загруженного изображения
            const mockImageUrl = URL.createObjectURL(file);

            setFormData(prev => ({
                ...prev,
                imageUrl: mockImageUrl
            }));
        }
    };

    const triggerFileBrowser = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Основная информация закупки</CardTitle>
                <CardDescription>
                    Заполните основную информацию о своей закупке. Поля, отмеченные * обязательны для заполнения.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <Label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Название закупки *
                        </Label>
                        <Input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full"
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <Label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Описание закупки
                        </Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full"
                        ></Textarea>
                    </div>

                    <div>
                        <Label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                            Категория
                        </Label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Выберите категорию</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <Label htmlFor="supplier" className="block text-sm font-medium text-gray-700 mb-1">
                            Поставщик *
                        </Label>
                        <Input
                            type="text"
                            id="supplier"
                            name="supplier"
                            value={formData.supplier}
                            onChange={handleChange}
                            className="w-full"
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="minOrderAmount" className="block text-sm font-medium text-gray-700 mb-1">
                            Минимальная сумма заказа (₽)
                        </Label>
                        <Input
                            type="number"
                            id="minOrderAmount"
                            name="minOrderAmount"
                            value={formData.minOrderAmount}
                            onChange={handleChange}
                            min="0"
                            step="100"
                            className="w-full"
                        />
                    </div>

                    <div>
                        <Label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Дата окончания сбора заказов (Стоп) *
                        </Label>
                        <div className="relative">
                            <Input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className="w-full pr-10"
                                required
                            />
                            <Calendar className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="feePercent" className="block text-sm font-medium text-gray-700 mb-1">
                            Комиссия организатора (%)
                        </Label>
                        <div className="relative">
                            <Input
                                type="number"
                                id="feePercent"
                                name="feePercent"
                                value={formData.feePercent}
                                onChange={handleChange}
                                min="0"
                                max="25"
                                step="0.5"
                                className="w-full pr-10"
                            />
                            <Percent className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Комиссия будет автоматически добавлена к стоимости каждого товара
                        </p>
                    </div>

                    <div className="md:col-span-2">
                        <Label className="block text-sm font-medium text-gray-700 mb-3">
                            Изображение для закупки
                        </Label>
                        <div className="flex items-center">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={triggerFileBrowser}
                                className="flex items-center"
                            >
                                <Upload className="mr-2 h-4 w-4" />
                                Загрузить фото
                            </Button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />
                            {formData.imageUrl && (
                                <div className="ml-4 relative w-16 h-16 rounded-md overflow-hidden">
                                    <img
                                        src={formData.imageUrl}
                                        alt="Предпросмотр"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};