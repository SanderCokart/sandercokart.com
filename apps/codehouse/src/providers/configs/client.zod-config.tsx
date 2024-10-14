'use client';

import { FC, ReactNode } from 'react';

import { setClientZodI18nMap } from '@/app/utils/zod-error-map';

export const ZodConfig: FC<{ children: ReactNode }> = ({ children }) => {
  setClientZodI18nMap();

  return <>{children}</>;
};
