import type { MetadataRoute } from 'next';

import { env } from '@/env';
import { getAllArticleSeoData } from '@/lib/actions/articles';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticleSeoData();

  const articleEntries: MetadataRoute.Sitemap = articles.map(article => ({
    url: `${env.SITE_URL}/articles/${article.slug}`,
    lastModified:
      article.attributes.updatedAt ||
      article.attributes.publishedAt ||
      article.attributes.createdAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    {
      url: env.SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...articleEntries,
  ];
}
