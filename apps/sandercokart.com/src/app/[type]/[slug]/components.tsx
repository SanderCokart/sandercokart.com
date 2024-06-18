import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@repo/ui/table';

import type { ComponentPropsWithoutRef } from 'react';

export default {
  table: (props: ComponentPropsWithoutRef<'table'>) => <Table className="not-prose" {...props} />,
  tr: TableRow,
  tbody: TableBody,
  td: TableCell,
  th: TableHead,
  thead: TableHeader,
  tfoot: TableFooter,
};
