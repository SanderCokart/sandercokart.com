import '@repo/ui/globals.css';

import { cn } from '@repo/ui/lib/utils';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

import localFont from 'next/font/local';

import type { ReactNode } from 'react';

import { GlobalProviders } from '@/providers/global-providers';

import { Header } from './components/header';

const LetsGoDigital = localFont({
  src: '../../public/fonts/LetsGoDigital.ttf',
  variable: '--font-digital',
  weight: '400',
  style: 'normal',
  preload: true,
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning className="scroll-smooth" lang="en">
      <head>
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
        <GlobalProviders>
          <Header />
          {children}
          {/*<Footer />*/}
        </GlobalProviders>
      </body>
    </html>
  );
}
