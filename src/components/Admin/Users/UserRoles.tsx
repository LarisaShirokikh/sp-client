"use client";

export function UserRoles({ userId, currentRole, onSave }) {
  const [role, setRole] = useState(currentRole || 'user');

  const roles = [
    { id: 'user', name: 'Пользователь', description: 'Стандартный доступ' },
    { id: 'admin', name: 'Администратор', description: 'Доступ к админ-панели и основным функциям' },
    { id: 'superadmin', name: 'Суперадминистратор', description: 'Полный доступ ко всем функциям' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(userId, role);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium mb-4">Управление ролями</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {roles.map((roleOption) => (
            <div key={roleOption.id} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={`role-${roleOption.id}`}
                  name="role"
                  type="radio"
                  checked={role === roleOption.id}
                  onChange={() => setRole(roleOption.id)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={`role-${roleOption.id}`} className="font-medium text-gray-700">
                  {roleOption.name}
                </label>
                <p className="text-gray-500">{roleOption.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md mr-2"
          >
            Отмена
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
}