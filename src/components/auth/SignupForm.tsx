import React, { useState } from 'react';
import { SemanticForm } from '../forms/SemanticForm';
import { SemanticInput } from '../ui/input/SemanticInput';
import { SemanticButton } from '../ui/buttons/SemanticButton';
import type { SignupFormProps } from '../../types/auth.interface';

export const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, loading, error }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, password });
  };

  return (
    <SemanticForm onSubmit={handleSubmit} loading={loading}>
      <SemanticInput
        label="Name"
        placeholder="Enter your name"
        value={name}
        onChange={(_, data) => setName(data.value as string)}
        type="text"
        required
      />
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
        Sign Up
      </SemanticButton>
      <div style={{ textAlign: 'center', marginTop: 15 }}>
        <span>Already have an account? </span>
        <a href="/auth/login" style={{ color: '#2185d0', textDecoration: 'none' }}>
          Login here
        </a>
      </div>
    </SemanticForm>
  );
}; 