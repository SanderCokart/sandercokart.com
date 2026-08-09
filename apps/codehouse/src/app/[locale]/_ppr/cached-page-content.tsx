import { cacheLife, cacheTag } from 'next/cache';

import type { ReactNode } from 'react';

import type { LocaleCode } from '@/src/i18n/config';

type CachedPageContentProps = {
  children: ReactNode;
  locale: LocaleCode;
};

export async function CachedPageContent({ children, locale }: CachedPageContentProps) {
  'use cache';
  cacheLife('hours');
  cacheTag(`page-${locale}`);

  return children;
}
