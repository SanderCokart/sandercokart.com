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
        'prose prose-lg dark:prose-invert mx-auto max-w-3xl px-4 py-8 sm:px-6 md:py-12 lg:py-16',
        // Prose color customizations for better contrast
        'prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground',
        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
        // H2 styling - subtle bottom border accent instead of full background
        'prose-h2:border-b-2 prose-h2:border-accent prose-h2:pb-2 prose-h2:mt-12 prose-h2:mb-6',
        // H3 styling - refined left border accent
        'prose-h3:border-l-4 prose-h3:border-accent prose-h3:pl-4 prose-h3:mt-8 prose-h3:mb-4',
        // List styling
        'prose-li:marker:text-accent',
        // Code styling
        'prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none',
        // Blockquote styling
        'prose-blockquote:border-l-accent prose-blockquote:bg-muted/50 prose-blockquote:py-1 prose-blockquote:not-italic',
      )}>
      <p className="rounded-md bg-muted px-4 py-2 text-sm text-muted-foreground">
        Last updated{' '}
        <time
          className="font-medium text-foreground"
          dateTime={frontmatter.updatedAt}
          title={format(frontmatter.createdAt, 'PPPPpp')}>
          {format(frontmatter.updatedAt, 'PPPPpp')}
        </time>
      </p>

      {frontmatter.videoId && (
        <div className="my-8">
          <YouTubeEmbed videoid={frontmatter.videoId} />
        </div>
      )}

      <Suspense fallback={<div>Loading article content...</div>}>{content}</Suspense>
    </article>
  );
}
