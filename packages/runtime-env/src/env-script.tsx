import type { ReactNode } from 'react';
import Script from 'next/script';
import { connection } from 'next/server';

import { getPublicEnv } from './get-public-env';

/**
 * EnvScript component that injects public environment variables into the client.
 * 
 * Critical: This component must use `await connection()` before calling `getPublicEnv()`
 * to ensure we're in request context and prevent Next.js from statically optimizing
 * and locking in env values at build time.
 * 
 * Usage:
 * ```tsx
 * import { EnvScript } from '@repo/runtime-env/env-script';
 * 
 * export default async function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <head>
 *         <EnvScript />
 *       </head>
 *       <body>{children}</body>
 *     </html>
 *   );
 * }
 * ```
 * 
 * @returns A Script component that injects environment variables
 */
export async function EnvScript(): Promise<ReactNode> {
  // AWAIT CONNECTION FIRST - This is critical!
  // This ensures we're in request context and prevents Next.js from
  // statically optimizing and locking in env values at build time
  await connection();

  // Now get public env vars - this reads from process.env dynamically
  const publicEnv = getPublicEnv();

  return (
    <Script
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `window.__ENV = ${JSON.stringify(publicEnv)};`,
      }}
    />
  );
}
