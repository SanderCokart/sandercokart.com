'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, AlertDescription, AlertTitle } from '@repo/ui/alert';
import { Button } from '@repo/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form';
import { Input } from '@repo/ui/input';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { LuAlertCircle } from 'react-icons/lu';
import * as Yup from 'yup';

import { useSearchParams } from 'next/navigation';

export function LoginForm({ csrfToken }: { csrfToken: string | undefined }) {
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

  const onSubmit = form.handleSubmit(async data => {
    const response = signIn('credentials', {
      ...data,
      callbackUrl: '/',
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <FormField
          render={({ field, fieldState, formState }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input required {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name="email"
        />

        <FormField
          render={({ field, fieldState, formState }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input required {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name="password"
        />

        <Button type="submit">Sign in</Button>

        <LoginAlert />
      </form>
    </Form>
  );
}

function LoginAlert() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  if (error === 'CredentialsSignin') {
    return (
      <Alert variant="destructive">
        <LuAlertCircle className="h-4 w-4" />
        <AlertTitle>Invalid credentials</AlertTitle>
        <AlertDescription>The email or password you entered is incorrect.</AlertDescription>
      </Alert>
    );
  }

  return null;
}
