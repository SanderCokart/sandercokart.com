import { createSharedPathnamesNavigation } from 'next-intl/navigation';

//@ts-expect-error - This is a valid import
import type { LocalePrefix } from 'next-intl/dist/types/src/shared/types';

export const locales = ['en', 'nl'] as const;
export const localePrefix: LocalePrefix = 'as-needed'; // Default

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales, localePrefix });
