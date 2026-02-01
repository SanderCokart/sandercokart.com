import fs from 'fs';
import path from 'path';

import { Options } from '@mdx-js/loader';
import fg from 'fast-glob';
import frontMatter from 'front-matter';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import remarkGfm from 'remark-gfm';

import type { ArticleAttributes, ArticleModel } from '@/types/model-types';

const getBannerPath = async (slug: string) => {
  const files = await fs.promises.readdir('public/banners');

  const pathname = files.find(file => file.startsWith(slug)) as string;

  const filePath = `/banners/${pathname}`;

  return filePath;
};

const getArticlesByType = async (type: 'general' | 'tips') => {
  const articlePaths = await fg(`src/app/articles/${type}/*.mdx`);

  /**
   * Resolve banner for article
   * The banners have the slug of the article as name
   * Here we find the file with this name regardless of the extension and
   * return public path to it
   * @param slug
   */

  const articles = await Promise.all(
    articlePaths.map(async articlePath => {
      const content = await fs.promises.readFile(articlePath, 'utf-8');
      const matter = frontMatter<ArticleAttributes>(content);

      //resolve slug
      const slug = path.basename(articlePath).replace(/\.mdx$/, '');
      //resolve banner, banner is placed in /banners/[slug].{jpg|png,webp,svg,gif}
      const banner = await getBannerPath(slug);

      Object.assign(matter.attributes, {
        slug,
        banner,
      });

      return matter as typeof matter & ArticleModel;
    }),
  );

  return articles;
};

const remarkPlugins: Options['remarkPlugins'] = [remarkGfm];
const rehypePlugins: Options['rehypePlugins'] = [rehypeMdxCodeProps];

const getArticleBySlug = async ({ slug }: { slug: string }) => {
  const paths = (await fg(`src/app/articles/**/${slug}.mdx`)) as [string];

  if (!paths.length) {
    throw new Error('Article not found');
  }

  const firstResult = paths[0];
  const content = await fs.promises.readFile(firstResult, 'utf-8');

  return {
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [...rehypePlugins],
        remarkPlugins: [...remarkPlugins],
      },
    },
  };
};

export { getArticlesByType, getArticleBySlug };
