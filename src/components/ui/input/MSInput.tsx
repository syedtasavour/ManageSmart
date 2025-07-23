import { forwardRef } from 'react';
import { Input as SemanticInput, Label } from 'semantic-ui-react';
import type { InputProps as SemanticInputProps } from 'semantic-ui-react';

export interface MSInputProps extends Omit<SemanticInputProps, 'label'> {
    label?: string;
    id?: string;
    name?: string;
    type?: string;
    fullWidth?: boolean;
    errorText?: string;
    helperText?: string;
    prefixIcon?: string;
    suffixIcon?: string;
}

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
}, ref) => {
    const inputId = id || name || `ms-input-${Math.random().toString(36).substring(2, 9)}`;

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
