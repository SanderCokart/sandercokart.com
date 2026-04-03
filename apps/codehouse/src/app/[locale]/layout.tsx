import './globals.css';

import { EnvScript } from '@repo/runtime-env/env-script';
import { cn } from '@repo/ui/lib/utils';
import { setRequestLocale } from 'next-intl/server';

import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';

import type { ReactNode } from 'react';
import type { Metadata } from 'next';

import { env } from '@/src/env';
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

type RootLayoutParams = { children: ReactNode; params: Promise<{ locale: string }> };
export default async function RootLayout({ params, children }: RootLayoutParams) {
  const { locale } = (await params) as { locale: LocaleCode };
  setRequestLocale(locale);

  return (
    <html suppressHydrationWarning className="relative scroll-smooth" data-scroll-behavior="smooth" lang={locale}>
      <head>
        <EnvScript />
      </head>
      <body
        className={cn(
          fontMono.variable,
          fontSans.variable,
          LetsGoDigital.variable,
          'font-sans antialiased',
          'flex min-h-dvh flex-col',
          // 'mb-14 md:mb-0', //this is to account for mobile navigation @see <Navigation />
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
