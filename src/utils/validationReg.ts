// Validate individual field
export const validateField = (fieldName: string, value: string | boolean): string | undefined => {
    switch (fieldName) {
      case 'name':
        return value && typeof value === 'string' && value.trim().length >= 3 
          ? undefined 
          : 'Имя должно содержать не менее 3 символов';
      
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return value && typeof value === 'string' && emailRegex.test(value)
          ? undefined
          : 'Введите корректный email';
      
      case 'phone':
        const phoneRegex = /^\+7\d{10}$/;
        return value && typeof value === 'string' && phoneRegex.test(value)
          ? undefined
          : 'Введите номер в формате +79999999999';
      
      case 'password':
        return value && typeof value === 'string' && value.length >= 8
          ? undefined
          : 'Пароль должен содержать не менее 8 символов';
      
      case 'terms':
        return value === true
          ? undefined
          : 'Необходимо принять условия';
      
      default:
        return undefined;
    }
  };

