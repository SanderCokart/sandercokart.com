'use client';

import { MotionConfig } from 'motion/react';

import { FC, ReactNode } from 'react';

import { env } from '@/src/env';

export const ClientProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return <MotionConfig skipAnimations={env.NEXT_PUBLIC_VISUAL_TEST}>{children}</MotionConfig>;
};
