export type Locale = (typeof locales)[number];

export const locales = ['en', 'nl'] as const;
export const defaultLocale: Locale = 'en';
