import type { MetadataRoute } from 'next';

import { env } from '@/src/env';
import { locales } from '@/src/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const localeRoutes = locales.flatMap(locale => [
    `/${locale}`,
    `/${locale}/consumer`,
    `/${locale}/freelance`,
    `/${locale}/commercial`,
    `/${locale}/commercial/proposal-a`,
    `/${locale}/commercial/proposal-b`,
    `/${locale}/commercial/proposal-c`,
    `/${locale}/commercial/proposal-d`,
  ]);

  return localeRoutes.map(route => ({
    url: `${env.SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '/en' || route === '/nl' ? 1 : 0.8,
  }));
}
