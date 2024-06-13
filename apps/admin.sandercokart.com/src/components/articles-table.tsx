import { Button } from '@repo/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@repo/ui/hover-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/ui/table';
import { Link, useLoaderData } from '@tanstack/react-router';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { format, formatDistanceToNow } from 'date-fns';
import { LuPen, LuTrash } from 'react-icons/lu';

import type { ArticleIndex } from '@/types/models.ts';

const columnHelper = createColumnHelper<ArticleIndex>();

const formatDate = (date: string | null) =>
  date ? (
    <HoverCard>
      <HoverCardTrigger>{formatDistanceToNow(date, { addSuffix: true })}</HoverCardTrigger>
      <HoverCardContent>{format(date, 'd-M-y | PPPPp')}</HoverCardContent>
    </HoverCard>
  ) : undefined;

const defaultColumns = [
  columnHelper.accessor('id', {
    id: 'id',
    header: 'ID',
    cell: props => props.renderValue(),
  }),
  columnHelper.accessor('title', {
    id: 'title',
    header: 'Title',
    cell: props => props.renderValue(),
  }),
  columnHelper.accessor('published_at', {
    id: 'publishedAt',
    header: 'Published At',
    cell: props => formatDate(props.getValue()),
  }),
  columnHelper.accessor('created_at', {
    id: 'createdAt',
    header: 'Created At',
    cell: props => formatDate(props.getValue()),
  }),
  columnHelper.accessor('updated_at', {
    id: 'updatedAt',
    header: 'Updated At',
    cell: props => formatDate(props.getValue()),
  }),
  columnHelper.display({
    id: 'actions',
    header: () => <span>Actions</span>,
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <Button asChild size="icon">
          <Link params={{ articleSlug: row.original.slug }} to="/articles/$articleSlug/edit">
            <LuPen />
            <span className="sr-only">Edit Article</span>
          </Link>
        </Button>

        <Button size="icon" variant="destructive">
          <LuTrash />
          <span className="sr-only">Delete Article</span>
        </Button>
      </div>
    ),
  }),
];

export function ArticlesTable() {
  const { articles } = useLoaderData({
    from: '/_auth/articles',
  });

  const table = useReactTable({
    columns: defaultColumns,
    data: articles,
    renderFallbackValue: 'N/A',
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <TableHead key={header.id} colSpan={header.colSpan} style={{ width: `${header.getSize()}px` }}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map(row => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map(cell => (
              <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
