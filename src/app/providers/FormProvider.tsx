"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface FormData {
    title: string;
    description: string;
    category: string;
    supplier: string;
    minOrderAmount: number;
    endDate: string;
    feePercent: number;
    deliveryTime: number;
    deliveryLocation: string;
    transportationCost: string;
    participationTerms: string;
    imageUrl: string;
    allowPartialPurchase: boolean;
    isVisible: boolean;
}

interface FormContextProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    success: boolean;
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        category: '',
        supplier: '',
        minOrderAmount: 5000,
        endDate: '',
        feePercent: 5,  // Комиссия организатора в %
        deliveryTime: 21,
        deliveryLocation: 'Новосибирск',
        transportationCost: '',
        participationTerms: 'Стандартные условия участия в совместной закупке.',
        imageUrl: '',
        allowPartialPurchase: true,
        isVisible: true
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Устанавливаем дату окончания по умолчанию (через 2 недели)
    useEffect(() => {
        const defaultEndDate = new Date();
        defaultEndDate.setDate(defaultEndDate.getDate() + 14);

        // Форматируем дату в формат YYYY-MM-DD для input type="date"
        const year = defaultEndDate.getFullYear();
        const month = String(defaultEndDate.getMonth() + 1).padStart(2, '0');
        const day = String(defaultEndDate.getDate()).padStart(2, '0');

        setFormData(prev => ({
            ...prev,
            endDate: `${year}-${month}-${day}`
        }));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const isCheckbox = type === 'checkbox';

        if (isCheckbox) {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({
                ...prev,
                [name]: checked
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'number' ? parseFloat(value) : value
            }));
        }
    };

    return (
        <FormContext.Provider value={{
            formData,
            setFormData,
            loading,
            setLoading,
            error,
            setError,
            success,
            setSuccess,
            handleChange
        }}>
            {children}
        </FormContext.Provider>
    );
};

export const useFormContext = () => {
    const context = useContext(FormContext);
    if (context === undefined) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};