import { getLocale } from 'next-intl/server';

import type { ReactNode } from 'react';

import { ServiceHeader } from '@/src/components/service-header';

import { CachedPageContent } from '../../_ppr/cached-page-content';

type CommercialLayoutProps = {
  children: ReactNode;
};

export default async function CommercialLayout({ children }: CommercialLayoutProps) {
  const locale = await getLocale();

  return (
    <>
      <ServiceHeader />
      <CachedPageContent locale={locale}>{children}</CachedPageContent>
    </>
  );
}
