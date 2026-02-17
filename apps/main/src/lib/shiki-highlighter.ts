import { bundledLanguages, createCssVariablesTheme, createHighlighter } from 'shiki';

import type { HighlighterGeneric } from 'shiki';

/**
 * Shiki syntax highlighting utilities for code presentation in articles.
 *
 * This module provides centralized Shiki highlighter management with:
 * - CSS variables-based theming for consistent styling across light/dark modes
 * - Singleton highlighter instance to avoid recreating the expensive WebAssembly-based highlighter
 * - Global caching to persist highlighter state across component re-renders
 * - Support for all bundled Shiki languages and themes
 */

declare global {
  var shikiHighlighter: HighlighterGeneric<any, any> | undefined;
}

export const cssVariableTheme = createCssVariablesTheme({
  name: 'css-variables',
  variablePrefix: '--shiki-',
  variableDefaults: {},
  fontStyle: true,
});

let highlighterInstance: HighlighterGeneric<any, any> | null = null;

export const getHighlighterSync = async () => {
  if (!highlighterInstance) {
    if (globalThis.shikiHighlighter) {
      highlighterInstance = globalThis.shikiHighlighter;
    } else {
      highlighterInstance = await createHighlighter({
        themes: [cssVariableTheme],
        langs: [...Object.keys(bundledLanguages)],
      });
      globalThis.shikiHighlighter = highlighterInstance;
    }
  }
  return highlighterInstance;
};
