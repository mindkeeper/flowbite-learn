import { ColumnDef, flexRender, Table as TTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';

interface CustomTableProps<TData> {
  tableInstance: TTable<TData>;
  columns: ColumnDef<TData>[];
  striped?: boolean;
  isLoading?: boolean;
}

export const CutsomTable = <TData,>({ tableInstance, columns, isLoading, striped = false }: CustomTableProps<TData>) => {
  return (
    <Table striped={striped}>
      <TableHead>
        {tableInstance
          .getHeaderGroups()
          .map((headerGroup) =>
            headerGroup.headers.map((header) => (
              <TableHeadCell key={header.id}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHeadCell>
            ))
          )}
      </TableHead>
      <TableBody className='divide-y'>
        {isLoading ? (
          [...Array(10)].map((_, index) => (
            <TableRow key={index}>
              {columns.map((_, j) => (
                <TableCell key={j}>
                  <div className='animate-pulse h-4 bg-neutral-400 rounded-lg' />
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : tableInstance.getRowModel().rows.length ? (
          tableInstance.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length}>
              <div className='text-center text-slate-400 h-24'>No data found</div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
