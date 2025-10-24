"use client";

import { AdminHeader } from '@/components/Admin/AdminHeader';
import { AdminNav } from '@/components/Admin/AdminNav';
import ProtectedRoute from '@/components/Common/ProtectedRoute';
import Link from 'next/link';
import { JSX } from 'react';

export default function Unauthorized(): JSX.Element {
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-100">
                {/* <AdminHeader /> */}
                <div className="flex">
                    <AdminNav />
                    <main className="flex-1 p-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white shadow rounded-lg p-8 text-center">
                                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg
                                        className="w-8 h-8"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                </div>

                                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                                    Доступ запрещен
                                </h1>

                                <p className="text-gray-600 mb-8">
                                    У вас нет необходимых прав для доступа к этому разделу администрирования.
                                </p>

                                <div className="flex justify-center space-x-4">
                                    <Link
                                        href="/admin"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                    >
                                        Вернуться на главную
                                    </Link>

                                    <Link
                                        href="/profile"
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
                                    >
                                        В личный кабинет
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}