import type { ReactNode } from 'react';

import type { LocaleCode } from '@/src/i18n/config';

import { CachedPageContent } from '../../_ppr/cached-page-content';

import { Header } from '../../(root)/(components)/header';

type CommercialLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function CommercialLayout({ children, params }: CommercialLayoutProps) {
  const { locale } = (await params) as { locale: LocaleCode };

  return (
    <>
      <Header />
      <CachedPageContent locale={locale}>{children}</CachedPageContent>
    </>
  );
}
