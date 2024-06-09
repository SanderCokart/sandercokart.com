import { createRouter, RouterProvider } from '@tanstack/react-router';

import { ThemeProvider } from '@/components/theme-provider.tsx';

import { useAuth } from '@/lib/auth.ts';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
const router = createRouter({ routeTree, context: { authentication: undefined! } });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
export function App() {
  const auth = useAuth();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="'vite-ui-theme">
      <RouterProvider context={{ authentication: auth }} router={router} />
    </ThemeProvider>
  );
}
