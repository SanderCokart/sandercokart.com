import type { ReactNode } from 'react';

import { ThemeProvider } from './theme-provider';

export function GlobalProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider disableTransitionOnChange enableSystem attribute="class" defaultTheme="system">
      {children}
    </ThemeProvider>
  );
}
