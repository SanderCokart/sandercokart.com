import { Button } from '@repo/ui/button';
import { createFileRoute } from '@tanstack/react-router';

import { useAuth } from '@/lib/auth.ts';

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: Dashboard,
});

function Dashboard() {
  const { signOut } = useAuth();

  return (
    <div>
      hello
      <Button onClick={signOut}>Signout</Button>
    </div>
  );
}
