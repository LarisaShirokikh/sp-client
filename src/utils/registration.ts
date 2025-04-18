// src/utils/registrationUtils.ts
import { z } from 'zod';

export const registrationSchema = z.object({
  name: z.string().min(1, { message: 'Имя обязательно' }),
  email: z.string().email({ message: 'Неверный формат email' }),
  tel: z
    .string()
    .min(10, { message: 'Неверный номер телефона' })
    .refine((val) => /^\+?[0-9]{10,15}$/.test(val), { message: 'Неверный формат номера телефона' }),
  password: z
    .string()
    .min(8, { message: 'Пароль должен быть минимум 8 символов' })
    .refine((val) => /[A-Z]/.test(val), { message: 'Пароль должен содержать хотя бы одну заглавную букву' })
    .refine((val) => /[0-9]/.test(val), { message: 'Пароль должен содержать хотя бы одну цифру' }),
});