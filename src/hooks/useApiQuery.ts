import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../utils/apiClient';
import { toast } from '../utils/toast';
import type { UseApiQueryOptions } from '../types/useApiQuery.Interface';


export function useApiQuery<T = any>(
  url: string,
  options: UseApiQueryOptions = {}
) {
  const {
    params,
    skip = false,
    successMessage,
    errorMessage = 'Failed to fetch data',
    onSuccess,
    onError,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient<T>(url, {
        method: 'GET',
        params,
      });

      setData(response.data);
      onSuccess?.(response.data);
      if (successMessage) toast.success(successMessage);
    } catch (err) {
      setError(err);
      onError?.(err);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(params)]);

  useEffect(() => {
    if (!skip) fetchData();
  }, [fetchData, skip]);

  return { data, loading, error, refetch: fetchData };
}
