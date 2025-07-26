import { useState } from 'react';
import { useApi } from './useApi';
import { toast } from '../utils/toast';
import type { ApiClientOptions } from '../types/apiClient.Interface';
import type { UseApiMutationOptions } from '../types/useApiMutation.Interface';


export function useApiMutation<T = any>(
    endpoint: string,
    options: ApiClientOptions = {},
    mutationOptions: UseApiMutationOptions = {},
) {
    const { callApi } = useApi<T>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<T | null>(null);

    const mutate = async (body?: any) => {
        setLoading(true);
        setError(null);

        const finalOptions: ApiClientOptions = {
            ...options,
            body: body ?? options.body,
        };

        const promise = callApi(endpoint, finalOptions)
            .then((res) => {
                setData(res);
                mutationOptions.onSuccess?.(res);
                return res;
            })
            .catch((err) => {
                setError(err);
                mutationOptions.onError?.(err);
                throw err;
            })
            .finally(() => setLoading(false));

        toast.promise(
            promise,
            {
                pending: mutationOptions.pendingMessage ?? 'Processing...',
                success: mutationOptions.successMessage ?? 'Operation successful!',
                error: mutationOptions.errorMessage ?? 'Something went wrong.',
            }
        );

        return promise;
    };

    return { mutate, loading, error, data };
}
