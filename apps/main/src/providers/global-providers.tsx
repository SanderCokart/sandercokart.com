'use client';

import { ThemeProvider } from '@repo/ui/components/theme-provider';

import type { ReactNode } from 'react';

import { BlogViewProvider } from '@/app/components/blog-view-switch';

export function GlobalProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <BlogViewProvider>{children}</BlogViewProvider>
    </ThemeProvider>
  );
}
