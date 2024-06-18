// src/app/[type]/[slug]/page.tsx

//fetch articles from src/articles
// the first level of the articles folder contains article types such as general or tips
// the second level of the articles folder contains articles
import fs from 'fs';

import frontMatter from 'front-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

import type { Page } from '@/types/common';

import components from './components';

type PARAMS = { type: string; slug: string };
type SEARCH_PARAMS = {};

const getArticle = ({ slug, type }: PARAMS) => {
  const path = `src/app/articles/${type}/${slug}.mdx`;
  const content = fs.readFileSync(path, 'utf-8');

  const matter = frontMatter(content);

  return matter;
};

const remarkPlugins: any[] = [remarkGfm];
const rehypePlugins: any[] = [];

export default async function ArticlePage({ params: { slug, type } }: Page<PARAMS, SEARCH_PARAMS>) {
  const articles = await getArticle({ type, slug });

  return (
    <>
      {/*<pre>*/}
      {/*  <code>{JSON.stringify(articles, null, 2)}</code>*/}
      {/*</pre>*/}
      <article className="prose lg:prose-2xl prose-md sm:prose-lg md:prose-xl dark:prose-invert container py-32">
        <MDXRemote
          components={components}
          options={{ mdxOptions: { remarkPlugins, rehypePlugins } }}
          source={articles.body}
        />
      </article>
    </>
  );
}
