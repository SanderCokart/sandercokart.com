'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@repo/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form';
import { Input } from '@repo/ui/input';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { useAuth } from '@/lib/auth.ts';

export function LoginForm() {
  const form = useForm({
    resolver: yupResolver(
      Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      }),
    ),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { signIn, isLogged } = useAuth();
  const navigate = useNavigate();
  const onSubmit = form.handleSubmit(async data => {
    const validationErrors = await signIn(data);
    if (validationErrors) {
      form.setError('email', {
        type: 'manual',
        message: validationErrors.email,
      });
      form.setError('password', {
        type: 'manual',
        message: validationErrors.password,
      });
    } else {
      void navigate({ to: '/dashboard' });
    }
  });

  return (
    <Form {...form}>
      <form noValidate className="flex flex-col gap-4" onSubmit={onSubmit}>
        {isLogged() && 'yes'}
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input required {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input required {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Sign in</Button>
      </form>
    </Form>
  );
}
