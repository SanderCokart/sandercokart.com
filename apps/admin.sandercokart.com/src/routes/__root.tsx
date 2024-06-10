import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import type { AuthContextType } from '@/components/auth-provider.tsx';

type RouterContext = {
  authentication: AuthContextType;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  errorComponent: props => <pre>{JSON.stringify(props.error, null, 2)}</pre>,
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
