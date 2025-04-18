"use client"

const ForumRules = () => {
  return (
    <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
      <h3 className="text-lg font-medium text-blue-800 mb-2">Правила форума</h3>
      <ul className="space-y-1 text-sm text-blue-700">
        <li>• Уважайте друг друга и придерживайтесь дружелюбного тона в общении</li>
        <li>• Избегайте спама и повторяющихся сообщений</li>
        <li>• Размещайте темы в соответствующих категориях</li>
        <li>• Не публикуйте личную информацию других участников</li>
        <li>• При возникновении вопросов обращайтесь к модераторам</li>
      </ul>
    </div>
  );
};

export default ForumRules;