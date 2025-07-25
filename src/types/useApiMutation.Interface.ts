export interface UseApiMutationOptions {
    pendingMessage?: string;
    successMessage?: string;
    errorMessage?: string;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
}