import './globals.css';

import { EnvScript } from '@repo/runtime-env/env-script';
import { cn } from '@repo/ui/lib/utils';
import { getLocale } from 'next-intl/server';

import { Suspense } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';

import type { ReactNode } from 'react';
import type { Metadata } from 'next';

import { env } from '@/src/env';
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

export const metadata: Metadata = {
  metadataBase: new URL(env.SITE_URL),
  title: {
    default: "Sander's CodeHouse",
    template: "%s | Sander's CodeHouse",
  },
  description:
    "Sander's CodeHouse delivers web development services, freelance expertise, and practical digital solutions.",
  alternates: {
    canonical: '/en',
    languages: {
      en: '/en',
      nl: '/nl',
    },
  },
  verification: {
    google: 'dPDNIWNVFj_4vuPMESyYIF--2WitrHLfPQe2CTcz-Ok',
  },
  openGraph: {
    type: 'website',
    url: `${env.SITE_URL}/en`,
    siteName: "Sander's CodeHouse",
    title: "Sander's CodeHouse",
    description:
      "Sander's CodeHouse delivers web development services, freelance expertise, and practical digital solutions.",
  },
  twitter: {
    card: 'summary',
    title: "Sander's CodeHouse",
    description:
      "Sander's CodeHouse delivers web development services, freelance expertise, and practical digital solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const bodyClassName = cn(
  fontMono.variable,
  fontSans.variable,
  LetsGoDigital.variable,
  'font-sans antialiased',
  'flex min-h-dvh flex-col',
  'mb-14 lg:mb-0', // account for mobile navigation @see <Navigation />
);

type RootLayoutParams = { children: ReactNode };

export default function RootLayout({ children }: RootLayoutParams) {
  return (
    <Suspense fallback={<RootLayoutFallback>{children}</RootLayoutFallback>}>
      <LocalizedRootLayout>{children}</LocalizedRootLayout>
    </Suspense>
  );
}

function RootLayoutFallback({ children }: { children: ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      className="relative scroll-smooth"
      data-scroll-behavior="smooth"
      lang={routing.defaultLocale}>
      <head>
        <Suspense fallback={null}>
          <EnvScript />
        </Suspense>
      </head>
      <body className={bodyClassName}>
        <GlobalProviders>
          {children}
          <Footer />
        </GlobalProviders>
      </body>
    </html>
  );
}

async function LocalizedRootLayout({ children }: RootLayoutParams) {
  const locale = await getLocale();

  return (
    <html suppressHydrationWarning className="relative scroll-smooth" data-scroll-behavior="smooth" lang={locale}>
      <head>
        <Suspense fallback={null}>
          <EnvScript />
        </Suspense>
      </head>
      <body className={bodyClassName}>
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
