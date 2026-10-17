import { getRuntimeEnv } from './get-runtime-env';
import { isPublicRuntimeEnvKey } from './public-env-keys';

/**
 * Public env vars for client injection: NEXT_PUBLIC_* plus NODE_ENV.
 *
 * @internal
 */
export function getPublicEnv(): Record<string, string | undefined> {
  const runtimeEnv = getRuntimeEnv();
  return Object.keys(runtimeEnv)
    .filter(isPublicRuntimeEnvKey)
    .reduce<Record<string, string | undefined>>((env, key) => {
      env[key] = runtimeEnv[key];
      return env;
    }, {});
}
