export type Locale = (typeof locales)[number];

export const locales = ['en', 'nl'] as const;

export type LocaleCode = (typeof locales)[number];

export const defaultLocale: Locale = 'en';
