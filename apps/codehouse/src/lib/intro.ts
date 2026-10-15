'use client';

import { useSyncExternalStore } from 'react';

/**
 * Whether the header entrance already played in this document. Module state, so it lives exactly as long as the
 * page: it survives client navigations and remounts (a locale switch remounts everything under the `[locale]`
 * layout) and resets on a real page load, where the entrance should play again. No storage involved.
 */
let played = false;
const listeners = new Set<() => void>();

export function hasPlayedIntro(): boolean {
  return played;
}

export function markIntroPlayed(): void {
  if (played) return;
  played = true;
  listeners.forEach(listener => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * `true` once the entrance played. The server snapshot is `false`, so the first load hydrates with the entrance;
 * subscribers re-render when it finishes, and a client-side remount reads the module state during render.
 */
export function useIntroPlayed(): boolean {
  return useSyncExternalStore(subscribe, hasPlayedIntro, () => false);
}
