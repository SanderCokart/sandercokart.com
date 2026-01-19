'use client';

import { env } from '@/src/env';

export function ClientEnv() {
  return (
    <pre className="font-mono text-xl">
      CLIENT: {JSON.stringify(
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
