import { Button } from '@repo/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@repo/ui/card';
import { getCsrfToken, getProviders } from 'next-auth/react';

import { redirect } from 'next/navigation';

import { Page } from '@/types/common';

import { LoginForm } from '@/app/login/forms/login-form';
import { auth } from '@/lib/auth';

export default async function LoginPage({}: Page) {
  const csrfToken = await getCsrfToken();
  const session = await auth();

  if (session) redirect('/');

  return (
    <main className="grid h-dvh place-items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <LoginForm csrfToken={csrfToken} />
        </CardContent>
      </Card>
    </main>
  );
}
