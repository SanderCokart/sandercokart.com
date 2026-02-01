import { YouTubeEmbed } from '@next/third-parties/google';
import { cn } from '@repo/ui/lib/utils';
import { format } from 'date-fns';
import { evaluate } from 'next-mdx-remote-client/rsc';

import { Suspense } from 'react';

import type { Page } from '@/types/common';

import components from '@/app/articles/[slug]/components';
import { getArticleBySlug } from '@/lib/actions/articles';

type PARAMS = { slug: string };
type SEARCH_PARAMS = null;

export default async function ArticlePage({ params }: Page<PARAMS, SEARCH_PARAMS>) {
  const { source, options } = await getArticleBySlug(await params);

  const { content, frontmatter, error } = await evaluate<{ videoId?: string; updatedAt: string; createdAt: string }>({
    source,
    options,
    components,
  });

  if (error) {
    return (
      <article className="container py-16">
        <h1>Error evaluating MDX</h1>
        <pre>{error.message}</pre>
      </article>
    );
  }

  return (
    <article
      className={cn(
        'prose dark:prose-invert container py-16',
        'prose-h2:bg-accent prose-h2:text-accent-foreground prose-h2:px-2 prose-h2:py-1',
        'prose-h3:border-l-8 prose-h3:border-accent prose-h3:px-2 prose-h3:py-1',
      )}>
      <p className="bg-accent px-2 py-1 font-semibold">
        Last updated{' '}
        <time dateTime={frontmatter.updatedAt} title={format(frontmatter.createdAt, 'PPPPpp')}>
          {format(frontmatter.updatedAt, 'PPPPpp')}
        </time>
      </p>

      {frontmatter.videoId && (
        <div className="mb-8">
          <YouTubeEmbed videoid={frontmatter.videoId} />
        </div>
      )}

      <Suspense fallback={<div>Loading article content...</div>}>{content}</Suspense>
    </article>
  );
}
