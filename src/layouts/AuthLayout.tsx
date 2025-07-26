import React, { useEffect } from 'react';
import { Container, Header, Menu, Segment, Grid, Icon } from 'semantic-ui-react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useRedux';
import { selectIsAuthenticated, selectAuthLoading } from '../store/selectors/authSelectors';

export const AuthLayout: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const authLoading = useAppSelector(selectAuthLoading);

  // Redirect logged-in users to dashboard
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Checking authentication...</div>
      </div>
    );
  }

  // Don't render auth pages if user is authenticated
  if (isAuthenticated) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Redirecting to dashboard...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Segment inverted attached="top">
        <Container>
          <Grid verticalAlign="middle">
            <Grid.Column width={8}>
              <Header as="h2" inverted>
                <Icon name="dashboard" />
                <Header.Content>
                  ManageSmart
                  <Header.Subheader>Smart Management Solutions</Header.Subheader>
                </Header.Content>
              </Header>
            </Grid.Column>
            <Grid.Column width={8} textAlign="right">
              <Menu inverted secondary size="small">
                <Menu.Item as={Link} to="/auth/login">
                  Login
                </Menu.Item>
                <Menu.Item as={Link} to="/auth/signup">
                  Sign Up
                </Menu.Item>
              </Menu>
            </Grid.Column>
          </Grid>
        </Container>
      </Segment>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px 0' }}>
        <Container>
          <Outlet />
        </Container>
      </div>

      {/* Footer */}
      <Segment inverted attached="bottom">
        <Container textAlign="center">
          <p>&copy; 2024 ManageSmart. All rights reserved.</p>
        </Container>
      </Segment>
    </div>
  );
}; 