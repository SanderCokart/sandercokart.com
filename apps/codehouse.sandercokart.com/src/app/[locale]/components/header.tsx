import { Links } from '@/app/[locale]/components/links';
import { NamedLogo } from '@/app/[locale]/components/named-logo';

import { LocaleSwitcher } from './locale-switcher';
import { ThemeToggle } from './theme-toggle';

export function Header() {
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
