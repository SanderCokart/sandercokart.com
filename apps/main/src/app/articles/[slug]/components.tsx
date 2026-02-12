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

import type { ComponentPropsWithoutRef } from 'react';

import { highlightCode } from '@/lib/highlight';

type PreProps = ComponentPropsWithoutRef<'pre'>;

type CodeProps = ComponentPropsWithoutRef<'code'> & { meta?: string };

function Pre({ ...props }: PreProps) {
  return (
    <div className="not-prose flex flex-col">
      <div className="bg-primary text-primary-foreground text-center font-semibold">something</div>
      <pre {...props} />
    </div>
  );
}

async function Code({ children, meta, ...props }: CodeProps) {
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

  // Code block: pass meta (for Shiki transformer) to highlightCode; other props reserved for component UI
  const metaString = typeof meta === 'string' ? meta : undefined;
  const lang = props.className?.replace('language-', '') || 'plaintext';
  const html = await highlightCode(children as string, lang, metaString);

  return <code {...props} dangerouslySetInnerHTML={{ __html: html }} />;
}

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
