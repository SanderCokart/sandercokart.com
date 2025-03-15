'use client';

import { SupportedLocalesType } from '#config.ts';
import { makeZodI18nMap } from '#zod.ts';
import { useLocale, useTranslations } from 'next-intl';
import { z } from 'zod';

import { useEffect } from 'react';

import type { FC, ReactNode } from 'react';

export const ZodConfigProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const locale = useLocale() as SupportedLocalesType;

  const t = useTranslations('zod');
  const tForm = useTranslations('form');
  const tCustom = useTranslations('customErrors');

  useEffect(() => {
    z.setErrorMap(makeZodI18nMap({ t, tForm, tCustom }));
  }, [locale]);

  return children;
};
