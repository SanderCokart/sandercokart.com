import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@repo/ui/table';
import { transformerNotationHighlight } from '@shikijs/transformers';
import { bundledLanguages, createHighlighter } from 'shiki/bundle/web';

import type { ComponentPropsWithoutRef } from 'react';

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
};

type PreProps = ComponentPropsWithoutRef<'pre'> & { name: string };

function Pre({ name, ...props }: PreProps) {
  return (
    <div className="not-prose flex flex-col">
      <div className="bg-primary text-center">{name}</div>
      <pre {...props} />
    </div>
  );
}

async function Code({ children, ...props }: ComponentPropsWithoutRef<'code'>) {
  const highlighter = await createHighlighter({
    themes: ['github-dark', 'github-light'],
    langs: [...Object.keys(bundledLanguages)],
  });

  const html = highlighter.codeToHtml(children as string, {
    lang: props.className?.replace('language-', '') || 'plaintext',
    transformers: [transformerNotationHighlight()],
    themes: {
      dark: 'github-dark',
      light: 'github-light',
    },
  });

  return <code {...props} dangerouslySetInnerHTML={{ __html: html }} />;
}
