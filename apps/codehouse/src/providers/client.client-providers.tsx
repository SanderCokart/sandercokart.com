'use client';

import { MotionConfig } from 'motion/react';

import { FC, ReactNode } from 'react';

export const ClientProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
};
