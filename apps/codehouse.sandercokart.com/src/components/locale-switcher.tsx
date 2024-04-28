import { GB, NL } from 'country-flag-icons/react/3x2';

import Link from 'next/link';
import { useRouter } from 'next/router';

import useLocale from '@/hooks/useLocale';

import { cn } from '../lib/utils';

export function LocaleSwitcher({ className, ...props }: JSX.IntrinsicElements['div']) {
  const { locale: activeLocale } = useRouter();
  const { setLocale } = useLocale();

  return (
    <div
      className={cn(
        'pointer-events-none flex min-w-[94px] justify-center gap-2 [&:hover_svg:hover]:opacity-100 [&:hover_svg]:opacity-50 [&_svg]:pointer-events-auto',
        className,
      )}
      {...props}>
      <Link href="/apps/codehouse.sandercokart.com/public" hrefLang="en" locale="en" rel="alternate" scroll={false}>
        <GB
          className={cn('h-5 cursor-pointer transition-opacity md:h-7', {
            'opacity-50': activeLocale !== 'en',
            'cursor-not-allowed': activeLocale === 'en',
          })}
          onClick={() => setLocale('en')}
        />
      </Link>
      <div className="h-5 border-r-2 !opacity-100 md:h-7" />
      <Link href="/apps/codehouse.sandercokart.com/public" hrefLang="nl" locale="nl" rel="alternate" scroll={false}>
        <NL
          className={cn('h-5 cursor-pointer transition-opacity md:h-7', {
            'opacity-50': activeLocale !== 'nl',
            'cursor-not-allowed': activeLocale === 'nl',
          })}
          onClick={() => setLocale('nl')}
        />
      </Link>
    </div>
  );
}
