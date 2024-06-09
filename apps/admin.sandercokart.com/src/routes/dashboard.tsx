import { createFileRoute, redirect } from '@tanstack/react-router';

const isAuthenticated = false;

export function requireAuth() {
  if (!isAuthenticated) {
    throw redirect({
      to: '/login',
    });
  }
}

export const Route = createFileRoute('/dashboard')({
  beforeLoad: () => {
    requireAuth();
  },
  component: Dashboard,
});

function Dashboard() {
  return <div>hello</div>;
}
