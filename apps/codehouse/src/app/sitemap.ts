import type { MetadataRoute } from 'next';

import { env } from '@/env';
import { locales } from '@/i18n/config';

const routePaths = ['', '/consumer', '/freelance', '/commercial', '/open-source'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routePaths.flatMap(routePath =>
    locales.map(locale => ({
      url: `${env.SITE_URL}/${locale}${routePath}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: routePath === '' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map(alternateLocale => [alternateLocale, `${env.SITE_URL}/${alternateLocale}${routePath}`]),
        ),
      },
    })),
  );
}
