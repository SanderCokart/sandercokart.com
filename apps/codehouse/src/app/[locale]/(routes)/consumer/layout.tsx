import type { ReactNode } from 'react';

import { ServiceHeader } from '@/src/components/service-header';
import type { LocaleCode } from '@/src/i18n/config';

import { CachedPageContent } from '../../_ppr/cached-page-content';

type ConsumerLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function ConsumerLayout({ children, params }: ConsumerLayoutProps) {
  const { locale } = (await params) as { locale: LocaleCode };

  return (
    <>
      <ServiceHeader />
      <CachedPageContent locale={locale}>{children}</CachedPageContent>
    </>
  );
}
