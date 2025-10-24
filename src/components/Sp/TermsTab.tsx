// 4. TermsTab.tsx - Вкладка с условиями участия
// -----------------------------------------------------

"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/UI/card';
import { Label } from '@/components/UI/label';
import { Textarea } from '@/components/UI/textarea';
import { Switch } from '@/components/UI/switch';
import { useFormContext } from '@/app/providers/FormProvider';

export const TermsTab: React.FC = () => {
    const { formData, setFormData, handleChange } = useFormContext();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Условия участия</CardTitle>
                <CardDescription>
                    Укажите правила и условия участия в закупке
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <Label htmlFor="participationTerms" className="block text-sm font-medium text-gray-700 mb-1">
                        Условия участия
                    </Label>
                    <Textarea
                        id="participationTerms"
                        name="participationTerms"
                        value={formData.participationTerms}
                        onChange={handleChange}
                        rows={6}
                        className="w-full"
                    ></Textarea>
                </div>

                <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <Label htmlFor="allowPartialPurchase" className="text-sm font-medium text-gray-700">
                                Разрешить выкуп части заказа
                            </Label>
                            <p className="text-sm text-gray-500">
                                Если не набрана минимальная сумма, можно выкупить часть заказа
                            </p>
                        </div>
                        <Switch
                            id="allowPartialPurchase"
                            name="allowPartialPurchase"
                            checked={formData.allowPartialPurchase}
                            onCheckedChange={(checked) =>
                                setFormData(prev => ({ ...prev, allowPartialPurchase: checked }))
                            }
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <Label htmlFor="isVisible" className="text-sm font-medium text-gray-700">
                                Опубликовать закупку сразу
                            </Label>
                            <p className="text-sm text-gray-500">
                                Закупка будет видна всем пользователям после создания
                            </p>
                        </div>
                        <Switch
                            id="isVisible"
                            name="isVisible"
                            checked={formData.isVisible}
                            onCheckedChange={(checked) =>
                                setFormData(prev => ({ ...prev, isVisible: checked }))
                            }
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};