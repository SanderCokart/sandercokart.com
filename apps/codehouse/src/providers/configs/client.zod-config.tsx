'use client';

import { setClientZodI18nMap } from '@repo/i18n/zod';

import { FC, ReactNode } from 'react';

export const ZodConfig: FC<{ children: ReactNode }> = ({ children }) => {
  setClientZodI18nMap();

  return <>{children}</>;
};
