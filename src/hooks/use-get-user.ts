import axiosInstance from '@/lib/axios-instance';
import { useInfiniteQuery } from '@tanstack/react-query';

type TUser = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
};

type TUserResponse = {
  users: TUser[];
  skip: number;
  limit: number;
};

const fetchUsers = async ({ search = '', skip = 0 }: { search: string; skip: number }) => {
  try {
    const res = await axiosInstance.get<TUserResponse>('/users/search', {
      params: {
        q: search,
        skip,
        limit: 10,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const useGetInfinitUser = ({ search = '' }: { search: string }) => {
  return useInfiniteQuery<TUserResponse, Error>({
    queryKey: ['users', { search }],
    queryFn: ({ pageParam = 0 }) => fetchUsers({ search, skip: Number(pageParam) }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.users.length) return undefined;
      return lastPage.skip + lastPage.limit;
    },
  });
};
