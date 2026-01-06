'use client';

import { ThemeProvider } from '@repo/ui/components/theme-provider';

import { FC, ReactNode } from 'react';

export const ClientProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
};
