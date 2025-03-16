import type { ReactNode } from 'react';

import { ClientProviders } from '@/src/providers/client.client-providers';
import { ServerProviders } from '@/src/providers/server.server-providers';

export function GlobalProviders({ children }: { children: ReactNode }) {
  return (
    <ServerProviders>
      <ClientProviders>{children}</ClientProviders>
    </ServerProviders>
  );
}
