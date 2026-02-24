import { Badge } from '@repo/ui/components/shadcn/badge';
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

import { Fragment, jsx, jsxs } from 'react/jsx-runtime';

import type { ComponentProps, ReactNode } from 'react';

import { getHighlighter } from '@/lib/shiki-highlighter';

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
 * @param shiki - Optional metadata string for advanced highlighting features
 * @param mdxCodeBlocksProps - Additional props to customise the code block, passed via rehypeMdxCodeProps
 * @returns Promise resolving to a ReactNode containing the code blocks
 */
export async function MdxCodeBlocks(mdxProps: {
  code: string;
  lang: string;
  shiki?: string;
  name?: string;
  [key: string]: unknown;
}) {
  const highlighter = await getHighlighter();

  const out = highlighter.codeToHast(mdxProps.code, {
    lang: mdxProps.lang,
    theme: 'css-variables',
    meta: {
      __raw: mdxProps.shiki,
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
    return IconComponent ? <IconComponent className="size-full" /> : lang;
  };

  type PreProps = ComponentProps<'pre'> & { name?: string };

  const pre = ({ className, ...props }: PreProps) => {
    return (
      <ScrollArea className={cn('not-prose border-accent relative overflow-hidden rounded-md border pb-2', className)}>
        <div className="flex flex-col">
          <div className="flex items-center justify-end gap-2 p-2">
            <span className="text-accent size-6">{getLanguageIcon(mdxProps.lang)}</span>
            <Badge className="empty:hidden" variant="default">
              {mdxProps.name}
            </Badge>
            {/* <span className="grow text-xs font-semibold empty:hidden"></span> */}
            <CopyCodeButton copyValue={mdxProps.code} />
          </div>
          <pre className={cn('[white-space-collapse:preserve]', className)} {...mdxProps} {...props} />
        </div>
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
  });
}
