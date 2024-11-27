import axiosInstance from '@/lib/axios-instance';
type TParams = {
  q: string;
  limit: number;
  skip: number;
};

export const getUsers = (params: TParams) => axiosInstance.get('/users/search', { params });
