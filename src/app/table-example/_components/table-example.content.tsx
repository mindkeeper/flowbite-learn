'use client';
import { CutsomTable } from '@/components/customTable';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useQueryStates } from 'nuqs';
import { useMemo } from 'react';
import { getUsers } from '../_api/get-user';
import { userParsers } from '../_utils/search-params';
import { User } from '../types';
import { ObfuscatedPasswordField } from './obufscated-password';
import { TextInput } from 'flowbite-react';
import { Search } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';
import { CellLoadingWrapper } from './cell-loading-wrapper';

type TGetUsers = {
  users: User[];
  skip: number;
  limit: number;
  total: number;
};
export function TableExampleConent() {
  const [{ q, limit, skip }, setParams] = useQueryStates(userParsers);
  const pageIndex = Math.floor(skip / limit);
  const pageSize = limit;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['users', { q, limit, skip }],
    queryFn: () => getUsers({ q, limit, skip }),
    select: (data) => data.data as TGetUsers,
  });

  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        accessorKey: 'fullName',
        header: 'Full Name',
        cell: ({ row }) => (
          <CellLoadingWrapper isFetching={isFetching}>
            {row.original.firstName} {row.original.lastName}
          </CellLoadingWrapper>
        ),
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
        cell: ({ row }) => <CellLoadingWrapper isFetching={isFetching}>{row.original.gender}</CellLoadingWrapper>,
      },

      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => <CellLoadingWrapper isFetching={isFetching}>{row.original.email}</CellLoadingWrapper>,
      },
      {
        accessorKey: 'password',
        header: 'Password',
        cell: ({ row }) => (
          <CellLoadingWrapper isFetching={isFetching}>
            <ObfuscatedPasswordField password={row.original.password} />,
          </CellLoadingWrapper>
        ),
      },
    ],
    [isFetching]
  );

  const tableInstance = useReactTable({
    data: data?.users || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater !== 'function') {
        return;
      }
      const newPagination = updater(tableInstance.getState().pagination);
      setParams({
        skip: newPagination.pageIndex * newPagination.pageSize,
        limit: newPagination.pageSize,
      });
    },
    pageCount: Math.ceil((data?.total || 0) / limit),
  });

  const debouncedSearch = useDebouncedCallback(
    (value: string) => {
      setParams({ q: value, skip: null });
    },
    1000,
    { maxWait: 2000 }
  );

  return (
    <div className='mx-auto flex flex-col items-center max-w-3xl space-y-6'>
      <div className='self-end w-72'>
        <TextInput
          icon={Search}
          onChange={(e) => {
            debouncedSearch(e.target.value);
          }}
        />
      </div>
      <div className='overflow-x-auto mx-auto w-full'>
        <CutsomTable tableInstance={tableInstance} columns={columns} isLoading={isLoading} striped />
      </div>
    </div>
  );
}
