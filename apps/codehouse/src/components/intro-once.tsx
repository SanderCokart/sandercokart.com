'use client';

import { cn } from '@repo/ui/lib/utils';

import { useEffect } from 'react';

import type { ReactNode } from 'react';

import { markIntroPlayed, useIntroPlayed } from '@/lib/intro';

import styles from './intro-once.module.css';

/** Long enough for the mark, the typed name and slogan and the link names to finish. */
const INTRO_DURATION = 3500;

/**
 * Lets the site header's entrance run once per page load. Once it has finished the wrapper gets `styles.played`,
 * which holds the header on its final frame (intro-once.module.css), so a header remounted by a locale switch does
 * not replay it. Links swapped in by a page change still pop in. The wrapper has no box of its own.
 */
export function IntroOnce({ children }: { children: ReactNode }) {
  const played = useIntroPlayed();

  useEffect(() => {
    const timer = window.setTimeout(markIntroPlayed, INTRO_DURATION);
    return () => window.clearTimeout(timer);
  }, []);

  return <div className={cn('contents', played && styles.played)}>{children}</div>;
}
