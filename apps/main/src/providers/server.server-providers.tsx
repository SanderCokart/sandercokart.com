import { ThemeProvider } from '@repo/ui/components/theme-provider';

import { FC, ReactNode } from 'react';

export const ServerProviders: FC<{ children: ReactNode }> = async ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
