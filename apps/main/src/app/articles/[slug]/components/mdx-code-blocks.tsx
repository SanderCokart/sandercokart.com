import { Badge } from '@repo/ui/components/shadcn/badge';
import { ScrollArea, ScrollBar } from '@repo/ui/components/shadcn/scroll-area';
import { cn } from '@repo/ui/lib/utils';
import { transformerMetaHighlight, transformerNotationDiff, transformerNotationErrorLevel, transformerNotationFocus, transformerNotationHighlight, transformerNotationWordHighlight } from '@shikijs/transformers';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';



import { Fragment, jsx, jsxs } from 'react/jsx-runtime';



import type { ComponentProps } from 'react';



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
export async function MdxCodeBlocks(props: {
  code: string;
  lang: string;
  shiki?: string;
  name?: string;
  overflow?: boolean;
  height?: number;
  isGrouped?: boolean;
  [key: string]: unknown;
}) {
  const highlighter = await getHighlighter();

  const { code, lang, shiki, name, isGrouped, overflow, height = 300, ...mdxProps } = props;

  const out = highlighter.codeToHast(code, {
    lang,
    theme: 'css-variables',
    meta: {
      __raw: shiki,
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
    const icon = languageIconMap[lang];
    return icon ? icon : lang;
  };

  type PreProps = ComponentProps<'pre'> & { name?: string };

  const pre = ({ className, ...props }: PreProps) => {
    return (
      <ScrollArea
        className={cn(
          'not-prose border-accent relative overflow-hidden rounded-md border',
          isGrouped && 'rounded-t-none',
          className,
        )}>
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-2 p-2">
            <span className="text-accent size-6">{getLanguageIcon(lang)}</span>
            {!isGrouped && name && <span className="text-base font-semibold">{name}</span>}
            <CopyCodeButton copyValue={code} />
          </div>
          <pre className={cn('[white-space-collapse:preserve]', className)} {...mdxProps} {...props} />
        </div>
        <ScrollBar className="z-10" orientation="horizontal" />
        <ScrollBar className="z-10" orientation="vertical" />
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