import React from 'react';
import { 
  Container, 
  Loader,
  Dimmer
} from 'semantic-ui-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { selectUser, selectIsAuthenticated, selectAuthLoading } from '../store/selectors/authSelectors';
import { logoutUser } from '../store/actions/authActions';
import Navigation from '../components/Navigation';

export const DashboardLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const authLoading = useAppSelector(selectAuthLoading);

  // Redirect if not authenticated (but only after auth check is complete)
  React.useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleLogout = async () => {
    await dispatch(logoutUser() as any);
    navigate('/auth/login');
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <Dimmer active inverted>
          <Loader size="large">Checking authentication...</Loader>
        </Dimmer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <Navigation user={user || undefined} onLogout={handleLogout} />
      
      {/* Main Content */}
      <div className="p-6">
        <Container fluid>
          <Outlet />
        </Container>
      </div>
    </div>
  );
}; 