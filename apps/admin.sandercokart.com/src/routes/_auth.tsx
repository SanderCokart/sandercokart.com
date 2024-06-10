import { createFileRoute, Link, Outlet, redirect, useRouter } from '@tanstack/react-router';

import { useAuth } from '@/lib/auth.tsx';

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  const router = useRouter();
  const navigate = Route.useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      auth.logout().then(() => {
        router.invalidate().finally(() => {
          navigate({ to: '/' });
        });
      });
    }
  };

  return (
    <div className="h-full p-2">
      <h1>Authenticated Route</h1>
      <p>This route's content is only visible to authenticated users.</p>
      <ul className="flex gap-2 py-2">
        <li>
          <Link className="hover:underline data-[status='active']:font-semibold" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li>
          <button className="hover:underline" type="button" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
      <hr />
      <Outlet />
    </div>
  );
}
