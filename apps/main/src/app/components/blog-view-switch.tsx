'use client';

import { usePreference } from '@repo/runtime-env/preference';
import { ToggleGroup, ToggleGroupItem } from '@repo/ui/components/shadcn/toggle-group';
import { NewspaperIcon, VideoIcon } from 'lucide-react';

import { useEffect, useState } from 'react';

import type { FC } from 'react';
import type { BlogView } from '@/preferences/blog-view';

import { blogView } from '@/preferences/blog-view';

export type { BlogView };

export const BlogViewSwitch: FC = () => {
  const { value: view, setValue: setView } = usePreference(blogView);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleViewChange = (value: string[]): void => {
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
