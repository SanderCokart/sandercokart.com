import { promises } from 'fs';

import { YouTubeEmbed } from '@next/third-parties/google';
import fg from 'fast-glob';
import frontMatter from 'front-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

import type { Page } from '@/types/common';

import { getArticleBySlug } from '@/lib/actions/articles';
import { cn } from '@/lib/utils';

import components from './components';

type PARAMS = { slug: string };
type SEARCH_PARAMS = {};

const remarkPlugins: any[] = [remarkGfm];
const rehypePlugins: any[] = [];

export default async function ArticlePage({ params }: Page<PARAMS, SEARCH_PARAMS>) {
  const article = await getArticleBySlug(params);

  return (
    <article
      className={cn(
        'prose dark:prose-invert container py-16',
        'prose-h2:bg-accent prose-h2:text-accent-foreground prose-h2:px-2 prose-h2:py-1',
        'prose-h3:border-l-8 prose-h3:border-accent prose-h3:px-2 prose-h3:py-1',
      )}>
      {article.attributes.videoId && (
        <div className="mb-8">
          <YouTubeEmbed videoid={article.attributes.videoId} />
        </div>
      )}
      <MDXRemote
        components={components}
        options={{ mdxOptions: { remarkPlugins, rehypePlugins } }}
        source={article.body}
      />
    </article>
  );
}
