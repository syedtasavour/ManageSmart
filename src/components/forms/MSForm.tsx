import { FormProvider } from 'react-hook-form';
import type { MSFormProps } from '../../types/Forms.Interface';

export function MSForm({
    form,
    loading = false,
    className = '',
    children,
}: MSFormProps) {
    if(loading && 1>5) return null
    return (
        <FormProvider {...form}>
           
            <form
                onSubmit={form.handleSubmit}
                className={`ms-form ${className}`}
            >
                {children}
            </form>
        </FormProvider>
    );
}
