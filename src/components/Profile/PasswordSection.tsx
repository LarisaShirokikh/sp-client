"use client";

import { FC, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/UI/form';
import { Input } from '@/components/UI/input';
import { Button } from '@/components/UI/button';
import { Spinner } from '@/components/UI/spinner';
import { Lock, Eye, EyeOff, AlertTriangle, CheckCircle, Shield } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Switch } from '@/components/UI/switch';

const passwordFormSchema = z.object({
  currentPassword: z.string().min(1, 'Необходимо ввести текущий пароль'),
  newPassword: z
    .string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .regex(/[a-z]/, 'Пароль должен содержать строчные буквы')
    .regex(/[A-Z]/, 'Пароль должен содержать заглавные буквы')
    .regex(/[0-9]/, 'Пароль должен содержать цифры')
    .regex(/[^a-zA-Z0-9]/, 'Пароль должен содержать спец. символы'),
  confirmPassword: z.string().min(1, 'Подтвердите пароль'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export const PasswordSection: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPassword = form.watch('newPassword');

  const passwordStrength = {
    length: newPassword.length >= 8,
    lowercase: /[a-z]/.test(newPassword),
    uppercase: /[A-Z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    special: /[^a-zA-Z0-9]/.test(newPassword),
  };

  const passwordStrengthScore = Object.values(passwordStrength).filter(Boolean).length;

  const getPasswordStrengthText = () => {
    if (passwordStrengthScore === 0) return '';
    if (passwordStrengthScore < 3) return 'Слабый';
    if (passwordStrengthScore < 5) return 'Средний';
    return 'Сильный';
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrengthScore === 0) return '';
    if (passwordStrengthScore < 3) return 'text-red-500';
    if (passwordStrengthScore < 5) return 'text-amber-500';
    return 'text-green-500';
  };

  const onSubmit = async (data: PasswordFormValues) => {
    setIsSubmitting(true);

    try {
      // Mock API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Password data submitted:', data);

      // Reset form
      form.reset();

      // Show success message
      toast.success('Пароль успешно изменен');
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Ошибка при изменении пароля');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleTwoFactor = async () => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));

      setTwoFactorEnabled(!twoFactorEnabled);

      if (!twoFactorEnabled) {
        toast.success('Двухфакторная аутентификация включена');
      } else {
        toast.success('Двухфакторная аутентификация отключена');
      }
    } catch (error) {
      toast.error('Ошибка при изменении настроек двухфакторной аутентификации');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Пароль и безопасность</h3>
        <p className="mt-1 text-sm text-gray-500">
          Обновите ваш пароль и настройки безопасности аккаунта
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Текущий пароль</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      type={showCurrentPassword ? 'text' : 'password'}
                      placeholder="Введите ваш текущий пароль"
                    />
                  </FormControl>
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Новый пароль</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="Введите новый пароль"
                    />
                  </FormControl>
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                <FormMessage />

                {newPassword && (
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Надежность пароля:</span>
                      <span className={`text-sm font-medium ${getPasswordStrengthColor()}`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-1 rounded-full ${passwordStrengthScore < 3
                            ? 'bg-red-500'
                            : passwordStrengthScore < 5
                              ? 'bg-amber-500'
                              : 'bg-green-500'
                          }`}
                        style={{ width: `${(passwordStrengthScore / 5) * 100}%` }}
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      <div className="flex items-center text-sm">
                        {passwordStrength.length ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                        )}
                        <span className={passwordStrength.length ? 'text-green-700' : 'text-gray-600'}>
                          Минимум 8 символов
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        {passwordStrength.lowercase ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                        )}
                        <span className={passwordStrength.lowercase ? 'text-green-700' : 'text-gray-600'}>
                          Строчные буквы (a-z)
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        {passwordStrength.uppercase ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                        )}
                        <span className={passwordStrength.uppercase ? 'text-green-700' : 'text-gray-600'}>
                          Заглавные буквы (A-Z)
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        {passwordStrength.number ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                        )}
                        <span className={passwordStrength.number ? 'text-green-700' : 'text-gray-600'}>
                          Цифры (0-9)
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        {passwordStrength.special ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                        )}
                        <span className={passwordStrength.special ? 'text-green-700' : 'text-gray-600'}>
                          Специальные символы (!@#$%^&*)
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Подтвердите пароль</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Подтвердите новый пароль"
                    />
                  </FormControl>
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              className="mr-3"
              onClick={() => form.reset()}
            >
              Отмена
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Сохранение...
                </>
              ) : (
                'Изменить пароль'
              )}
            </Button>
          </div>
        </form>
      </Form>

      <div className="pt-4 border-t border-gray-200">
        <h4 className="text-base font-medium text-gray-900">Двухфакторная аутентификация</h4>
        <p className="mt-1 text-sm text-gray-500">
          Повысьте безопасность вашего аккаунта с помощью двухфакторной аутентификации
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-blue-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {twoFactorEnabled ? 'Двухфакторная аутентификация включена' : 'Двухфакторная аутентификация отключена'}
              </p>
              <p className="text-sm text-gray-500">
                {twoFactorEnabled
                  ? 'Ваш аккаунт защищен дополнительным уровнем безопасности.'
                  : 'Включите для дополнительной защиты при входе в аккаунт.'}
              </p>
            </div>
          </div>
          <Switch
            checked={twoFactorEnabled}
            onCheckedChange={handleToggleTwoFactor}
          />
        </div>

        {twoFactorEnabled && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h5 className="text-sm font-medium text-gray-900">Резервные коды восстановления</h5>
            <p className="mt-1 text-sm text-gray-500">
              Сохраните эти коды в безопасном месте. Их можно использовать для доступа к аккаунту, если вы потеряете доступ к устройству двухфакторной аутентификации.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {['KP7A-FGTR', 'V9JK-MNBV', 'X3SA-QWER', 'H7YU-ZXCP', 'L9TG-BNMK', 'P2AS-DFGH'].map((code) => (
                <div key={code} className="bg-white p-2 rounded border border-gray-200 text-sm font-mono">
                  {code}
                </div>
              ))}
            </div>
            <div className="mt-3">
              <Button variant="outline" size="sm">
                <Lock className="h-4 w-4 mr-2" />
                Создать новые коды
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};