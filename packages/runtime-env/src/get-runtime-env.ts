import { isPublicRuntimeEnvKey } from './public-env-keys';

export type RuntimePublicEnv = NodeJS.ProcessEnv;

declare global {
  interface Window {
    __ENV?: RuntimePublicEnv;
  }
}

/**
 * Gets runtime environment variables.
 * On client: reads from window.__ENV (injected at runtime, already filtered to public keys)
 * On server: reads from process.env but filters to only NEXT_PUBLIC_* and NODE_ENV
 *
 * SECURITY: This function only returns public variables to prevent
 * accidental exposure of server-side secrets. For server-only variables, use process.env directly.
 *
 * @returns The environment variables object (filtered to public variables only)
 */
export function getRuntimeEnv(): RuntimePublicEnv {
  if (typeof window !== 'undefined') {
    return window.__ENV ?? {};
  }

  return Object.keys(process.env)
    .filter(isPublicRuntimeEnvKey)
    .reduce<RuntimePublicEnv>((env, key) => {
      env[key] = process.env[key];
      return env;
    }, {});
}
