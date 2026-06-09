import type { ReactNode } from 'react';

import { ClientProviders } from '@/providers/client.client-providers';
import { ServerProviders } from '@/providers/server.server-providers';

export function GlobalProviders({ children }: { children: ReactNode }) {
  return (
    <ServerProviders>
      <ClientProviders>{children}</ClientProviders>
    </ServerProviders>
  );
}
