'use client';

import { ThemeProvider } from '@repo/ui/components/theme-provider';

import { FC, ReactNode } from 'react';

import { ZodConfigProvider } from './configs/client.zod-config';

export const ClientProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <ZodConfigProvider>{children}</ZodConfigProvider>
    </ThemeProvider>
  );
};
