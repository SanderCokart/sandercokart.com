import { RouterProvider } from '@tanstack/react-router';

import { GlobalProviders } from '@/components/global-providers.tsx';

import { useAuth } from '@/lib/auth.ts';
import { router } from '@/router.tsx';

export function App() {
  return (
    <GlobalProviders>
      <InnerApp />
    </GlobalProviders>
  );
}

function InnerApp() {
  const auth = useAuth();

  return <RouterProvider context={{ authentication: auth }} router={router} />;
}
