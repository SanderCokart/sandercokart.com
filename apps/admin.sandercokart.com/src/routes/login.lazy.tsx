import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/card';
import { createFileRoute } from '@tanstack/react-router';

import { LoginForm } from '@/forms/login-form.tsx';

export const Route = createFileRoute('/login')({
  component: () => (
    <main className="grid h-dvh place-items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email and password below to login to your account.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  ),
});
