import { withSentryConfig } from '@sentry/nextjs';

import type { NextConfig } from 'next';

import { env } from '@/env';

let finalConfig: NextConfig;

const nextConfig: NextConfig = {
  // Enables Partial Prerendering (PPR) and Cache Components; replaces deprecated experimental.ppr.
  // @see https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents
  cacheComponents: true,
  // Required pairing for Cache Components in Next.js 16.4; prefetches the shared App Shell.
  // @see https://nextjs.org/docs/app/guides/adopting-partial-prefetching
  partialPrefetching: true,
  // Dev-only: allow LAN IPs so phones can load `/_next` chunks from `-H 0.0.0.0`.
  // @see https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins
  allowedDevOrigins: ['10.*.*.*', '192.168.*.*', '172.*.*.*'],
  ...(env.NEXT_OUTPUT && { output: env.NEXT_OUTPUT }),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
    ],
  },
  serverExternalPackages: ['import-in-the-middle', 'require-in-the-middle'],
  transpilePackages: ['@repo/runtime-env', '@repo/ui', '@t3-oss/env-core', '@t3-oss/env-nextjs'],
  experimental: {
    agentUpgrade: 'latest',
  },
};

const sentryBuildOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: 'sanders-codehouse',
  project: 'main',
  sentryUrl: 'https://sentry.io/',

  authToken: env.SENTRY_AUTH_TOKEN,

  // Only print logs for uploading source maps in CI
  silent: env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
  sourcemaps: {
    disable: env.NEXT_PUBLIC_ENV === 'development',
  },
};

finalConfig = nextConfig;
if (env.NEXT_PUBLIC_SENTRY_ENABLED) {
  finalConfig = withSentryConfig(finalConfig, sentryBuildOptions);
}

export default finalConfig;
