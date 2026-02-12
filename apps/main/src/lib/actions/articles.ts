import fs from 'fs';
import path from 'path';

import fg from 'fast-glob';
import frontMatter from 'front-matter';

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

  // In development, show all articles; in production, only published articles
  if (process.env.NODE_ENV === 'production') {
    return articles.filter(article => article.attributes.publishedAt && article.attributes.publishedAt.trim() !== '');
  }

  return articles;
};

const getArticleBySlug = async ({ slug }: { slug: string }): Promise<string> => {
  const paths = (await fg(`src/app/articles/**/${slug}.mdx`)) as [string];

  if (!paths.length) {
    throw new Error('Article not found');
  }

  const firstResult = paths[0];
  const content = await fs.promises.readFile(firstResult, 'utf-8');

  return content;
};

export { getArticlesByType, getArticleBySlug };
