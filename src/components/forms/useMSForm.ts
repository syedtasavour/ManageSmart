import { useForm } from 'react-hook-form';
import type { SubmitHandler, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '../../utils/toast';
import { useApi } from '../../hooks/useApi';
import type { UseMSFormOptions } from '../../types/Forms.Interface';


export function useMSForm<T extends FieldValues>({
    schema,
    defaultValues,
    onSubmit,
    apiConfig,
    onSuccess,
    onError,
    successMessage = 'Saved successfully!',
    pendingMessage = 'Saving...',
    errorMessage = 'Something went wrong.',
}: UseMSFormOptions<T>) {
    const methods = useForm<T>({
        defaultValues,
        resolver: schema ? zodResolver(schema as any) : undefined,
    });

    const { callApi, loading, error } = useApi<T>();

    const handleSubmit: SubmitHandler<T> = async (data) => {
        let promise: Promise<any>;
        if (apiConfig) {
            // Use API configuration
            promise = callApi(apiConfig.endpoint, {
                method: apiConfig.method || 'POST',
                body: data,
                ...apiConfig.options,
            });
        } else if (onSubmit) {
            // Use custom onSubmit function
            promise = onSubmit(data);
        } else {
            throw new Error('Either apiConfig or onSubmit must be provided');
        }
    
        toast.promise(promise, {
            pending: pendingMessage,
            success: successMessage,
            error: errorMessage,
        });
    
        try {
            const response = await promise;
            onSuccess?.(response); 
        } catch (err: any) {
            onError?.(err); 
        }
    };
    
    

    return { 
        ...methods, 
        handleSubmit: methods.handleSubmit(handleSubmit),
        apiLoading: loading,
        apiError: error,
    };
}
