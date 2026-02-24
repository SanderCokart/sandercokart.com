import { bundledLanguages, createCssVariablesTheme, createHighlighter } from 'shiki';

import type { Highlighter } from 'shiki';

/**
 * Shiki syntax highlighting utilities for code presentation in articles.
 *
 * This module provides centralized Shiki highlighter management with:
 * - CSS variables-based theming for consistent styling across light/dark modes
 * - Module-level singleton highlighter instance to avoid recreating the expensive WebAssembly-based highlighter
 * - Singleton persists across component re-renders within the same module scope
 * - Support for all bundled Shiki languages and themes
 */

export const cssVariableTheme = createCssVariablesTheme({
  name: 'css-variables',
  variablePrefix: '--shiki-',
  variableDefaults: {},
  fontStyle: true,
});

const globalForShiki = globalThis as unknown as {
  highlighter: Highlighter | undefined;
};

export const getHighlighter = async (): Promise<Highlighter> => {
  if (!globalForShiki.highlighter) {
    globalForShiki.highlighter = await createHighlighter({
      themes: [cssVariableTheme],
      langs: [...Object.keys(bundledLanguages)],
    });
  }
  return globalForShiki.highlighter;
};
