import type { InputProps } from 'semantic-ui-react';

export interface SemanticInputProps extends InputProps {
  label?: string;
  errorMessage?: string;
}

export interface LoadingSpinnerProps {
  active?: boolean;
  text?: string;
  size?: 'mini' | 'tiny' | 'small' | 'medium' | 'large' | 'big' | 'huge' | 'massive';
}

export interface NavigationProps {
  user?: {
    name?: string;
    email?: string;
  };
  onLogout?: () => void;
} 