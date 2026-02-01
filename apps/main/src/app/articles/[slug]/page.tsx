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
    <article className="mx-auto max-w-2xl px-6 py-12 sm:px-8 md:py-20 lg:py-24">
      {/* Metadata header */}
      <header className="mb-12 border-b border-border/40 pb-8">
        <time
          className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
          dateTime={frontmatter.updatedAt}
          title={format(frontmatter.createdAt, 'PPPPpp')}>
          {format(frontmatter.updatedAt, 'MMMM d, yyyy')}
        </time>
      </header>

      {frontmatter.videoId && (
        <div className="mb-12">
          <YouTubeEmbed videoid={frontmatter.videoId} />
        </div>
      )}

      {/* Article content with refined prose styling */}
      <div
        className={cn(
          'prose prose-neutral dark:prose-invert',
          // Base typography - clean and readable
          'prose-p:text-foreground/85 prose-p:leading-relaxed',
          'prose-strong:text-foreground prose-strong:font-semibold',
          // Headings - typography-driven hierarchy, no colored accents
          'prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-tight prose-headings:text-foreground',
          'prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-0',
          'prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:border-b prose-h2:border-border/30 prose-h2:pb-3',
          'prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:font-medium',
          'prose-h4:text-base prose-h4:mt-8 prose-h4:mb-3 prose-h4:font-semibold prose-h4:uppercase prose-h4:tracking-wide prose-h4:text-muted-foreground',
          // Links - subtle underline style
          'prose-a:text-foreground prose-a:underline prose-a:decoration-border prose-a:underline-offset-4 prose-a:transition-colors hover:prose-a:decoration-foreground',
          // Lists - clean markers
          'prose-li:text-foreground/85 prose-li:marker:text-muted-foreground',
          'prose-ul:my-6 prose-ol:my-6',
          // Code - monochromatic styling
          'prose-code:text-foreground prose-code:bg-muted/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none',
          'prose-pre:bg-card prose-pre:border prose-pre:border-border/50 prose-pre:rounded-lg',
          // Blockquotes - elegant left border
          'prose-blockquote:border-l-2 prose-blockquote:border-muted-foreground/30 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-foreground/70',
          // Images
          'prose-img:rounded-lg prose-img:shadow-sm',
          // Horizontal rules
          'prose-hr:border-border/40 prose-hr:my-12',
        )}>
        <Suspense fallback={<div className="animate-pulse text-muted-foreground">Loading article content...</div>}>
          {content}
        </Suspense>
      </div>
    </article>
  );
}
