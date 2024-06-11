import { Button } from '@repo/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@repo/ui/table';
import { Link, useLoaderData } from '@tanstack/react-router';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { LuPen, LuTrash } from 'react-icons/lu';

import type { Article } from '@/types/models.ts';

const columnHelper = createColumnHelper<Article>();

const defaultColumns = [
  columnHelper.accessor('id', {
    id: 'id',
    header: () => <span>ID</span>,
    cell: props => <div>{props.getValue()}</div>,
  }),
  columnHelper.accessor('title', {
    id: 'title',
    header: () => <span>Title</span>,
    cell: props => <div>{props.getValue()}</div>,
  }),
  columnHelper.accessor('published_at', {
    id: 'publishedAt',
    header: () => <span>Published At</span>,
    cell: props => <div>{props.getValue()}</div>,
  }),
  columnHelper.accessor('created_at', {
    id: 'createdAt',
    header: () => <span>Created At</span>,
    cell: props => <div>{props.getValue()}</div>,
  }),
  columnHelper.accessor('updated_at', {
    id: 'updatedAt',
    header: () => <span>Updated At</span>,
    cell: props => <div>{props.getValue()}</div>,
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
