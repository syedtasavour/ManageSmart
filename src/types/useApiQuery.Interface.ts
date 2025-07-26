export interface UseApiQueryOptions {
    params?: Record<string, any>;
    skip?: boolean;
    successMessage?: string;
    errorMessage?: string;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
  }