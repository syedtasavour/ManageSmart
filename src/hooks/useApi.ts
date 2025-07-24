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
      
      // Log form data if it exists in the request body
      if (options.body) {
        console.log('Form data being sent:', options.body);
        if (options.body.email && options.body.password) {
          console.log('Email:', options.body.email);
          console.log('Password:', options.body.password);
        }
      }
      
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
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { callApi, loading, error };
}
