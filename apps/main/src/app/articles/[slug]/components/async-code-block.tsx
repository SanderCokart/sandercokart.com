import { ScrollArea, ScrollBar } from '@repo/ui/components/shadcn/scroll-area';
import { cn } from '@repo/ui/lib/utils';
import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';

import { Fragment, Suspense } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

import type { ComponentProps, ComponentPropsWithoutRef, ReactNode } from 'react';

import { getHighlighterSync } from '@/lib/shiki-highlighter';

import { languageIconMap } from '../utils/language-icons';
import { CopyCodeButton } from './copy-code-button';

/**
 * Async component that performs syntax highlighting using Shiki and renders code blocks.
 *
 * This server component handles the heavy lifting of code syntax highlighting by:
 * - Initializing a Shiki highlighter instance
 * - Converting code to highlighted HTML AST using Shiki transformers
 * - Rendering the result as JSX with custom components for pre/code elements
 * - Including language icons and copy-to-clipboard functionality
 *
 * The component uses Shiki's advanced features like meta highlighting, diff notation,
 * focus highlighting, and error level indicators for rich code presentation.
 */

/**
 * Async function that performs syntax highlighting and returns a React component.
 *
 * @param code - The source code content to highlight
 * @param lang - Programming language identifier for syntax highlighting
 * @param meta - Optional metadata string for advanced highlighting features
 * @param className - Optional CSS class for additional styling
 * @param props - Additional HTML element properties
 * @returns Promise resolving to a ReactNode containing the highlighted code
 */
export async function AsyncCodeBlock({
  code,
  lang,
  meta,
}: {
  code: string;
  lang: string;
  meta?: string;
  className?: string;
} & ComponentPropsWithoutRef<'code'>) {
  const highlighter = await getHighlighterSync();

  const out = highlighter.codeToHast(code, {
    lang,
    theme: 'css-variables',
    meta: {
      __raw: meta,
    },
    transformers: [
      transformerMetaHighlight(),
      transformerNotationDiff(),
      transformerNotationFocus(),
      transformerNotationHighlight(),
      transformerNotationWordHighlight(),
      transformerNotationErrorLevel(),
    ],
  });

  const getLanguageIcon = (lang: string) => {
    const IconComponent = languageIconMap[lang];

    return (
      <Suspense fallback={<span>{lang}</span>}>{IconComponent ? <IconComponent className="size-6" /> : lang}</Suspense>
    );
  };

  const pre = ({ className, children, ...props }: ComponentProps<typeof ScrollArea>) => {
    return (
      <ScrollArea
        {...props}
        className={cn('not-prose border-accent relative overflow-hidden rounded-md border pb-2 pt-6', className)}>
        <CopyCodeButton copyValue={code} />
        <span className="text-accent absolute right-0 top-0 mr-2 mt-2">{getLanguageIcon(lang)}</span>
        <pre className="[white-space-collapse:preserve]">{children}</pre>
        <ScrollBar className="z-10" orientation="horizontal" />
      </ScrollArea>
    );
  };

  const codeEl = ({ className, ...props }: ComponentProps<'code'>) => (
    <code {...props} className={cn('block w-fit min-w-full px-2', className)} />
  );

  return toJsxRuntime(out, {
    Fragment,
    jsx,
    jsxs,
    components: {
      pre,
      code: codeEl,
    },
  }) as ReactNode;
}
