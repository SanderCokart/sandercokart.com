'use client';

import { useEffect } from 'react';

import { Navigation } from '@/components/navigation';

import { usePathname } from '@/i18n/navigation';
import { INTRO_SEEN_ATTRIBUTE, INTRO_SEEN_KEY } from '@/lib/intro';
import { links, serviceLinks } from '@/lib/nav-links';

/** Long enough for the mark, the typed name and slogan and the link names to finish. */
const INTRO_DURATION = 3500;

/**
 * Header links for the current page: the four services on the home page, the page's own sections elsewhere.
 * Also marks the header entrance as played — in sessionStorage right away (for reloads), and on the root once it
 * has finished (so a remount, e.g. a locale switch, does not replay it mid-session).
 */
export function SiteNavigation() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, '1');
    } catch {
      // Storage can be unavailable (private mode, blocked); the entrance then simply plays again next load.
    }

    const timer = window.setTimeout(
      () => document.documentElement.setAttribute(INTRO_SEEN_ATTRIBUTE, ''),
      INTRO_DURATION,
    );
    return () => window.clearTimeout(timer);
  }, []);

  return pathname === '/' ? <Navigation links={serviceLinks} variant="adaptive" /> : <Navigation links={links} />;
}
