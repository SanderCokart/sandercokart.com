import { env } from '@/src/env';
import { connection } from 'next/server';

export async function ServerEnv() {
  // Ensure we're in request context to get runtime values
  await connection();
  
  return (
    <pre className="font-mono text-xl">
      SERVER: {JSON.stringify(
        {
          NEXT_PUBLIC_API_URL: env.NEXT_PUBLIC_API_URL,
          NEXT_PUBLIC_ENV: env.NEXT_PUBLIC_ENV,
          NEXT_PUBLIC_SENTRY_ENABLED: env.NEXT_PUBLIC_SENTRY_ENABLED,
        },
        null,
        2,
      )}
    </pre>
  );
}
