import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import type { AuthContext } from '@/lib/auth.ts';

import { GlobalProviders } from '@/components/global-providers.tsx';

type RouterContext = {
  authentication: AuthContext;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <GlobalProviders>
      <Outlet />
      <TanStackRouterDevtools />
    </GlobalProviders>
  ),
});
