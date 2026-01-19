/**
 * Gets runtime environment variables.
 * On client: reads from window.__ENV (injected at runtime, already filtered to NEXT_PUBLIC_*)
 * On server: reads from process.env but filters to only NEXT_PUBLIC_* variables for security
 * 
 * SECURITY: This function only returns public (NEXT_PUBLIC_*) variables to prevent
 * accidental exposure of server-side secrets. For server-only variables, use process.env directly.
 * 
 * @returns The environment variables object (filtered to public variables only)
 */
export function getRuntimeEnv(): NodeJS.ProcessEnv {
  if (typeof window !== 'undefined') {
    // Client: read from window.__ENV (already filtered to NEXT_PUBLIC_* by EnvScript)
    const windowEnv = (window as { __ENV?: NodeJS.ProcessEnv }).__ENV;
    return windowEnv as NodeJS.ProcessEnv;
  }
  
  // Server: filter to only NEXT_PUBLIC_* variables for security
  // This prevents accidental exposure of server-side secrets even if validation fails
  return Object.keys(process.env)
    .filter((key) => /^NEXT_PUBLIC_/i.test(key) || key === 'NODE_ENV')
    .reduce<NodeJS.ProcessEnv>(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {},
    );
}
