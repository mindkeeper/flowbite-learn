import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { SearchParams } from 'nuqs';
import { searchParamsCache } from './_utils/search-params';
import { getUsers } from './_api/get-user';
import { TableExampleConent } from './_components/table-example.content';

type PageProps = {
  searchParams: Promise<SearchParams>;
};
export default async function TablePage({ searchParams }: PageProps) {
  const queryClient = new QueryClient();
  const { q, limit, skip } = await searchParamsCache.parse(searchParams);
  queryClient.prefetchQuery({
    queryKey: ['users', { q, limit, skip }],
    queryFn: () => getUsers({ q, limit, skip }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TableExampleConent />
    </HydrationBoundary>
  );
}
