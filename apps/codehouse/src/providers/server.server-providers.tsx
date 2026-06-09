import { ThemeProvider } from '@repo/ui/components/theme-provider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { ReactNode, Suspense } from 'react';

async function IntlProvider({ children }: { children: ReactNode }) {
  const messages = await getMessages();

  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>;
}

export async function ServerProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <Suspense fallback={null}>
        <IntlProvider>{children}</IntlProvider>
      </Suspense>
    </ThemeProvider>
  );
}
