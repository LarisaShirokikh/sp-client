"use client";

import { FC, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { VerificationStatus } from './VerificationStatus';
import { UserData } from '@/app/interface/auth';
import { useAuth } from '@/app/hooks/useAuth';


interface PersonalInfoFormProps {
  userData: UserData;
}


// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  full_name: z.string().optional().nullable(),
  email: z.string().email('Введите корректный email'),
  phone: z.string().optional().nullable(),
  description: z.string().max(500, 'Максимальная длина описания - 500 символов').optional().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

export const PersonalInfoForm: FC<PersonalInfoFormProps> = ({
  userData
}) => {
  const {  updateUserProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVerifyEmail, setShowVerifyEmail] = useState<boolean>(!userData?.is_verified);
  const [showVerifyPhone, setShowVerifyPhone] = useState<boolean>(!!userData?.phone && !userData?.is_phone_verified);

  // Initialize form with user data
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData?.name || '',
      full_name: userData?.full_name || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
      description: userData?.description || '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      
    
    // Отправляем данные
    await updateUserProfile(data);
      
      // Show success message
      toast.success('Личная информация успешно обновлена');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Ошибка при обновлении профиля');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendVerificationEmail = async () => {
    try {
      // Mock API call - replace with actual verification email API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Письмо с подтверждением отправлено на ваш email');
    } catch (error) {
      toast.error('Ошибка при отправке письма подтверждения');
    }
  };

  const sendVerificationSMS = async () => {
    try {
      // Mock API call - replace with actual verification SMS API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Код подтверждения отправлен на ваш телефон');
    } catch (error) {
      toast.error('Ошибка при отправке кода подтверждения');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Личная информация</h3>
        <p className="mt-1 text-sm text-gray-500">
          Обновите вашу личную информацию и контактные данные
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="sm:col-span-3">
                  <FormLabel>Логин</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem className="sm:col-span-3">
                  <FormLabel>Полное имя</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="sm:col-span-3 space-y-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <div className="flex">
                      <FormControl>
                        <Input {...field} type="email" className="rounded-r-none" />
                      </FormControl>
                      <VerificationStatus 
                        isVerified={userData?.is_verified} 
                        sendVerification={sendVerificationEmail}
                        label="Email"
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="sm:col-span-3 space-y-1">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Телефон</FormLabel>
                    <div className="flex">
                      <FormControl>
                        <Input {...field} type="tel" value={field.value || ''} className="rounded-r-none" />
                      </FormControl>
                      {field.value && (
                        <VerificationStatus 
                          isVerified={userData?.is_phone_verified} 
                          sendVerification={sendVerificationSMS}
                          label="Телефон"
                        />
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="sm:col-span-6">
                  <FormLabel>О себе</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      value={field.value || ''} 
                      rows={4} 
                      placeholder="Расскажите немного о себе..." 
                    />
                  </FormControl>
                  <p className="text-sm text-gray-500 mt-1">
                    {`${field.value?.length || 0}/500 символов`}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
                'Сохранить'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};


