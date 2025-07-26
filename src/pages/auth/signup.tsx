import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { signupUser } from '../../store/actions/authActions';
import { selectIsAuthenticated } from '../../store/selectors/authSelectors';
import { SignupForm } from '../../components/auth/SignupForm';
import { Container, Header, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const dispatch = useAppDispatch();
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
      await dispatch(signupUser(data) as any);
      navigate('/dashboard');
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