import type { ReactNode } from 'react';

import { ScrollProgressIndicator } from './scroll-progress-indicator';
import { ThemeToggle } from './theme-toggle';

export interface HeaderProps {
  localeSwitcher?: ReactNode;
  namedLogo: ReactNode;
  navigation: ReactNode;
}

export function Header({ navigation, localeSwitcher, namedLogo }: HeaderProps) {
  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-10 flex h-11 transition-colors sm:h-16">
      <div className="container flex h-full grow items-center justify-between">
        {namedLogo}

        {navigation}

        <div className="flex h-full items-center gap-2">
          {localeSwitcher}

          <ThemeToggle />
        </div>
      </div>
      <ScrollProgressIndicator className="absolute bottom-0" />
    </header>
  );
}
