'use client';

import { useTranslation } from 'next-i18next';

import Link from 'next/link';

import { links } from '@/lib/nav-links';
import { cn } from '@/lib/utils';

export function Navigation({ className }: { className?: string }) {
  const { t } = useTranslation(['nav']);

  return (
    <>
      <nav
        className={cn(
          'hidden flex-wrap justify-center gap-x-8 gap-y-1 justify-self-center text-2xl md:flex',
          className,
        )}>
        {links.map(link => (
          <Link
            key={link.href}
            className="font-digital hover:text-accent leading-none transition-colors"
            href={link.href}>
            {t(link.t)}
          </Link>
        ))}
      </nav>
      <nav
        className={cn(
          'bg-primary fixed inset-x-0 bottom-0 flex h-14 w-full items-center justify-evenly text-2xl md:hidden',
          className,
        )}>
        {links.map(link => (
          <Link
            className={cn(
              'font-digital hover:text-accent flex flex-col items-center gap-1 leading-none transition-colors',
            )}
            href={link.href}>
            {link.icon}
            <span className="text-xs">{t(link.t)}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
