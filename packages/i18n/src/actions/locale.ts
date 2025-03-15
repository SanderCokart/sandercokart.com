'use server';

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '#config.ts';

import { cookies, headers } from 'next/headers';

import type { LocaleType } from '#config.ts';

const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale(): Promise<LocaleType> {
  const h = headers().get('accept-language');
  const acceptLanguage: LocaleType = h ? (h.split(',')[0]?.split('-')[0] as LocaleType) : DEFAULT_LOCALE;

  const cookieLocale: LocaleType | undefined = cookies().get(COOKIE_NAME)?.value as LocaleType;

  const validLocale = SUPPORTED_LOCALES.includes(acceptLanguage) ? acceptLanguage : DEFAULT_LOCALE;

  return cookieLocale || validLocale || DEFAULT_LOCALE;
}

export async function setUserLocale(locale: LocaleType) {
  cookies().set(COOKIE_NAME, locale);
}
