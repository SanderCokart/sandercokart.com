import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { GlobalProviders } from '@/components/global-providers.tsx';

export const Route = createRootRoute({
  component: () => (
    <GlobalProviders>
      <Outlet />
      <TanStackRouterDevtools />
    </GlobalProviders>
  ),
});
