'use client';

import { cn } from '@repo/ui/lib/utils';
import { GB as GBFlag, NL as NLFlag } from 'country-flag-icons/react/3x2';
import { useLocale } from 'next-intl';

import { Link, usePathname } from '@/src/i18n/navigation';

export function LocaleSwitcher() {
  // next-intl's usePathname already includes a leading `/` and omits the locale prefix.
  const pathname = usePathname();
  const activeLocale = useLocale();

  return (
    <div
      className={cn(
        'pointer-events-none flex min-w-[94px] justify-center gap-2 [&_svg]:pointer-events-auto [&:hover_svg]:opacity-50 [&:hover_svg:hover]:opacity-100',
      )}>
      <Link replace href={pathname} hrefLang="en" locale="en" rel="alternate" scroll={false}>
        <GBFlag
          className={cn('h-5 cursor-pointer transition-opacity sm:h-7', {
            'opacity-50': activeLocale !== 'en',
            'cursor-not-allowed': activeLocale === 'en',
          })}
        />
      </Link>
      <div className="h-5 border-r-2 border-white opacity-100! sm:h-7" />
      <Link replace href={pathname} hrefLang="nl" locale="nl" rel="alternate" scroll={false}>
        <NLFlag
          className={cn('h-5 cursor-pointer transition-opacity sm:h-7', {
            'opacity-50': activeLocale !== 'nl',
            'cursor-not-allowed': activeLocale === 'nl',
          })}
        />
      </Link>
    </div>
  );
}
