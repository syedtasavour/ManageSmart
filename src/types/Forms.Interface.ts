import type { ZodSchema } from "zod";
import type { DefaultValues, FieldValues } from "react-hook-form";
import type { ApiClientOptions } from "./apiClient.Interface";

export interface UseMSFormOptions<T extends FieldValues> {
    schema?: ZodSchema<T>;
    defaultValues: DefaultValues<T>;
    onSubmit?: (data: T) => Promise<any>;
    apiConfig?: {
        endpoint: string;
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
        options?: ApiClientOptions;
    };
    successMessage?: string;
    pendingMessage?: string;
    errorMessage?: string;
}

export interface MSFormProps {
    form: any; // Simplified for now to avoid complex type issues
    loading?: boolean;
    className?: string;
    children: React.ReactNode;
}
