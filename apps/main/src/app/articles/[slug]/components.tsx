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

import * as React from 'react';

import { MdxCodeBlocks } from './components/mdx-code-blocks';

type CodeProps = React.ComponentProps<'code'> & { meta?: string; children: string };

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

  return <MdxCodeBlocks code={originalCode} lang={lang} shiki={meta} {...props} />;
}

// Intercept the MDX <pre> tag to pass its props down to the <code> tag
const Pre = ({ children, ...props }: React.ComponentProps<'pre'>) => {
  if (React.isValidElement(children)) {
    // Forward props (like filename) to the Code component and remove the extra outer <pre> wrapper
    return React.cloneElement(children as React.ReactElement, { ...props });
  }
  return <pre {...props}>{children}</pre>;
};

export default {
  table: (props: React.ComponentProps<'table'>) => <Table className="not-prose" {...props} />,
  tr: TableRow,
  tbody: TableBody,
  td: TableCell,
  th: TableHead,
  thead: TableHeader,
  tfoot: TableFooter,
  code: Code,
  pre: Pre,
  YouTubeEmbed,
};
