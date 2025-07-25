import type { ButtonProps as SemanticButtonProps } from 'semantic-ui-react';
export interface MsButtonProps extends SemanticButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive';
  fullWidth?: boolean;
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  apiConfig?: {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
    headers?: Record<string, string>;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    pendingMessage?: string;
    successMessage?: string;
    errorMessage?: string;
  };
  toastConfig?: {
    successMessage?: string;
    errorMessage?: string;
    infoMessage?: string;
    showOnClick?: boolean;
  };
}

