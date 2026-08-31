'use client';

import { MotionConfig } from 'motion/react';

import { FC, ReactNode } from 'react';

import { BlogViewProvider } from '@/app/components/blog-view-switch';

export const ClientProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <MotionConfig reducedMotion="user">
      <BlogViewProvider>{children}</BlogViewProvider>
    </MotionConfig>
  );
};
