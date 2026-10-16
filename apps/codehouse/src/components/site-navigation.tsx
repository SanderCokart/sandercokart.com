'use client';

import { Navigation } from '@/components/navigation';

import { usePathname } from '@/i18n/navigation';
import { links, serviceLinks } from '@/lib/nav-links';

/**
 * Header links for the current page: the four services on the home page, the page's own sections elsewhere.
 * Navigation swaps them with an exit and entrance on desktop.
 */
export function SiteNavigation() {
  const isHome = usePathname() === '/';

  return <Navigation links={isHome ? serviceLinks : links} />;
}
