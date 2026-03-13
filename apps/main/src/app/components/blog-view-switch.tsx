'use client';

import { Skeleton } from '@repo/ui/components/shadcn/skeleton';
import { ToggleGroup, ToggleGroupItem } from '@repo/ui/components/shadcn/toggle-group';
import { NewspaperIcon, VideoIcon } from 'lucide-react';

import { createContext, useContext, useEffect, useState } from 'react';

import type { FC, ReactNode } from 'react';

export type BlogView = 'video' | 'blog';

export const BlogViewSwitch: FC = () => {
  const { view, setView, isInitializing } = useBlogView();

  const handleViewChange = (value: string[]) => {
    if (value.length > 0 && value[0] !== view) {
      setView(value[0] as BlogView);
    }
  };

  if (isInitializing) {
    return <Skeleton className="w-18 h-9" />;
  }

  return (
    <ToggleGroup size="lg" variant="outline" value={[view]} onValueChange={handleViewChange}>
      <ToggleGroupItem title="Switch to blog view" value="blog" aria-label="Switch to blog view">
        <NewspaperIcon className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem title="Switch to video view" value="video" aria-label="Switch to video view">
        <VideoIcon className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

type BlogViewContextType = {
  view: BlogView;
  setView: (view: BlogView) => void;
  isInitializing: boolean;
};

const BlogViewContext = createContext<BlogViewContextType | null>(null);

const BLOG_VIEW_COOKIE = 'blog-view-preference';
export const BlogViewProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [view, setView] = useState<BlogView>('blog');
  const [isInitializing, setIsInitializing] = useState(true);

  const handleViewChange = (view: BlogView) => {
    setView(view);
    localStorage.setItem(BLOG_VIEW_COOKIE, view);
  };

  useEffect(() => {
    const preference = localStorage.getItem(BLOG_VIEW_COOKIE) || 'blog';
    if (preference === 'video') setView('video');

    setTimeout(() => setIsInitializing(false), 1000);
  }, []);

  return (
    <BlogViewContext.Provider value={{ view, setView: handleViewChange, isInitializing }}>
      {children}
    </BlogViewContext.Provider>
  );
};

export const useBlogView = () => {
  const context = useContext(BlogViewContext);
  if (!context) throw new Error('useBlogView must be used within a BlogViewProvider');
  return context;
};
