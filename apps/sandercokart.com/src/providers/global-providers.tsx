'use client';

import { ThemeProvider } from '@repo/ui/theme-provider';

import type { ReactNode } from 'react';

export function GlobalProviders({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
