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

import type { ComponentPropsWithoutRef } from 'react';
import type { HighlighterGeneric } from 'shiki';

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

function Pre({ ...props }: PreProps) {
  return (
    <div className="not-prose flex flex-col">
      <div className="bg-primary text-primary-foreground text-center font-semibold">something</div>
      <pre {...props} />
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

  const html = highlighter.codeToHtml(children as string, {
    lang: props.className?.replace('language-', '') || 'plaintext',
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

  return <code {...props} dangerouslySetInnerHTML={{ __html: html }} />;
}
