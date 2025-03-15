'use client';

import { GB as GBFlag, NL as NLFlag } from 'country-flag-icons/react/3x2';
import { useLocale } from 'next-intl';

import type { Locales } from '@/types/common';

import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const active_locale = useLocale() as Locales;

  const setAppLocale = async (locale: Locales) => {
    router.replace(pathname, { locale });
  };

  return (
    <div
      className={cn(
        'pointer-events-none flex min-w-[94px] justify-center gap-2 [&:hover_svg:hover]:opacity-100 [&:hover_svg]:opacity-50 [&_svg]:pointer-events-auto',
      )}>
      <Link href={`/${pathname}`} hrefLang="en" locale="en" rel="alternate" scroll={false}>
        <GBFlag
          className={cn('h-5 cursor-pointer transition-opacity md:h-7', {
            'opacity-50': active_locale !== 'en',
            'cursor-not-allowed': active_locale === 'en',
          })}
          onClick={() => setAppLocale('en')}
        />
      </Link>
      <div className="h-5 border-r-2 border-white !opacity-100 md:h-7" />
      <Link href={`/${pathname}`} hrefLang="nl" locale="nl" rel="alternate" scroll={false}>
        <NLFlag
          className={cn('h-5 cursor-pointer transition-opacity md:h-7', {
            'opacity-50': active_locale !== 'nl',
            'cursor-not-allowed': active_locale === 'nl',
          })}
          onClick={() => setAppLocale('nl')}
        />
      </Link>
    </div>
  );
}
