import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { notFound } from 'next/navigation';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale, locale }) => {
  const requested = await requestLocale;

  // if (!hasLocale(routing.locales, locale)) {
  //   notFound();
  // }

  const resolvedLocale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale: resolvedLocale,
    messages: {
      ...(await import(`../../messages/${resolvedLocale}.json`)).default,
      ...(await import(`../../messages/zod/${resolvedLocale}.json`)).default,
    },
  };
});
