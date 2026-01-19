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
};
const client = {
  /** The API URL */
  NEXT_PUBLIC_API_URL: z.url().optional(),
  /** The app environment */
  NEXT_PUBLIC_ENV: z.enum(['development', 'production']).default('development'),
  /** Enable Sentry */
  NEXT_PUBLIC_SENTRY_ENABLED: z
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
    // Client variables (use getRuntimeEnv() to read from window.__ENV on client or process.env on server)
    NEXT_PUBLIC_API_URL: getRuntimeEnv().NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_ENV: getRuntimeEnv().NEXT_PUBLIC_ENV,
    NEXT_PUBLIC_SENTRY_ENABLED: getRuntimeEnv().NEXT_PUBLIC_SENTRY_ENABLED,
    // Shared variables
    NODE_ENV: getRuntimeEnv().NODE_ENV,
  },
  server,
  shared,
});
