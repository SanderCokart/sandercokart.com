'use client';

import { FC, ReactNode } from 'react';

import { BlogViewProvider } from '@/app/components/blog-view-switch';

export const ClientProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return <BlogViewProvider>{children}</BlogViewProvider>;
};
