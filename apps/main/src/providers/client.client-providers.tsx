'use client';

import { PreferenceProviders } from '@repo/runtime-env/preference';
import { MotionConfig } from 'motion/react';

import { FC, ReactNode } from 'react';

import { env } from '@/env';
import { preferences } from '@/preferences';

export const ClientProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <MotionConfig skipAnimations={env.NEXT_PUBLIC_VISUAL_TEST}>
      <PreferenceProviders {...preferences}>{children}</PreferenceProviders>
    </MotionConfig>
  );
};
