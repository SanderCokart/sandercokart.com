import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { FC, ReactNode } from 'react';

export const ServerProviders: FC<{ children: ReactNode }> = async ({ children }) => {
  const messages = await getMessages();
  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>;
};
