'use client';

import { cn } from '@repo/ui/lib/utils';
import { GB as GBFlag, NL as NLFlag } from 'country-flag-icons/react/3x2';
import { useLocale } from 'next-intl';

import { LocaleCode } from '@/src/i18n/config';
import { Link, usePathname } from '@/src/i18n/navigation';

export function LocaleSwitcher() {
  const pathname = usePathname();
  const active_locale = useLocale() as LocaleCode;

  return (
    <div
      className={cn(
        'pointer-events-none flex min-w-[94px] justify-center gap-2 [&:hover_svg:hover]:opacity-100 [&:hover_svg]:opacity-50 [&_svg]:pointer-events-auto',
      )}>
      <Link replace href={`/${pathname}`} hrefLang="en" locale="en" rel="alternate" scroll={false}>
        <GBFlag
          className={cn('h-5 cursor-pointer transition-opacity md:h-7', {
            'opacity-50': active_locale !== 'en',
            'cursor-not-allowed': active_locale === 'en',
          })}
        />
      </Link>
      <div className="h-5 border-r-2 border-white !opacity-100 md:h-7" />
      <Link replace href={`/${pathname}`} hrefLang="nl" locale="nl" rel="alternate" scroll={false}>
        <NLFlag
          className={cn('h-5 cursor-pointer transition-opacity md:h-7', {
            'opacity-50': active_locale !== 'nl',
            'cursor-not-allowed': active_locale === 'nl',
          })}
        />
      </Link>
    </div>
  );
}
