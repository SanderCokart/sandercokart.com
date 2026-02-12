import { YouTubeEmbed } from '@next/third-parties/google';
import { cn } from '@repo/ui/lib/utils';
import { evaluate } from 'next-mdx-remote-client/rsc';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import remarkGfm from 'remark-gfm';

import { Suspense } from 'react';

import type { Page } from '@/types/common';
import type { EvaluateOptions } from 'next-mdx-remote-client/rsc';

import components from '@/app/articles/[slug]/components';
import { getArticleBySlug } from '@/lib/actions/articles';

type PARAMS = { slug: string };
type SEARCH_PARAMS = null;

const remarkPlugins = [remarkGfm];
// Plugin must be passed as [plugin, options] so it receives correct `this` from the processor
const rehypePlugins = [[rehypeMdxCodeProps, { tagName: 'code' }]] as NonNullable<
  EvaluateOptions['mdxOptions']
>['rehypePlugins'];

const options: EvaluateOptions = {
  parseFrontmatter: true,
  mdxOptions: {
    rehypePlugins,
    remarkPlugins,
  },
};

export default async function ArticlePage({ params }: Page<PARAMS, SEARCH_PARAMS>) {
  const source = await getArticleBySlug(await params);

  const { content, frontmatter, error } = await evaluate<{ videoId?: string; updatedAt: string; publishedAt?: string }>(
    {
      source,
      options,
      components,
    },
  );

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
        // Overall article styling and layout
        'prose prose-lg dark:prose-invert mx-auto max-w-3xl px-4 py-8 sm:px-6 md:py-12 lg:py-16',
        // Heading text color, paragraph text color, strong text color
        'prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground',
        // Link styling
        'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
        // H2 styling
        'prose-h2:border-b-2 prose-h2:border-primary dark:prose-h2:border-accent prose-h2:pb-2 prose-h2:mt-12 prose-h2:mb-6',
        // H3 styling
        'prose-h3:border-l-4 prose-h3:border-primary dark:prose-h3:border-accent prose-h3:pl-4 prose-h3:mt-8 prose-h3:mb-4',
        // List item marker styling
        'prose-li:marker:text-primary dark:prose-li:marker:text-accent',
        // Code styling
        'prose-code:text-accent prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none',
        // Blockquote styling
        'prose-blockquote:border-l-primary dark:prose-blockquote:border-l-accent prose-blockquote:bg-muted/50 prose-blockquote:py-1 prose-blockquote:not-italic',
      )}>
      <header className="border-primary dark:border-accent mb-12 border-b pb-8">
        <div className="flex justify-between">
          {frontmatter.publishedAt && (
            <time
              className="text-muted-foreground font-mono text-xs uppercase tracking-widest"
              dateTime={frontmatter.publishedAt}
              title={new Date(frontmatter.publishedAt).toLocaleString(navigator.language, {
                dateStyle: 'long',
                timeStyle: 'medium',
              })}
              suppressHydrationWarning>
              Published on{' '}
              {new Date(frontmatter.publishedAt).toLocaleDateString(navigator.language, {
                dateStyle: 'long',
              })}
            </time>
          )}
          {frontmatter.updatedAt && frontmatter.updatedAt !== frontmatter.publishedAt && (
            <time
              className="text-muted-foreground font-mono text-xs uppercase tracking-widest"
              dateTime={frontmatter.updatedAt}
              title={new Date(frontmatter.updatedAt).toLocaleString(navigator.language, {
                dateStyle: 'medium',
                timeStyle: 'medium',
              })}
              suppressHydrationWarning>
              Updated on{' '}
              {new Date(frontmatter.updatedAt).toLocaleDateString(navigator.language, {
                dateStyle: 'long',
              })}
            </time>
          )}
        </div>
      </header>

      {frontmatter.videoId && (
        <div className="my-8">
          <YouTubeEmbed videoid={frontmatter.videoId} />
        </div>
      )}

      <Suspense fallback={<div>Loading article content...</div>}>{content}</Suspense>
    </article>
  );
}
