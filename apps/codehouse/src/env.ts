/**
 * This is used to validate environment variables.
 * You can use the `env` object to access the environment variables.
 * If you use a server environment variable in the client, you will get an error.
 */

import { getRuntimeEnv } from '@repo/runtime-env';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const server = {
  /** CI Mode */
  CI: z
    .enum(['true', 'false', '0', '1'])
    .catch('false')
    .default('false')
    .transform(s => s === 'true' || s === '1'),
  /**
   * The Next.js output target.
   * export: Static HTML export.
   * standalone: Docker
   * '' (empty string): Default behavior.
   */
  NEXT_OUTPUT: z.enum(['export', 'standalone']).optional(),
  /**
   * The runtime the server will run on.
   * This environment variable is set by Next.js and does not need to be set via the .env file.
   */
  NEXT_RUNTIME: z.enum(['nodejs', 'edge']).optional(),

  /**
   * Sentry Auth Token.
   * Get yours from: https://innosend-eu.sentry.io/settings/auth-tokens/
   */
  SENTRY_AUTH_TOKEN: z.string().startsWith('sntrys_').optional(),
  /**
   * For using remote cache via Vercel.
   * Read more: https://vercel.com/docs/monorepos/remote-caching#vercel-remote-cache.
   * TURBO_TEAM must be set to the slug of the Vercel team to share the artifacts with e.g: https://vercel.com/team-slug-here.
   */
  TURBO_TEAM: z.string().optional(),
  /**
   * For using remote cache via Vercel.
   * Read more: https://vercel.com/docs/monorepos/remote-caching#vercel-remote-cache.
   * TURBO_TOKEN must be a token generated at vercel with the team as scope.
   * To generate a token visit: https://vercel.com/account/settings/tokens.
   */
  TURBO_TOKEN: z.string().optional(),
  /**
   * Canonical origin for SEO metadata, sitemap, and robots (no trailing slash).
   * Defaults to production when unset.
   */
  SITE_URL: z.url().default('https://codehouse.sandercokart.com'),
  /**
   * Optional GitHub token for listing public release versions (higher rate limit).
   * Unauthenticated requests still work for public repositories.
   */
  GITHUB_TOKEN: z.string().min(1).optional(),
  /**
   * SMTP host for contact-form delivery (Mailpit locally, Stalwart in production).
   */
  MAIL_HOST: z.string().min(1).default('127.0.0.1'),
  MAIL_PORT: z.coerce.number().int().positive().default(1025),
  MAIL_USERNAME: z.string().min(1).optional(),
  MAIL_PASSWORD: z.string().min(1).optional(),
  MAIL_ENCRYPTION: z.enum(['none', 'tls', 'ssl']).default('none'),
  MAIL_FROM_ADDRESS: z.string().min(3).includes('@').default('noreply@localhost'),
  MAIL_FROM_NAME: z.string().min(1).default("Sander's CodeHouse"),
  MAIL_TO_ADDRESS: z.string().min(3).includes('@').default('dev@localhost'),
  MAIL_TO_NAME: z.string().min(1).default('Developer'),
  REDIS_HOST: z.string().min(1).default('127.0.0.1'),
  REDIS_PORT: z.coerce.number().int().positive().default(6379),
  REDIS_PASSWORD: z.string().min(1).optional(),
};
const client = {
  /** Unused while Codehouse sends mail itself. Kept so existing Dokploy env still validates. */
  NEXT_PUBLIC_API_URL: z.url().optional(),
  /** The app environment */
  NEXT_PUBLIC_ENV: z.enum(['development', 'production', 'staging']).default('development'),
  NEXT_PUBLIC_SENTRY_DSN: z.url().optional(),
  NEXT_PUBLIC_SENTRY_ENABLED: z
    .enum(['true', 'false'])
    .default('false')
    .transform(s => s === 'true'),
  NEXT_PUBLIC_VISUAL_TEST: z
    .enum(['true', 'false'])
    .default('false')
    .transform(s => s === 'true'),
};

const shared = {
  /** Node environment can run in development or production */
  NODE_ENV: z.enum(['development', 'production']).default('development'),
};

// Validated env object (use on server and client)
// Client variables use getRuntimeEnv() to read from window.__ENV on client or process.env on server
export const env = createEnv({
  client,
  emptyStringAsUndefined: true,
  runtimeEnv: {
    // Server variables (always from process.env)
    CI: process.env.CI,
    NEXT_OUTPUT: process.env.NEXT_OUTPUT,
    NEXT_RUNTIME: process.env.NEXT_RUNTIME,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    TURBO_TEAM: process.env.TURBO_TEAM,
    TURBO_TOKEN: process.env.TURBO_TOKEN,
    SITE_URL: process.env.SITE_URL,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USERNAME: process.env.MAIL_USERNAME,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    MAIL_ENCRYPTION: process.env.MAIL_ENCRYPTION,
    MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,
    MAIL_FROM_NAME: process.env.MAIL_FROM_NAME,
    MAIL_TO_ADDRESS: process.env.MAIL_TO_ADDRESS,
    MAIL_TO_NAME: process.env.MAIL_TO_NAME,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    // Client variables (use getRuntimeEnv() to read from window.__ENV on client or process.env on server)
    NEXT_PUBLIC_API_URL: getRuntimeEnv().NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_ENV: getRuntimeEnv().NEXT_PUBLIC_ENV,
    NEXT_PUBLIC_SENTRY_DSN: getRuntimeEnv().NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_SENTRY_ENABLED: getRuntimeEnv().NEXT_PUBLIC_SENTRY_ENABLED,
    NEXT_PUBLIC_VISUAL_TEST: getRuntimeEnv().NEXT_PUBLIC_VISUAL_TEST,
    // Shared variables
    NODE_ENV: getRuntimeEnv().NODE_ENV,
  },
  server,
  shared,
});
