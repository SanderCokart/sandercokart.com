import { getRuntimeEnv } from './get-runtime-env';

/**
 * Get public env vars at runtime (for client injection).
 * Filters environment variables that start with NEXT_PUBLIC_
 * 
 * @internal
 * @returns Object containing only NEXT_PUBLIC_* environment variables
 */
export function getPublicEnv(): Record<string, string | undefined> {
  const runtimeEnv = getRuntimeEnv();
  return Object.keys(runtimeEnv)
    .filter((key) => /^NEXT_PUBLIC_/i.test(key))
    .reduce<Record<string, string | undefined>>(
      (env, key) => ({
        ...env,
        [key]: runtimeEnv[key],
      }),
      {},
    );
}
