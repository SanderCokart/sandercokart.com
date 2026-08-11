import { getLocale } from 'next-intl/server';

import type { ReactNode } from 'react';

import { CachedPageContent } from '../_ppr/cached-page-content';

import { Header } from './(components)/header';

type RootRouteLayoutProps = {
  children: ReactNode;
};

export default async function RootRouteLayout({ children }: RootRouteLayoutProps) {
  const locale = await getLocale();

  return (
    <>
      <Header />
      <CachedPageContent locale={locale}>{children}</CachedPageContent>
    </>
  );
}
