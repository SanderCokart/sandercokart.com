'use client';

import { useTranslations } from 'next-intl';

import { links } from '@/lib/nav-links';
import { Link } from '@/lib/navigation';
import { cn } from '@/lib/utils';

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
          className="font-digital leading-none transition-colors hover:text-accent"
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
        'fixed inset-x-0 bottom-0 flex h-14 w-full items-center justify-evenly bg-primary text-2xl md:hidden',
      )}>
      {links.map(link => (
        <Link
          key={link.href}
          className={cn(
            'flex flex-col items-center gap-1 font-digital leading-none transition-colors hover:text-accent',
          )}
          href={link.href}>
          {link.icon}
          <span className="text-xs">{t(link.t)}</span>
        </Link>
      ))}
    </nav>
  );
}
