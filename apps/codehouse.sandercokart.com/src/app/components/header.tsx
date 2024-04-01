import Link from 'next/link';

import { LocaleSwitcher } from '@/app/components/locale-toggle';
import { links } from '@/lib/nav-links';
import { cn } from '@/lib/utils';
import { getScopedI18n } from '@/locales/server';

import { ThemeToggle } from './theme-toggle';

export async function Header() {
  return (
    <header className="flex h-11 bg-primary text-primary-foreground transition-colors sm:h-16">
      <div className="container flex h-full grow items-center justify-between">
        <NamedLogo />

        <Links className="hidden sm:flex" />

        <div className="flex h-full items-center gap-8">
          <LocaleSwitcher />

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function NamedLogo() {
  return (
    <Link href="/">
      <h1 className="group flex w-min flex-col whitespace-nowrap font-digital">
        <span className="text-base !leading-none transition-colors  group-hover:text-accent sm:text-3xl">
          Sander's CodeHouse
        </span>
        <span className="self-end text-xs !leading-none  transition-colors sm:text-xl">Let's code...</span>
      </h1>
    </Link>
  );
}

async function Links({ className }: { className?: string }) {
  const t = await getScopedI18n('nav');
  return (
    <div className={cn('flex-wrap justify-center gap-x-8 gap-y-1 justify-self-center text-2xl', className)}>
      {links.map(link => (
        <Link
          key={link.href}
          className="font-digital leading-none transition-colors hover:text-accent"
          href={link.href}>
          {t(link.t)}
        </Link>
      ))}
    </div>
  );
}
