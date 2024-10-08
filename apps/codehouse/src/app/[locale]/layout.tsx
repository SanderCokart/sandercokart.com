import './globals.css';

import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';

import localFont from 'next/font/local';

import type { ReactNode } from 'react';

import { GlobalProviders } from '@/components/global-providers';

import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

import { Footer } from './components/footer';
import { Header } from './components/header';

const LetsGoDigital = localFont({
  src: '../../../public/fonts/LetsGoDigital.ttf',
  variable: '--font-digital',
  weight: '400',
  style: 'normal',
  preload: true,
});

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: 'en' | 'nl' };
}) {
  const messages = await getMessages();
  unstable_setRequestLocale(locale);
  return (
    <html suppressHydrationWarning className="scroll-smooth" lang={locale}>
      <head>
        <meta content="dPDNIWNVFj_4vuPMESyYIF--2WitrHLfPQe2CTcz-Ok" name="google-site-verification" />
        <title>Sander's CodeHouse</title>
      </head>
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          LetsGoDigital.variable,
          'flex min-h-dvh flex-col',
          'mb-14 md:mb-0', //this is to account for mobile navigation @see <Navigation />
        )}>
        <NextIntlClientProvider messages={messages}>
          <GlobalProviders>
            <Header />
            {children}
            <Footer />
          </GlobalProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}
