import type { ReactNode } from 'react';

export type BlockingScriptProps = {
  id: string;
  code: string;
};

/**
 * Native blocking inline script for the root layout `<head>`.
 * Do not use `next/script` here: `beforeInteractive` hydrates as a placeholder
 * and mismatches when other tags inject `<script>` nodes before React hydrates.
 */
export function BlockingScript({ id, code }: BlockingScriptProps): ReactNode {
  return <script id={id} dangerouslySetInnerHTML={{ __html: code }} />;
}
