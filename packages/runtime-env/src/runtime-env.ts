import { getRuntimeEnv } from './get-runtime-env';

/**
 * Runtime env helper function.
 * Use this in client components for runtime values.
 * 
 * @internal
 * @param key - The environment variable key to retrieve
 * @returns The environment variable value or undefined
 */
export function runtimeEnv(key: string): string | undefined {
  const env = getRuntimeEnv();
  return env[key];
}
