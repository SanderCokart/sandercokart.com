import { YouTubeEmbed } from '@next/third-parties/google';
import { cn } from '@repo/ui/lib/utils';
import { evaluate } from 'next-mdx-remote-client/rsc';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import remarkGfm from 'remark-gfm';

import type { Page } from '@/types/common';
import type { EvaluateOptions } from 'next-mdx-remote-client/rsc';
import type { RehypeMdxCodePropsOptions } from 'rehype-mdx-code-props';

import components from '@/app/articles/[slug]/components';
import { getArticleBySlug } from '@/lib/actions/articles';

import BackToTopButton from './components/back-to-top-button';

type PARAMS = { slug: string };
type SEARCH_PARAMS = null;

const options: EvaluateOptions = {
  parseFrontmatter: true,
  mdxOptions: {
    rehypePlugins: [[rehypeMdxCodeProps, { tagName: 'pre' } as RehypeMdxCodePropsOptions]],
    remarkPlugins: [remarkGfm],
  },
};

type ArticleMetaType = { videoId?: string; updatedAt: string; publishedAt?: string };

export default async function ArticlePage({ params }: Page<PARAMS, SEARCH_PARAMS>) {
  const resolvedParams = await params;
  const source = await getArticleBySlug(resolvedParams);

  const { content, frontmatter, error } = await evaluate<ArticleMetaType>({
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
        // Overall article styling and layout
        'mx-auto w-full max-w-full px-4 py-4 sm:px-6 md:py-6 lg:max-w-4xl lg:py-16',
        // Prose classes
        'prose prose-sm sm:prose-base dark:prose-invert',
        // Heading text color, paragraph text color, strong text color
        'prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground',
        // Link styling
        'prose-a:text-accent prose-a:visited:text-green-400',
        // H1 styling
        'prose-h1:text-center prose-h1:text-balance',
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
      <header className="border-primary dark:border-accent mb-8 border-b pb-4">
        <div
          className={cn(
            'flex flex-col gap-4 sm:flex-row sm:justify-between sm:gap-0',
            !frontmatter.updatedAt && 'items-center',
          )}>
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
          {frontmatter.updatedAt && (
            <time
              className="text-muted-foreground self-end font-mono text-xs uppercase tracking-widest"
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
        <div className="my-8 [&_lite-youtube]:mx-auto [&_lite-youtube]:w-full">
          <YouTubeEmbed videoid={frontmatter.videoId} />
        </div>
      )}

      <BackToTopButton />

      {content}
    </article>
  );
}