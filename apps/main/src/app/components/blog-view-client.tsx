'use client';

import { ToggleGroup, ToggleGroupItem } from '@repo/ui/components/shadcn/toggle-group';
import { NewspaperIcon, VideoIcon } from 'lucide-react';

import { useTransition } from 'react';

import type { BlogView } from '@/lib/actions/blog-view';

import { useBlogView } from './blog-view-context';

interface BlogViewClientProps {
  setViewAction: (view: BlogView) => Promise<void>;
}

export const BlogViewClient: React.FC<BlogViewClientProps> = ({ setViewAction }) => {
  const { view, setView } = useBlogView();
  const [isPending, startTransition] = useTransition();

  const handleViewChange = (value: string[]) => {
    const newView = value[0] as BlogView;
    if (!newView || newView === view) {
      return;
    }

    setView(newView);
    startTransition(() => {
      void setViewAction(newView);
    });
  };

  return (
    <ToggleGroup size="lg" variant="outline" value={[view]} onValueChange={handleViewChange} disabled={isPending}>
      <ToggleGroupItem title="Switch to blog view" value="blog" aria-label="Switch to blog view">
        <NewspaperIcon className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem title="Switch to video view" value="video" aria-label="Switch to video view">
        <VideoIcon className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
