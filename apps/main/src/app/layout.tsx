import './globals.css';

import { EnvScript } from '@repo/runtime-env/env-script';
import { cn } from '@repo/ui/lib/utils';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

import localFont from 'next/font/local';

import type { Metadata } from 'next';
import { Suspense, type ReactNode } from 'react';

import { env } from '@/env';
import { GlobalProviders } from '@/providers/global-providers';

import { Header } from './components/header';

const LetsGoDigital = localFont({
  src: '../../public/fonts/LetsGoDigital.ttf',
  variable: '--font-digital',
  weight: '400',
  style: 'normal',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(env.SITE_URL),
  title: {
    default: 'sandercokart.com',
    template: '%s | sandercokart.com',
  },
  description:
    'Guides, reviews, tips, and code-focused articles from sandercokart.com for developers and tech enthusiasts.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: env.SITE_URL,
    siteName: 'sandercokart.com',
    title: 'sandercokart.com',
    description:
      'Guides, reviews, tips, and code-focused articles for developers and tech enthusiasts.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'sandercokart.com',
    description:
      'Guides, reviews, tips, and code-focused articles for developers and tech enthusiasts.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning className="scroll-smooth" lang="en">
      <head>
        <Suspense fallback={null}>
          <EnvScript />
        </Suspense>
        <script async crossOrigin="anonymous" src="https://tweakcn.com/live-preview.min.js" />
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
