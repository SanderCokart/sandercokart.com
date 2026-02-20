'use client';

import React, { useState } from 'react';

import type { BlogView } from '@/lib/actions/blog-view';

const BlogViewContext = React.createContext<{
  view: BlogView;
  setView: (view: BlogView) => void;
} | null>(null);

export const useBlogView = () => {
  const context = React.useContext(BlogViewContext);
  if (!context) {
    throw new Error('useBlogView must be used within a BlogViewProvider');
  }
  return context;
};

export const BlogViewProviderClient = ({
  initialView,
  children,
}: {
  initialView: BlogView;
  children: React.ReactNode;
}) => {
  const [view, setView] = useState<BlogView>(initialView);

  return <BlogViewContext.Provider value={{ view, setView }}>{children}</BlogViewContext.Provider>;
};
