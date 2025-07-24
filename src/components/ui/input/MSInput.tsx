import { forwardRef } from 'react';
import { Input as SemanticInput, Label } from 'semantic-ui-react';
import { useFormContext, Controller } from 'react-hook-form';
import type { MSInputProps } from '../../../types/MsInput.interface';

const MSInput = forwardRef<HTMLInputElement, MSInputProps>(({
    label,
    id,
    name,
    type = 'text',
    placeholder,
    value,
    onChange,
    fullWidth = false,
    error,
    errorText,
    helperText,
    prefixIcon,
    suffixIcon,
    loading = false,
    disabled = false,
    className = '',
    ...props
}, _ref) => {
    const formContext = useFormContext();
    const inputId = id || name || `ms-input-${Math.random().toString(36).substring(2, 9)}`;
    const fieldError = formContext && name ? formContext.formState.errors[name] : null;

    // If we're inside a form context, use Controller
    if (formContext && name) {
        return (
            <div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : ''} ${className}`}>
                {label && (
                    <label
                        htmlFor={inputId}
                        className="text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                        {label}
                    </label>
                )}

                <Controller
                    name={name}
                    control={formContext.control}
                    render={({ field }) => (
                        <SemanticInput
                            id={inputId}
                            name={field.name}
                            type={type}
                            placeholder={placeholder}
                            value={field.value || ''}
                            onChange={(_e, { value }) => field.onChange(value)}
                            icon={prefixIcon ?? suffixIcon ?? undefined}
                            iconPosition={prefixIcon ? 'left' : undefined}
                            loading={loading}
                            error={!!(error || fieldError)}
                            fluid={fullWidth}
                            disabled={disabled}
                            {...props}
                        />
                    )}
                />

                {helperText && !errorText && !fieldError && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">{helperText}</span>
                )}
                {(errorText || fieldError?.message) && (
                    <Label basic color="red" pointing style={{ marginTop: 2 }}>
                        {errorText || fieldError?.message}
                    </Label>
                )}
            </div>
        );
    }

    // If we're outside a form context, use controlled input
    return (
        <div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : ''} ${className}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                    {label}
                </label>
            )}

            <SemanticInput
                id={inputId}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                icon={prefixIcon ?? suffixIcon ?? undefined}
                iconPosition={prefixIcon ? 'left' : undefined}
                loading={loading}
                error={!!error}
                fluid={fullWidth}
                disabled={disabled}
                {...props}
            />

            {helperText && !errorText && (
                <span className="text-xs text-gray-500 dark:text-gray-400">{helperText}</span>
            )}
            {errorText && (
                <Label basic color="red" pointing style={{ marginTop: 2 }}>
                    {errorText}
                </Label>
            )}
        </div>
    );
});

MSInput.displayName = 'MSInput';

export { MSInput };
