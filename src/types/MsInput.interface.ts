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