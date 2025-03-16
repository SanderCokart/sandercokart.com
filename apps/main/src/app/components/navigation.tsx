'use client';

import { cn } from '@repo/ui/lib/utils';

import Link from 'next/link';

import { links } from '@/lib/nav-links';

export function Navigation() {
  return (
    <>
      <DesktopNavigation />
      <MobileNavigation />
    </>
  );
}

function DesktopNavigation() {
  return (
    <nav className={cn('hidden flex-wrap justify-center gap-x-8 gap-y-1 justify-self-center text-2xl md:flex')}>
      {links.map(link => (
        <Link
          key={link.href}
          className="font-digital hover:text-accent leading-none transition-colors"
          href={link.href}>
          {link.text}
        </Link>
      ))}
    </nav>
  );
}

function MobileNavigation() {
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
          <span className="text-xs">{link.text}</span>
        </Link>
      ))}
    </nav>
  );
}
