'use client';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef, getCoreRowModel, getFilteredRowModel, useReactTable } from '@tanstack/react-table';
import { useQueryStates } from 'nuqs';
import { useMemo } from 'react';
import { getUsers } from '../_api/get-user';
import { userParsers } from '../_utils/search-params';
import { User } from '../types';
import { ObfuscatedPasswordField } from './obufscated-password';
import { CutsomTable } from '@/components/customTable';

type TGetUsers = {
  users: User[];
  skip: number;
  limit: number;
  total: number;
};
export function TableExampleConent() {
  const [{ q, limit, skip }, setParams] = useQueryStates(userParsers);
  const { data, isPending } = useQuery({
    queryKey: ['users', { q, limit, skip }],
    queryFn: () => getUsers({ q, limit, skip }),
    select: (data) => data.data as TGetUsers,
  });

  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        accessorKey: 'fullName',
        header: 'Full Name',
        cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}`,
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
      },

      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'password',
        header: 'Password',
        cell: ({ row }) => <ObfuscatedPasswordField password={row.original.password} />,
      },
    ],
    []
  );

  const tableInstance = useReactTable({
    data: data?.users || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    pageCount: Math.ceil((data?.total || 0) / limit),
  });

  return (
    <div className='flex items-center'>
      <div className='overflow-x-auto mx-auto max-w-3xl w-full'>
        <CutsomTable tableInstance={tableInstance} columns={columns} isLoading={isPending} striped />
      </div>
    </div>
  );
}
