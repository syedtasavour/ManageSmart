export interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void | Promise<void>;
  loading?: boolean;
  error?: string;
}

export interface SignupFormProps {
  onSubmit: (data: { name: string; email: string; password: string }) => void | Promise<void>;
  loading?: boolean;
  error?: string;
} 