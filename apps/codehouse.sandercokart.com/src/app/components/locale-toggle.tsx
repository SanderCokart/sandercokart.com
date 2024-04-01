'use client';

import { GB, NL } from 'country-flag-icons/react/3x2';

import Link from 'next/link';

import { cn } from '@/lib/utils';
import { useChangeLocale, useCurrentLocale } from '@/locales/client';

export function LocaleSwitcher({ className, ...props }: JSX.IntrinsicElements['div']) {
  const setLocale = useChangeLocale();
  const active_locale = useCurrentLocale();

  return (
    <div
      className={cn(
        'pointer-events-none flex min-w-[94px] justify-center gap-2 [&:hover_svg:hover]:opacity-100 [&:hover_svg]:opacity-50 [&_svg]:pointer-events-auto',
        className,
      )}
      {...props}>
      <Link href="/" hrefLang="en" locale="en" rel="alternate" scroll={false}>
        <GB
          className={cn('h-5 cursor-pointer transition-opacity md:h-7', {
            'opacity-50': active_locale !== 'en',
            'cursor-not-allowed': active_locale === 'en',
          })}
          onClick={() => setLocale('en')}
        />
      </Link>
      <div className="h-5 border-r-2 !opacity-100 md:h-7" />
      <Link href="/" hrefLang="nl" locale="nl" rel="alternate" scroll={false}>
        <NL
          className={cn('h-5 cursor-pointer transition-opacity md:h-7', {
            'opacity-50': active_locale !== 'nl',
            'cursor-not-allowed': active_locale === 'nl',
          })}
          onClick={() => setLocale('nl')}
        />
      </Link>
    </div>
  );
}
