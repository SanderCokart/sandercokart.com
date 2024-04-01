'use client';

import { GB as GBFlag, NL as NLFlag } from 'country-flag-icons/react/3x2';

import { useParams } from 'next/navigation';

import { Link, usePathname, useRouter } from '@/lib/navigation';
import { cn } from '@/lib/utils';

export function LocaleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale: active_locale } = useParams<{
    locale: 'en' | 'nl';
  }>();

  const setLocale = (locale: 'en' | 'nl') => {
    router.replace(pathname, { locale });
  };

  return (
    <div
      className={cn(
        'pointer-events-none flex min-w-[94px] justify-center gap-2 [&:hover_svg:hover]:opacity-100 [&:hover_svg]:opacity-50 [&_svg]:pointer-events-auto',
      )}>
      <Link href="/" hrefLang="en" locale="en" rel="alternate" scroll={false}>
        <GBFlag
          className={cn('h-5 cursor-pointer transition-opacity md:h-7', {
            'opacity-50': active_locale !== 'en',
            'cursor-not-allowed': active_locale === 'en',
          })}
          onClick={() => setLocale('en')}
        />
      </Link>
      <div className="h-5 border-r-2 !opacity-100 md:h-7" />
      <Link href="/" hrefLang="nl" locale="nl" rel="alternate" scroll={false}>
        <NLFlag
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
