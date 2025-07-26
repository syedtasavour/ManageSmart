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

// Helper function to get token from storage
const getStoredToken = (): string | null => {
  const localToken = localStorage.getItem('accessToken');
  if (localToken) return localToken;
  
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('accessToken='));
  if (tokenCookie) {
    return tokenCookie.split('=')[1];
  }
  
  return null;
};

axiosInstance.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for automatic token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh token
        const refreshResponse = await axiosInstance.post('/auth/refresh');
        const newToken = refreshResponse.data.token;
        
        if (newToken) {
          // Store new token
          localStorage.setItem('accessToken', newToken);
          document.cookie = `accessToken=${newToken}; path=/; max-age=86400; SameSite=Strict; Secure`;
          
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('isLoggedIn');
        document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        
        // Redirect to login page
        window.location.href = '/auth/login';
      }
    }
    
    return Promise.reject(error);
  }
);
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
