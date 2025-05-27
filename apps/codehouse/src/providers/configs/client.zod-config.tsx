'use client';

import { useLocale, useTranslations } from 'next-intl';
import { z } from 'zod';

import { useEffect } from 'react';

import type { FC, ReactNode } from 'react';

import { LocaleCode } from '@/src/i18n/config';
import { makeZodI18nMap } from '@/src/lib/zod-error-map';

export const ZodConfigProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const locale = useLocale() as LocaleCode;
  const t = useTranslations('zod');
  const tForm = useTranslations('form');
  const tCustom = useTranslations('customErrors');

  useEffect(() => {
    z.setErrorMap(makeZodI18nMap({ t, tForm, tCustom }));
  }, [locale]);

  return children;
};
