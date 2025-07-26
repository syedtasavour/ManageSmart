import { useState } from 'react';
import { apiClient } from '../utils/apiClient';
import { ApiError } from '../utils/ApiError';
import type { ApiClientOptions } from '../types/apiClient.Interface';

export function useApi<T = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const callApi = async (
    endpoint: string,
    options: ApiClientOptions = {},
  ): Promise<T | null> => {
    setError(null);
    try {
      setLoading(true);
      
      const response = await apiClient<T>(endpoint, options);
      console.log('API Response:', response);
      console.log('Response data:', response.data);
      return response.data;
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      } else {
        console.error(err);
        setError(new ApiError('Unknown error', 500, err));
      }
      throw err; // Re-throw the error so the promise rejects
    } finally {
      setLoading(false);
    }
  };

  return { callApi, loading, error };
}
