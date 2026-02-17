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

import { AsyncCodeBlock } from './components/async-code-block';

type CodeProps = ComponentPropsWithoutRef<'code'> & { meta?: string; children: string };

function Code({ children, meta, className, ...props }: CodeProps) {
  const isCodeBlock = className?.startsWith('language-');

  if (!isCodeBlock) {
    return (
      <code
        {...props}
        className={cn('text-accent bg-muted rounded px-1.5 py-0.5 before:content-none after:content-none', className)}>
        {children}
      </code>
    );
  }

  const lang = className?.replace('language-', '') || 'plaintext';

  // Use AsyncCodeBlock directly for server-side rendering
  const originalCode = children.trim();

  return <AsyncCodeBlock code={originalCode} lang={lang} meta={meta} className={className} {...props} />;
}

export default {
  table: (props: ComponentPropsWithoutRef<'table'>) => <Table className="not-prose" {...props} />,
  tr: TableRow,
  tbody: TableBody,
  td: TableCell,
  th: TableHead,
  thead: TableHeader,
  tfoot: TableFooter,
  code: Code,
  YouTubeEmbed,
};
