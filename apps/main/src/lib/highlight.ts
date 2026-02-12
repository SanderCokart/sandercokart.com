import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers';
import { bundledLanguages, createCssVariablesTheme, createHighlighter } from 'shiki/bundle/web';

import type { HighlighterGeneric } from 'shiki';

// Singleton highlighter instance to avoid creating multiple Shiki instances
let highlighter: HighlighterGeneric<any, any> | null = null;

const cssVariableTheme = createCssVariablesTheme({
  name: 'css-variables',
  variablePrefix: '--shiki-',
  variableDefaults: {},
  fontStyle: true,
});

export const getHighlighter = async () => {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: [
        // 'github-dark',
        //  'github-light'
        cssVariableTheme,
      ],
      langs: [...Object.keys(bundledLanguages)],
    });
  }
  return highlighter;
};

export const highlightCode = async (code: string, lang: string = 'plaintext', meta?: string | null) => {
  const highlighter = await getHighlighter();
  if (!highlighter) {
    throw new Error('Failed to initialize syntax highlighter');
  }

  return highlighter.codeToHtml(code, {
    lang,
    meta: meta != null && meta !== '' ? { __raw: meta } : undefined,
    transformers: [
      transformerMetaHighlight(),
      transformerNotationDiff(),
      transformerNotationFocus(),
      transformerNotationHighlight(),
      transformerNotationWordHighlight(),
      transformerNotationErrorLevel(),
    ],
    theme: 'css-variables',
  });
};
