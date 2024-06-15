import { SWRConfig } from 'swr';

import type { ReactNode } from 'react';

import { ThemeProvider } from '@/components/theme-provider.tsx';

import { api } from '@/lib/api.ts';
import { AuthProvider } from '@/lib/auth.tsx';

export function GlobalProviders({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => api.get(url).then(res => res.data),
      }}>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="'vite-ui-theme">
          {children}
        </ThemeProvider>
      </AuthProvider>
    </SWRConfig>
  );
}
