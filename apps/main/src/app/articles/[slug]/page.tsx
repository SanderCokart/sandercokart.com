import { YouTubeEmbed } from '@next/third-parties/google';
import { cn } from '@repo/ui/lib/utils';
import { format } from 'date-fns';
import { getMDXComponent } from 'mdx-bundler/client';

import type { Page } from '@/types/common';

import components from '@/app/articles/[slug]/components';
import { getArticleBySlug } from '@/lib/actions/articles';

type PARAMS = { slug: string };
type SEARCH_PARAMS = null;

export default async function ArticlePage({ params }: Page<PARAMS, SEARCH_PARAMS>) {
  const { frontmatter, code } = await getArticleBySlug(await params);
  const Component = getMDXComponent(code);

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
      <Component components={components} />
      <h1>Article temporarily disabled for debugging</h1>
      <p>The MDX component rendering has been commented out to debug the error.</p>
      <p>Title: {frontmatter.title}</p>
    </article>
  );
}
