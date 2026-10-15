import { getLocale } from 'next-intl/server';

import type { ReactNode } from 'react';

import { CachedPageContent } from '../_ppr/cached-page-content';

type RootRouteLayoutProps = {
  children: ReactNode;
};

export default async function RootRouteLayout({ children }: RootRouteLayoutProps) {
  const locale = await getLocale();

  return <CachedPageContent locale={locale}>{children}</CachedPageContent>;
}
