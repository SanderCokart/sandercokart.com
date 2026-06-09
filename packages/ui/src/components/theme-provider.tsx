import { ThemeProvider as WrkszThemeProvider } from '@wrksz/themes/next';

import type { ThemeProviderProps } from '@wrksz/themes/next';

export type { ThemeProviderProps };

/**
 * Shared dark-mode provider for all frontends. Defaults are set here so every app
 * behaves the same; pass props only when an app truly needs different behavior.
 */
export async function ThemeProvider({ children, ...props }: ThemeProviderProps<'light' | 'dark'>) {
  return (
    <WrkszThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}>
      {children}
    </WrkszThemeProvider>
  );
}
