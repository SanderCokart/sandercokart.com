'use client';

import { ThemeProvider } from '@repo/ui/theme-provider';

import { FC, ReactNode } from 'react';

import { ZodConfig } from './configs/client.zod-config';

export const ClientProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <ZodConfig>{children}</ZodConfig>
    </ThemeProvider>
  );
};
