// 2. BackNavigation.tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BackNavigation() {
    return (
        <Link
            href="/forum"
            className="inline-flex items-center text-purple-600 hover:text-purple-800"
        >
            <ArrowLeft size={16} className="mr-1" />
            <span>Вернуться к списку тем</span>
        </Link>
    );
}