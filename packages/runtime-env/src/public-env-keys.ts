/**
 * Keys safe to read via getRuntimeEnv / inject onto the client.
 * Never include server secrets.
 */
export function isPublicRuntimeEnvKey(key: string): boolean {
  return /^NEXT_PUBLIC_/i.test(key) || key === 'NODE_ENV';
}
