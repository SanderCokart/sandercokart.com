import { getRequestConfig } from 'next-intl/server';

import { getUserLocale } from './actions/locale';

/**
 * @example
 * ```ts
 * import {createRequestConfig} from '@repo/i18n';
 *
 * export default createRequestConfig([
 *  (locale) => import(`../../messages/${locale}.json`),
 * ]);
 * ```
 */
export function createRequestConfig(additionalImports: ((locale: string) => Promise<any>)[]) {
  return getRequestConfig(async () => {
    const locale = await getUserLocale();

    const messages = {
      ...(await import(`./messages/zod/${locale}.json`)).default,
    };

    for (const importFn of additionalImports) {
      const additionalMessages = (await importFn(locale)).default;
      Object.assign(messages, additionalMessages);
    }

    return {
      locale,
      messages,
    };
  });
}
