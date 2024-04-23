import { Links } from './links';
import { LocaleSwitcher } from './locale-switcher';
import { NamedLogo } from './named-logo';
import { ScrollProgressIndicator } from './scroll-progress-indicator';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-11 bg-primary text-primary-foreground transition-colors sm:h-16">
      <div className="container flex h-full grow items-center justify-between">
        <NamedLogo />

        <Links className="hidden md:flex" />

        <div className="flex h-full items-center gap-2">
          <LocaleSwitcher />

          <ThemeToggle />
        </div>
      </div>
      <ScrollProgressIndicator className="absolute bottom-0" />
    </header>
  );
}
