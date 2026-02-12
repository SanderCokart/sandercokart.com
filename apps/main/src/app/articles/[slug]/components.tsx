import { YouTubeEmbed } from '@next/third-parties/google';
import { Button } from '@repo/ui/components/shadcn/button';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/shadcn/table';
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
import { Copy } from 'lucide-react';
import { bundledLanguages, codeToHtml, createCssVariablesTheme, createHighlighter } from 'shiki';

import { Fragment } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

import type { ComponentProps, ComponentPropsWithoutRef, ReactNode } from 'react';
import type { HighlighterGeneric } from 'shiki';

type PreProps = ComponentPropsWithoutRef<'pre'>;

type CodeProps = ComponentPropsWithoutRef<'code'> & { meta?: string; children: string };

// function Pre({ ...props }: PreProps) {
//   return (
//     <div className="not-prose flex flex-col">
//       <div className="bg-primary text-primary-foreground text-center font-semibold">something</div>
//       <pre {...props} />
//     </div>
//   );
// }

const cssVariableTheme = createCssVariablesTheme({
  name: 'css-variables',
  variablePrefix: '--shiki-',
  variableDefaults: {},
  fontStyle: true,
});

let highlighter: HighlighterGeneric<any, any> | null = null;

const getHighlighter = async () => {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: [cssVariableTheme],
      langs: [...Object.keys(bundledLanguages)],
    });
  }
  return highlighter;
};

async function Code({ children, meta, className, ...props }: CodeProps) {
  // Check if this is a code block (has language class) or inline code
  // const isCodeBlock = props.className?.startsWith('language-');

  // if (!isCodeBlock) {
  //   // Inline code - just return regular styled code element
  //   return (
  //     <code
  //       {...props}
  //       className={cn(
  //         'text-accent bg-muted rounded px-1.5 py-0.5 before:content-none after:content-none',
  //         props.className,
  //       )}>
  //       {children}
  //     </code>
  //   );
  // }

  // Code block: pass meta (for Shiki transformer) to highlightCode; other props reserved for component UI
  const lang = className?.replace('language-', '') || 'plaintext';

  const highlighter = await getHighlighter();

  console.log({ ...props, meta, className });

  const out = highlighter.codeToHast(children.trim(), {
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

  const pre = ({ className, children, ...props }: ComponentProps<'pre'>) => {
    //make client component
    return (
      <pre
        {...props}
        className={cn(
          'not-prose border-accent relative overflow-x-auto rounded-md border pb-2 pt-6 text-sm [white-space-collapse:preserve]',
          className,
        )}>
        <Button
          variant="outline"
          size="icon"
          className="dark:bg-input dark:hover:bg-accent dark:hover:text-accent-foreground absolute right-2 top-2">
          <Copy />
        </Button>
        {children}
      </pre>
    );
  };

  const code = ({ className, ...props }: ComponentProps<'code'>) => (
    <code {...props} className={cn('block w-fit min-w-full px-2', className)} />
  );

  return toJsxRuntime(out, {
    Fragment,
    jsx,
    jsxs,
    components: {
      pre,
      code,
    },
  }) as ReactNode;
}

export default {
  table: (props: ComponentPropsWithoutRef<'table'>) => <Table className="not-prose" {...props} />,
  tr: TableRow,
  tbody: TableBody,
  td: TableCell,
  th: TableHead,
  thead: TableHeader,
  tfoot: TableFooter,
  pre: Fragment,
  code: Code,
  YouTubeEmbed,
};
