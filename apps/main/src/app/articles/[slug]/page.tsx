import { cn } from '@repo/ui/lib/utils';
import { evaluate } from 'next-mdx-remote-client/rsc';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import remarkGfm from 'remark-gfm';

import type { Page } from '@/types/common';
import type { EvaluateOptions } from 'next-mdx-remote-client/rsc';
import type { Metadata } from 'next';
import type { RehypeMdxCodePropsOptions } from 'rehype-mdx-code-props';

import components from '@/app/articles/[slug]/components';
import { env } from '@/env';
import { getArticleBySlug, getArticleSeoBySlug } from '@/lib/actions/articles';

import ArticleMeta from './components/article-meta';
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

type ArticleMetaType = {
  videoId?: string;
  updatedAt?: string;
  publishedAt?: string;
  authors: string[];
  videoPublishedAt?: string;
  createdAt: string;
};

export async function generateMetadata({ params }: Page<PARAMS, SEARCH_PARAMS>): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleSeoBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath = `/articles/${article.slug}`;
  const articleUrl = `${env.SITE_URL}${canonicalPath}`;
  const title = article.attributes.title;
  const description = article.attributes.summary;
  const publishedTime = article.attributes.publishedAt || article.attributes.createdAt;
  const modifiedTime = article.attributes.updatedAt || undefined;
  const image = article.banner ? `${env.SITE_URL}${article.banner}` : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: 'article',
      siteName: 'sandercokart.com',
      url: articleUrl,
      title,
      description,
      publishedTime,
      modifiedTime,
      authors: article.attributes.authors,
      images: image
        ? [
            {
              url: image,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      images: image ? [image] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

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
        'prose-a:text-accent prose-a:visited:text-amber-100',
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
      <ArticleMeta frontmatter={frontmatter} />
      <div className="pointer-events-none fixed bottom-4 left-0 right-0 z-10">
        <div className="mx-auto flex w-full max-w-full justify-end px-4 sm:px-6 lg:max-w-5xl">
          <BackToTopButton className="pointer-events-auto" />
        </div>
      </div>
      {content}
    </article>
  );
}
