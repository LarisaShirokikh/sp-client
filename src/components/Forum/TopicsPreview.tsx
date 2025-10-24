"use client"
import Link from "next/link";
import TopicsList from "./TopicsList";
import useAuth from "@/app/hooks/useAuth";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { PlusCircle, Sparkles } from "lucide-react";
import Modal from "../UI/modal";
import { LoginModal } from "../Auth/LoginModal";

const PopularTopics = () => {
    const router = useRouter();
    const { isLoggedIn } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleCreateTopic = () => {
        if (isLoggedIn) {
            router.push('/forum/new');
        } else {
            // Show the first modal explaining auth requirement
            setShowAuthModal(true);
        }
    };

    const closeAuthModal = () => {
        setShowAuthModal(false);
    };

    const closeLoginModal = () => {
        setShowLoginModal(false);
    };

    const handleLoginClick = () => {
        // Close the first modal and open the login modal
        setShowAuthModal(false);
        setShowLoginModal(true);
    };

    return (
        <div className="">
            {/* Заголовок секции с градиентом */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Sparkles size={20} className="text-purple-600 mr-2" />
                        <h2 className="text-xl font-bold text-purple-900">Популярные темы</h2>
                    </div>
                    <Link
                        href="/forum"
                        className="text-purple-600 hover:text-purple-800 font-medium text-sm px-3 py-1 rounded-lg bg-white shadow-sm hover:shadow transition-all"
                    >
                        Перейти на форум
                    </Link>
                </div>
            </div>

            {/* Основное содержимое */}
            <div className="px-1">
                <TopicsList limit={4} />
            </div>

            {/* Футер с кнопкой */}
            <div className="px-6 py-4 ">
                <button
                    onClick={handleCreateTopic}
                    className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all shadow-sm hover:shadow"
                >
                    <PlusCircle size={18} className="mr-2" />
                    <span className="font-medium">Создать новую тему</span>
                </button>
            </div>

            {/* Модальное окно - Требуется авторизация */}
            <Modal
                isOpen={showAuthModal}
                onClose={closeAuthModal}
                title="Требуется авторизация"
                maxWidth="md"
            >
                <div className="p-6">
                    <div className="flex items-center justify-center mb-6 text-purple-600">
                        <div className="p-3 bg-purple-100 rounded-full">
                            <PlusCircle size={28} />
                        </div>
                    </div>
                    <p className="mb-6 text-gray-600 text-center">
                        Для создания новой темы необходимо войти в систему или зарегистрироваться.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleLoginClick}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-center rounded-lg hover:from-purple-700 hover:to-pink-600 transition-colors"
                        >
                            Войти
                        </button>
                        <button
                            onClick={closeAuthModal}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Модальное окно - Форма входа */}
            <LoginModal
                isOpen={showLoginModal}
                onClose={closeLoginModal}
            />
        </div>
    )
};

export default PopularTopics;