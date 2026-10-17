'use client';

import { useEffect } from 'react';

import type { ReactNode } from 'react';

import { markIntroPlayed, useIntroPlayed } from '@/lib/intro';

/** Long enough for the mark, the typed name and slogan and the link names to finish. */
const INTRO_DURATION = 3500;

/**
 * Lets the site header's entrance run once per page load. Once it has finished the wrapper gets
 * `data-intro-played`, which shows the header's final frame (site-header.css): links swapped in by a page
 * change then appear directly, and a header remounted by a locale switch starts on its final frame. The wrapper
 * has no box of its own.
 */
export function IntroOnce({ children }: { children: ReactNode }) {
  const played = useIntroPlayed();

  useEffect(() => {
    const timer = window.setTimeout(markIntroPlayed, INTRO_DURATION);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="contents" data-intro-played={played || undefined}>
      {children}
    </div>
  );
}
