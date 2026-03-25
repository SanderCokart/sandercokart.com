import './globals.css';

import { EnvScript } from '@repo/runtime-env/env-script';
import { cn } from '@repo/ui/lib/utils';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

import { Suspense } from 'react';
import localFont from 'next/font/local';

import type { ReactNode } from 'react';
import type { Metadata } from 'next';

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

const DEFAULT_SOCIAL_IMAGE = '/icon.png';

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/sandercokart';

const SITE_DESCRIPTION = `Article database paired with Sander Cokart's YouTube videos: guides, reviews, code walkthroughs, and tips for developers. Companion write-ups to the channel at ${YOUTUBE_CHANNEL_URL}.`;

export const metadata: Metadata = {
  metadataBase: new URL(env.SITE_URL),
  title: {
    default: 'sandercokart.com',
    template: '%s | sandercokart.com',
  },
  description: SITE_DESCRIPTION,
  keywords: ['articles', 'blog', 'developers', 'guides', 'reviews', 'code', 'YouTube', 'sandercokart'],
  authors: [{ name: 'Sander Cokart', url: YOUTUBE_CHANNEL_URL }],
  creator: 'Sander Cokart',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: env.SITE_URL,
    siteName: 'sandercokart.com',
    title: 'sandercokart.com — articles linked to YouTube',
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_SOCIAL_IMAGE,
        alt: 'sandercokart.com — developer articles and YouTube companions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'sandercokart.com — articles linked to YouTube',
    description: SITE_DESCRIPTION,
    images: [DEFAULT_SOCIAL_IMAGE],
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var view = localStorage.getItem('blog-view-preference') || 'blog';
                document.documentElement.setAttribute('data-blog-view', view);
              } catch (e) {}
            `,
          }}
        />
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
