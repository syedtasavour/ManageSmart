import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks/useRedux';
import { selectIsAuthenticated } from '../../store/selectors/authSelectors';
import { SignupForm } from '../../components/auth/SignupForm';
import { Container, Header, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSignup = async (data: { name: string; email: string; password: string }) => {
    setLoading(true);
    setError(undefined);
    try {
      const response = await fetch('/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Signup failed');
      }
      navigate('/auth/login');
    } catch (err: any) {
      setError(err?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  // Don't render if already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <Container text style={{ marginTop: 60 }}>
      <Segment padded="very">
        <Header as="h2" textAlign="center">Sign Up</Header>
        <SignupForm onSubmit={handleSignup} loading={loading} error={error} />
      </Segment>
    </Container>
  );
} 