import { promises } from 'fs';

import fg from 'fast-glob';
import frontMatter from 'front-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

import type { Page } from '@/types/common';

import { cn } from '@/lib/utils';

import components from './components';

type PARAMS = { slug: string };
type SEARCH_PARAMS = {};

const getArticle = async ({ slug }: PARAMS) => {
  const paths = (await fg(`src/app/articles/**/${slug}.mdx`)) as [string];

  if (paths.length !== 1) {
    throw new Error('Article not found');
  }

  const path = paths[0];

  const content = await promises.readFile(path, 'utf-8');

  const matter = frontMatter(content);

  return matter;
};

const remarkPlugins: any[] = [remarkGfm];
const rehypePlugins: any[] = [];

export default async function ArticlePage({ params }: Page<PARAMS, SEARCH_PARAMS>) {
  const articles = await getArticle(params);

  return (
    <article
      className={cn(
        'prose dark:prose-invert container py-32',
        'prose-h2:bg-accent prose-h2:text-accent-foreground prose-h2:px-2 prose-h2:py-1',
        'prose-h3:border-l-8 prose-h3:border-accent prose-h3:px-2 prose-h3:py-1',
      )}>
      <MDXRemote
        components={components}
        options={{ mdxOptions: { remarkPlugins, rehypePlugins } }}
        source={articles.body}
      />
    </article>
  );
}
