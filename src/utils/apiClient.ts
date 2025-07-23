import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ApiClientOptions } from '../types/apiClient.Interface';
import { ApiError } from './ApiError';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 15000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export async function apiClient<T = any>(
  endpoint: string,
  options: ApiClientOptions = {},
): Promise<AxiosResponse<T>> {
  const { method = 'GET', body, ...rest } = options;

  try {
    const response = await axiosInstance.request<T>({
      url: endpoint,
      method,
      data: body,
      ...rest,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const data = error.response?.data ?? error.message;
      throw new ApiError(error.message, status, data);
    }
    throw error;
  }
}
