import React, { useState } from 'react';
import { SemanticForm } from '../ui/SemanticForm';
import { SemanticInput } from '../ui/SemanticInput';
import { SemanticButton } from '../ui/SemanticButton';

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void | Promise<void>;
  loading?: boolean;
  error?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <SemanticForm onSubmit={handleSubmit} loading={loading}>
      <SemanticInput
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChange={(_, data) => setEmail(data.value as string)}
        type="email"
        required
      />
      <SemanticInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(_, data) => setPassword(data.value as string)}
        type="password"
        required
      />
      {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
      <SemanticButton type="submit" primary fluid loading={loading}>
        Login
      </SemanticButton>
    </SemanticForm>
  );
}; 