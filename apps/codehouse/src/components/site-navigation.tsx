'use client';

import { Navigation } from '@/components/navigation';

import { usePathname } from '@/i18n/navigation';
import { links, serviceLinks } from '@/lib/nav-links';

/**
 * Header links for the current page: the four services on the home page, the page's own sections elsewhere. Keyed by
 * link set, so a page change that swaps them remounts the navigation and it plays its entrance for the new links.
 */
export function SiteNavigation() {
  const isHome = usePathname() === '/';

  return <Navigation key={isHome ? 'services' : 'sections'} links={isHome ? serviceLinks : links} />;
}
