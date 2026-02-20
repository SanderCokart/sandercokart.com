'use client';

import { ToggleGroup, ToggleGroupItem } from '@repo/ui/components/shadcn/toggle-group';
import { NewspaperIcon, VideoIcon } from 'lucide-react';

import { createContext, useContext, useState } from 'react';

import type { FC } from 'react';

export const BlogViewSwitch: FC = () => {
  const { view, setView } = useBlogView();
  return (
    <ToggleGroup size="lg" variant="outline" value={[view]} onValueChange={value => setView(value[0] as BlogView)}>
      <ToggleGroupItem title="Switch to blog view" value="blog" aria-label="Switch to blog view">
        <NewspaperIcon className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem title="Switch to video view" value="video" aria-label="Switch to video view">
        <VideoIcon className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

type BlogView = 'video' | 'blog';

const BlogViewContext = createContext<{ view: BlogView; setView: (view: BlogView) => void } | null>(null);

export const BlogViewProvider = ({ children }: { children: React.ReactNode }) => {
  const [view, setView] = useState<BlogView>('blog');
  return <BlogViewContext.Provider value={{ view, setView }}>{children}</BlogViewContext.Provider>;
};

export const useBlogView = () => {
  const context = useContext(BlogViewContext);
  if (!context) {
    throw new Error('useBlogView must be used within a BlogViewProvider');
  }
  return context;
};
