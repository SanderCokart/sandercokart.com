import { Button } from '@repo/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@repo/ui/sheet';
import { createFileRoute, Link, Outlet, redirect, useRouter } from '@tanstack/react-router';
import { FaNewspaper } from 'react-icons/fa6';
import { LuHome, LuLock, LuMenu, LuUserCircle } from 'react-icons/lu';

import { ThemeToggle } from '@/components/theme-toggle.tsx';

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
  const { signOut } = useAuth();

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      await signOut();
      await router.invalidate();
      await navigate({ to: '/login' });
    }
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="bg-muted/40 hidden border-r md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link className="flex items-center gap-2 font-semibold" to="/">
              <LuLock className="h-6 w-6" />
              <span className="">Admin</span>
            </Link>
            <ThemeToggle className="ml-auto h-8 w-8" />
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                activeProps={{ className: 'bg-muted' }}
                className="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
                to="/">
                <LuHome className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                activeProps={{ className: 'bg-muted' }}
                className="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
                to="/articles">
                <FaNewspaper className="h-4 w-4" />
                Articles
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="shrink-0 md:hidden" size="icon" variant="outline">
                <LuMenu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col" side="left">
              <nav className="grid gap-2 text-lg font-medium">
                <Link className="flex items-center gap-2 text-lg font-semibold" to="/">
                  <LuLock className="h-6 w-6" />
                  <span className="sr-only">Admin</span>
                </Link>
                <Link
                  activeProps={{ className: 'bg-muted' }}
                  className="text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
                  to="/">
                  <LuHome className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  activeProps={{ className: 'bg-muted' }}
                  className="bg-muted text-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
                  to="/articles">
                  <FaNewspaper className="h-5 w-5" />
                  Articles
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="ml-auto rounded-full" size="icon" variant="secondary">
                <LuUserCircle className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <Outlet />
      </div>
    </div>
  );
}
