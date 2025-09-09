import './globals.css';

import { cn } from '@repo/ui/lib/utils';
import { setRequestLocale } from 'next-intl/server';

import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';

import type { ReactNode } from 'react';

import { LocaleCode } from '@/src/i18n/config';
import { routing } from '@/src/i18n/routing';
import { GlobalProviders } from '@/src/providers/server.global-providers';

import { Footer } from './(components)/footer';

const LetsGoDigital = localFont({
  src: '../fonts/LetsGoDigital.ttf',
  variable: '--font-digital',
});

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

type RootLayoutParams = { children: ReactNode; params: Promise<{ locale: LocaleCode }> };
export default async function RootLayout({ params, children }: RootLayoutParams) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <html suppressHydrationWarning className="scroll-smooth" lang={locale}>
      <head>
        <meta content="dPDNIWNVFj_4vuPMESyYIF--2WitrHLfPQe2CTcz-Ok" name="google-site-verification" />
        <title>Sander's CodeHouse</title>
      </head>
      <body
        className={cn(
          fontMono.variable,
          fontSans.variable,
          LetsGoDigital.variable,
          'font-sans antialiased',
          'flex min-h-dvh flex-col',
          'mb-14 md:mb-0', //this is to account for mobile navigation @see <Navigation />
        )}>
        <GlobalProviders>
          {children}
          <Footer />
        </GlobalProviders>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}
