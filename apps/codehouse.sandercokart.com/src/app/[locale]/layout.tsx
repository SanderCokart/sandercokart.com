import './globals.css';

import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { unstable_setRequestLocale } from 'next-intl/server';

import localFont from 'next/font/local';

import type { ReactNode } from 'react';

import { GlobalProviders } from '@/components/global-providers';

import { cn } from '@/lib/utils';

import { Header } from './components/header';

const LetsGoDigital = localFont({
  src: '../../../public/fonts/LetsGoDigital.ttf',
  variable: '--font-digital',
  weight: '400',
  style: 'normal',
  preload: true,
});

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: 'en' | 'nl' };
}) {
  unstable_setRequestLocale(locale);

  return (
    <html suppressHydrationWarning lang={locale}>
      <head>
        <meta content="dPDNIWNVFj_4vuPMESyYIF--2WitrHLfPQe2CTcz-Ok" name="google-site-verification" />
        <title>Sander's CodeHouse</title>
      </head>
      <body className={cn(GeistSans.variable, GeistMono.variable, LetsGoDigital.variable)}>
        <div>
          <GlobalProviders>
            <Header />
            {children}
          </GlobalProviders>
        </div>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return ['en', 'nl'].map(locale => ({ locale }));
}
