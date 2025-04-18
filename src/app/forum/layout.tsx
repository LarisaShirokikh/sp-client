"use client"

import ForumHeader from "@/components/Forum/ForumHeader";
import { ForumProvider } from "../providers/ForumProvider";
import CategoriesList from "@/components/Forum/CategoriesList";
import ForumStats from "@/components/Forum/ForumStats";
import ForumRules from "@/components/Forum/ForumRules";
import { LoginModalProvider, useLoginModal } from "../providers/LoginModalProvider";
import { LoginModal } from "@/components/Auth/LoginModal";

// Компонент-обертка для включения модального окна
function LoginModalWrapper({ children }: { children: React.ReactNode }) {
  const { isOpen, close } = useLoginModal();

  return (
    <>
      {children}
      {isOpen && <LoginModal isOpen={isOpen} onClose={close} />}
    </>
  );
}

export default function ForumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ForumProvider>
      <LoginModalProvider>
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Шапка форума (всегда видна) */}
          <ForumHeader />

          {/* Основной контент (уникальный для каждой страницы) */}
          <main>
            <LoginModalWrapper>
              {children}
            </LoginModalWrapper>
          </main>

          {/* Общие компоненты внизу страницы (всегда видны) */}
          <div className="mt-12">
            <CategoriesList />
          </div>

          <ForumStats />

          <ForumRules />
        </div>
      </LoginModalProvider>
    </ForumProvider>
  );
}