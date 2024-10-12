'use client';

import { useTranslations } from 'next-intl';
import { z } from 'zod';

import { FC, ReactNode } from 'react';

import { makeZodI18nMap } from '@/app/utils/zod-error-map';

export const ZodConfig: FC<{ children: ReactNode }> = ({ children }) => {
  const t = useTranslations('zod');
  const tForm = useTranslations('form');
  const tCustom = useTranslations('customErrors');
  z.setErrorMap(makeZodI18nMap({ t, tForm, tCustom }));

  return <>{children}</>;
};
