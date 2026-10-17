import { getLocale } from 'next-intl/server';

import type { ReactNode } from 'react';

import { CachedPageContent } from '../../_ppr/cached-page-content';

type FreelanceLayoutProps = {
  children: ReactNode;
};

export default async function FreelanceLayout({ children }: FreelanceLayoutProps) {
  const locale = await getLocale();

  return <CachedPageContent locale={locale}>{children}</CachedPageContent>;
}
