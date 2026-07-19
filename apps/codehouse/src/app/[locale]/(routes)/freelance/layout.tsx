import type { ReactNode } from 'react';

import type { LocaleCode } from '@/src/i18n/config';

import { CachedPageContent } from '../../_ppr/cached-page-content';

import { Header } from './(components)/header';

type FreelanceLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function FreelanceLayout({ children, params }: FreelanceLayoutProps) {
  const { locale } = (await params) as { locale: LocaleCode };

  return (
    <>
      <Header />
      <CachedPageContent locale={locale}>{children}</CachedPageContent>
    </>
  );
}
