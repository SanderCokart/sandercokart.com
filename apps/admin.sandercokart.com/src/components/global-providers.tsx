import type { ReactNode } from 'react';

import { AuthProvider } from '@/components/auth-provider.tsx';
import { ThemeProvider } from '@/components/theme-provider.tsx';

export function GlobalProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="'vite-ui-theme">
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
}
