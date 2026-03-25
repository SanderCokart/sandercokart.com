'use client';

import { ToggleGroup, ToggleGroupItem } from '@repo/ui/components/shadcn/toggle-group';
import { NewspaperIcon, VideoIcon } from 'lucide-react';

import { createContext, useContext, useEffect, useState } from 'react';

import type { FC, ReactNode } from 'react';

export type BlogView = 'video' | 'blog';

export const BlogViewSwitch: FC = () => {
  const { view, setView } = useBlogView();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleViewChange = (value: string[]) => {
    if (value.length > 0 && value[0] !== view) {
      setView(value[0] as BlogView);
    }
  };

  if (!mounted) {
    return (
      <ToggleGroup aria-label="Post view" size="lg" variant="outline" value={[]}>
        <ToggleGroupItem
          title="Blog"
          value="blog"
          aria-label="Blog"
          className="[html[data-blog-view='blog']_&]:bg-accent [html[data-blog-view='blog']_&]:text-accent-foreground">
          <NewspaperIcon aria-hidden="true" className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem
          title="Video"
          value="video"
          aria-label="Video"
          className="[html[data-blog-view='video']_&]:bg-accent [html[data-blog-view='video']_&]:text-accent-foreground">
          <VideoIcon aria-hidden="true" className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    );
  }

  return (
    <ToggleGroup aria-label="Post view" size="lg" variant="outline" value={[view]} onValueChange={handleViewChange}>
      <ToggleGroupItem title="Blog" value="blog" aria-label="Blog">
        <NewspaperIcon aria-hidden="true" className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem title="Video" value="video" aria-label="Video">
        <VideoIcon aria-hidden="true" className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

type BlogViewContextType = {
  view: BlogView;
  setView: (view: BlogView) => void;
};

const BlogViewContext = createContext<BlogViewContextType | null>(null);

const BLOG_VIEW_COOKIE = 'blog-view-preference';
export const BlogViewProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [view, setView] = useState<BlogView>('blog');

  const handleViewChange = (newView: BlogView) => {
    setView(newView);
    localStorage.setItem(BLOG_VIEW_COOKIE, newView);
    document.documentElement.setAttribute('data-blog-view', newView);
  };

  useEffect(() => {
    const preference = localStorage.getItem(BLOG_VIEW_COOKIE) || 'blog';
    if (preference === 'video') {
      setView('video');
    }
    // Ensure the data attribute is set correctly on mount just in case
    document.documentElement.setAttribute('data-blog-view', preference);
  }, []);

  return <BlogViewContext.Provider value={{ view, setView: handleViewChange }}>{children}</BlogViewContext.Provider>;
};

export const useBlogView = () => {
  const context = useContext(BlogViewContext);
  if (!context) throw new Error('useBlogView must be used within a BlogViewProvider');
  return context;
};
