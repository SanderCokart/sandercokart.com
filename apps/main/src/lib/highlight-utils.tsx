import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { codeToHast } from 'shiki';
import { bundledLanguages, createHighlighter } from 'shiki/bundle/web';

import { Fragment } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

import type { JSX } from 'react';
import type { BundledLanguage, HighlighterGeneric } from 'shiki';

// Singleton highlighter instance to avoid creating multiple Shiki instances
let highlighter: HighlighterGeneric<any, any> | null = null;

const getHighlighter = async () => {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: [...Object.keys(bundledLanguages)],
    });
  }
  return highlighter;
};

export async function highlightCode(
  code: string,
  lang: string,
  isCodeBlock: boolean = true,
): Promise<JSX.Element | null> {
  if (!isCodeBlock) {
    return null; // For inline code, let the component handle styling
  }

  const highlighter = await getHighlighter();
  if (!highlighter) {
    throw new Error('Failed to initialize syntax highlighter');
  }

  const hast = await codeToHast(code, {
    lang: (lang as BundledLanguage) || 'plaintext',
    themes: {
      dark: 'github-dark',
      light: 'github-light',
    },
    transformers: [
      transformerNotationDiff(),
      transformerNotationFocus(),
      transformerNotationHighlight(),
      transformerNotationWordHighlight(),
      transformerNotationErrorLevel(),
      transformerMetaHighlight(),
      transformerMetaWordHighlight(),
    ],
  });

  return toJsxRuntime(hast, {
    Fragment,
    jsx,
    jsxs,
    components: {
      // Custom pre component will be handled by the parent component
      pre: props => <pre {...props} />,
      // Custom code component will be handled by the parent component
      code: props => <code {...props} />,
    },
  }) as JSX.Element;
}
