import type { ReactNode } from 'react';

import { ThemeProvider } from '@/components/theme-provider.tsx';

import { AuthProvider } from '@/lib/auth.tsx';

export function GlobalProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="'vite-ui-theme">
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
}
