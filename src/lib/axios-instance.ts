import axios from 'axios';

const HOST: string = process.env.NEXT_PUBLIC_API_URL!;
const axiosInstance = axios.create({
  baseURL: HOST,
});

export default axiosInstance;
