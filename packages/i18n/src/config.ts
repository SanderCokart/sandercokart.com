export type LocaleType = (typeof SUPPORTED_LOCALES)[number];

export const SUPPORTED_LOCALES = ['en', 'nl'] as const;
export const DEFAULT_LOCALE: LocaleType = 'en';

export type SupportedLocalesType = (typeof SUPPORTED_LOCALES)[number];
