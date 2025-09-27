/**
 * This is used to validate environment variables.
 * You can use the `env` object to access the environment variables.
 * If you use a server environment variable in the client, you will get an error.
 */

import { createEnv } from '@t3-oss/env-nextjs';
import { env as runTimeEnv } from 'next-runtime-env';
import { z } from 'zod';

export enum EnvKeys {
  CI = 'CI',
  NEXT_OUTPUT = 'NEXT_OUTPUT',
  NEXT_PUBLIC_API_URL = 'NEXT_PUBLIC_API_URL',
  NEXT_PUBLIC_ENV = 'NEXT_PUBLIC_ENV',
  NEXT_RUNTIME = 'NEXT_RUNTIME',
  NODE_ENV = 'NODE_ENV',
  SENTRY_AUTH_TOKEN = 'SENTRY_AUTH_TOKEN',
  SENTRY_ENABLED = 'SENTRY_ENABLED',
  TURBO_TEAM = 'TURBO_TEAM',
  TURBO_TOKEN = 'TURBO_TOKEN',
}

const server = {
  /** CI Mode */
  [EnvKeys.CI]: z
    .enum(['true', 'false'])
    .default('false')
    .transform(s => s === 'true'),
  /**
   * The Next.js output target.
   * export: Static HTML export.
   * standalone: Docker
   * '' (empty string): Default behavior.
   */
  [EnvKeys.NEXT_OUTPUT]: z.enum(['export', 'standalone']).optional(),
  /**
   * The runtime the server will run on.
   * This environment variable is set by Next.js and does not need to be set via the .env file.
   */
  [EnvKeys.NEXT_RUNTIME]: z.enum(['nodejs', 'edge']).optional(),

  /** Enable Sentry */
  [EnvKeys.SENTRY_ENABLED]: z
    .enum(['true', 'false'])
    .default('false')
    .transform(s => s === 'true'),

  /**
   * Sentry Auth Token.
   * Get yours from: https://innosend-eu.sentry.io/settings/auth-tokens/
   */
  [EnvKeys.SENTRY_AUTH_TOKEN]: z.string().startsWith('sntrys_').optional(),
  /**
   * For using remote cache via Vercel.
   * Read more: https://vercel.com/docs/monorepos/remote-caching#vercel-remote-cache.
   * TURBO_TEAM must be set to the slug of the Vercel team to share the artifacts with e.g: https://vercel.com/team-slug-here.
   */
  [EnvKeys.TURBO_TEAM]: z.string().optional(),
  /**
   * For using remote cache via Vercel.
   * Read more: https://vercel.com/docs/monorepos/remote-caching#vercel-remote-cache.
   * TURBO_TOKEN must be a token generated at vercel with the team as scope.
   * To generate a token visit: https://vercel.com/account/settings/tokens.
   */
  [EnvKeys.TURBO_TOKEN]: z.string().optional(),
};
const client = {
  /** The API URL */
  [EnvKeys.NEXT_PUBLIC_API_URL]: z.string().url().optional(),
  /** The app environment */
  [EnvKeys.NEXT_PUBLIC_ENV]: z.enum(['development', 'production']).default('development'),
};

const shared = {
  /** Node environment can run in development or production */
  [EnvKeys.NODE_ENV]: z.enum(['development', 'production']).default('development'),
};

const sharedEnv = Object.fromEntries(
  Object.keys(shared).map(key => [key, process.env[key as keyof typeof shared]]),
) as Record<keyof typeof shared, string | undefined>;

const publicEnv = Object.fromEntries(
  Object.keys(client).map(key => [key, runTimeEnv(key as keyof typeof client)]),
) as Record<keyof typeof client, string | undefined>;

const experimental__runtimeEnv = {
  ...sharedEnv,
  ...publicEnv,
};

export const env = createEnv({
  client,
  emptyStringAsUndefined: true,
  experimental__runtimeEnv,
  server,
  shared,
});
