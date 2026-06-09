import { ThemeProvider } from '@repo/ui/components/theme-provider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { FC, ReactNode } from 'react';

export const ServerProviders: FC<{ children: ReactNode }> = async ({ children }) => {
  const messages = await getMessages();

  return (
    <ThemeProvider>
      <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
    </ThemeProvider>
  );
};
