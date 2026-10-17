import { getLocale } from 'next-intl/server';

import type { ReactNode } from 'react';

import { CachedPageContent } from '../../_ppr/cached-page-content';

type CommercialLayoutProps = {
  children: ReactNode;
};

export default async function CommercialLayout({ children }: CommercialLayoutProps) {
  const locale = await getLocale();

  return <CachedPageContent locale={locale}>{children}</CachedPageContent>;
}
