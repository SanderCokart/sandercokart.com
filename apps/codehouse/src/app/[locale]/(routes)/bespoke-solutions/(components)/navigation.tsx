'use client';

import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import { Link } from '@/src/i18n/navigation';
import { links } from '@/src/lib/nav-links';

export function Navigation() {
  return (
    <>
      <DesktopNavigation />
      <MobileNavigation />
    </>
  );
}

function DesktopNavigation() {
  const t = useTranslations('nav');

  return (
    <nav className={cn('hidden flex-wrap justify-center gap-x-8 gap-y-1 justify-self-center text-2xl md:flex')}>
      {links.map(link => (
        <Link
          key={link.href}
          className="font-digital hover:text-accent leading-none transition-colors"
          href={link.href}>
          {t(link.t)}
        </Link>
      ))}
    </nav>
  );
}

function MobileNavigation() {
  const t = useTranslations('nav');

  return (
    <nav
      className={cn(
        'bg-primary fixed inset-x-0 bottom-0 flex h-14 w-full items-center justify-evenly text-2xl md:hidden',
      )}>
      {links.map(link => (
        <Link
          key={link.href}
          className={cn(
            'font-digital hover:text-accent flex flex-col items-center gap-1 leading-none transition-colors',
          )}
          href={link.href}>
          {link.icon}
          <span className="text-xs">{t(link.t)}</span>
        </Link>
      ))}
    </nav>
  );
}
