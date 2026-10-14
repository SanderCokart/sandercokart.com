'use client';

import { useSyncExternalStore } from 'react';

import type { ReactNode } from 'react';

export type BlockingScriptProps = {
  id: string;
  code: string;
};

const subscribe = (): (() => void) => () => {};
const getClientSnapshot = (): boolean => false;
const getServerSnapshot = (): boolean => true;

/**
 * Native blocking inline script for the root layout `<head>`.
 * Do not use `next/script` here: `beforeInteractive` hydrates as a placeholder
 * and mismatches when other tags inject `<script>` nodes before React hydrates.
 *
 * React 19.3+ warns when a `<script>` is created during a client render (inline
 * scripts never re-execute). Locale changes remount `[locale]` layouts and would
 * trip that warning. Emit the tag only during SSR and the matching hydration
 * pass; by then the IIFE has already run.
 */
export function BlockingScript({ id, code }: BlockingScriptProps): ReactNode {
  const isServerRender = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  if (!isServerRender) {
    return null;
  }

  return <script id={id} dangerouslySetInnerHTML={{ __html: code }} />;
}
