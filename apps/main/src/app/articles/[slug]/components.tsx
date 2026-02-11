import { YouTubeEmbed } from '@next/third-parties/google';
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
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers';
import { bundledLanguages, createHighlighter } from 'shiki/bundle/web';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';

import type { ComponentPropsWithoutRef } from 'react';
import type { HighlighterGeneric, BundledLanguage } from 'shiki';

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

export default {
  table: (props: ComponentPropsWithoutRef<'table'>) => <Table className="not-prose" {...props} />,
  tr: TableRow,
  tbody: TableBody,
  td: TableCell,
  th: TableHead,
  thead: TableHeader,
  tfoot: TableFooter,
  pre: Pre,
  code: Code,
  YouTubeEmbed,
};

type PreProps = ComponentPropsWithoutRef<'pre'>;

function Pre({ children, ...props }: PreProps) {
  return (
    <div className="not-prose flex flex-col">
      <pre {...props} className={cn('overflow-x-auto', props.className)}>
        {children}
      </pre>
    </div>
  );
}

async function Code({ children, ...props }: ComponentPropsWithoutRef<'code'>) {
  // Check if this is a code block (has language class) or inline code
  const isCodeBlock = props.className?.startsWith('language-');

  if (!isCodeBlock) {
    // Inline code - just return regular styled code element
    return (
      <code
        {...props}
        className={cn(
          'text-accent bg-muted rounded px-1.5 py-0.5 before:content-none after:content-none',
          props.className,
        )}>
        {children}
      </code>
    );
  }

  // Code block - apply syntax highlighting using singleton highlighter
  const highlighter = await getHighlighter();
  if (!highlighter) {
    throw new Error('Failed to initialize syntax highlighter');
  }

  const lang = (props.className?.replace('language-', '') || 'plaintext') as BundledLanguage;
  const hast = highlighter.codeToHast(children as string, {
    lang,
    transformers: [
      transformerNotationDiff(),
      transformerNotationFocus(),
      transformerNotationHighlight(),
      transformerNotationWordHighlight(),
      transformerNotationErrorLevel(),
      transformerMetaHighlight(),
      transformerMetaWordHighlight(),
    ],
    themes: {
      dark: 'github-dark',
      light: 'github-light',
    },
  });

  return toJsxRuntime(hast, {
    Fragment,
    jsx,
    jsxs,
    components: {
      pre: (preProps: any) => <Pre {...preProps} />,
      code: (codeProps: any) => (
        <code
          {...codeProps}
          className={cn(
            'block p-4 text-sm leading-relaxed',
            codeProps.className
          )}
        />
      ),
    },
  }) as React.ReactElement;
}
