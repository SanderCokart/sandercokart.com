import { Suspense } from 'react';
import { connection } from 'next/server';

import type { ReactNode } from 'react';

import { BlockingScript } from './blocking-script';
import { getPublicEnv } from './get-public-env';
import { serializeForScript } from './serialize-for-script';

/**
 * Injects public environment variables into `window.__ENV` at request time.
 *
 * Uses `await connection()` so Next.js does not bake values at build time.
 * Renders a native blocking `<script>` (not `next/script`) so hydration stays
 * stable when other tags mutate `<head>`. The tag is SSR + hydration only —
 * React 19 never executes client-rendered scripts, and remounts (locale
 * changes) would otherwise warn.
 *
 * Includes its own Suspense boundary — mount it in the root layout `<head>`:
 *
 * ```tsx
 * import { EnvScript } from '@repo/runtime-env/env-script';
 *
 * export default function RootLayout({ children }) {
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
 */
export function EnvScript(): ReactNode {
  return (
    <Suspense fallback={null}>
      <EnvScriptInner />
    </Suspense>
  );
}

async function EnvScriptInner(): Promise<ReactNode> {
  await connection();

  const publicEnv = getPublicEnv();

  return <BlockingScript id="runtime-env" code={`window.__ENV = ${serializeForScript(publicEnv)};`} />;
}
