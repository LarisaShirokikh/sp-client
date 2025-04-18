// 9. ErrorMessage.tsx
type ErrorMessageProps = {
    error: string | null;
    onBack: () => void;
};

export default function ErrorMessage({ error, onBack }: ErrorMessageProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
            <p className="text-red-500 mb-4">{error || 'Тема не найдена'}</p>
            <button
                onClick={onBack}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
                Вернуться назад
            </button>
        </div>
    );
}