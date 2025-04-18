import Footer from '@/components/Footer';
import './globals.css';
import Header from '@/components/Header/Header';
import { Toaster } from 'sonner';
import AuthProvider from './providers/AuthProvider';
import { LoginModalProvider } from './providers/LoginModalProvider';


export const metadata = {
  title: 'Мой Next.js проект',
  description: 'Сайт с дашбордом и продуктами',
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-pink-50">
      <AuthProvider>
      <LoginModalProvider>
        <Header/>
        <div className="flex-grow container mx-auto px-4 py-6">
        <Toaster position="top-center" richColors closeButton />
          {children}
        </div>
        <Footer />
        </LoginModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}