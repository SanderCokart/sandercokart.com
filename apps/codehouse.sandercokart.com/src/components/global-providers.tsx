import type { ReactNode } from 'react';

import { ThemeProvider } from './theme-provider';

export function GlobalProviders({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
