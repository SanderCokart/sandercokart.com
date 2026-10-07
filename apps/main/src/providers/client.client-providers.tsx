'use client';

import { MotionConfig } from 'motion/react';

import { FC, ReactNode } from 'react';

import { BlogViewProvider } from '@/app/components/blog-view-switch';
import { env } from '@/env';

export const ClientProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <MotionConfig skipAnimations={env.NEXT_PUBLIC_VISUAL_TEST}>
      <BlogViewProvider>{children}</BlogViewProvider>
    </MotionConfig>
  );
};
