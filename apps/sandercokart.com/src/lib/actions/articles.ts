'use server';

import fs from 'fs';
import path from 'path';

import fg from 'fast-glob';
import frontMatter from 'front-matter';

type AppendedArticleAttributes = { slug: string; banner: string | null };
type ArticleAttributes = {
  createdAt: string;
  updatedAt: string;
  title: string;
  publishedAt: string;
  authors: string[];
  summary: string;
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
  const resolveBanner = async (slug: string): Promise<string | null> | never => {
    const banners = (await fg(`public/banners/${slug}.*`, { onlyFiles: true })) as [string];

    if (banners.length !== 1) {
      return null;
    }

    let relativePath = path.relative('public', banners[0]);

    return `/${relativePath}`;
  };

  const articles = await Promise.all(
    articlePaths.map(async articlePath => {
      const content = await fs.promises.readFile(articlePath, 'utf-8');
      const matter = frontMatter<ArticleAttributes>(content);

      //resolve slug
      const slug = path.basename(articlePath).replace(/\.mdx$/, '');
      //resolve banner, banner is placed in /banners/[slug].{jpg|png,webp,svg,gif}
      const banner = await resolveBanner(slug);

      Object.assign(matter.attributes, {
        slug,
        banner,
      });

      return matter as typeof matter & { attributes: ArticleAttributes & AppendedArticleAttributes };
    }),
  );

  return articles;
};

export { getArticlesByType };
