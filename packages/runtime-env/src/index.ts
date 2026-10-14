/**
 * @repo/runtime-env
 *
 * Runtime environment variable utilities for Next.js applications.
 * Access public env at request time via `getRuntimeEnv()` (client reads `window.__ENV`).
 * Mount `<EnvScript />` from `@repo/runtime-env/env-script` in the root layout `<head>`.
 * Optional localStorage HTML preferences: collect `createPreference` configs on one object,
 * spread onto `PreferenceScripts` and `PreferenceProviders`. Components use `usePreference`.
 */

export { getRuntimeEnv } from './get-runtime-env';
export type { RuntimePublicEnv } from './get-runtime-env';
