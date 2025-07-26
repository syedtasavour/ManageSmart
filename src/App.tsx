import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthCheck } from './hooks/useAuthCheck';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { AuthLayout, DashboardLayout } from './layouts';
import LoginPage from './pages/auth/login';
import SignupPage from './pages/auth/signup';
import DashboardPage from './pages/dashboard/DashboardPage';
import './styles/App.css';

function App() {
  const { authLoading } = useAuthCheck();
  // Show loading while checking auth status
  if (authLoading) {
    return <LoadingSpinner text="Checking authentication..." />;
  }

  return (
    <Routes>
      
      {/* Auth Routes - Place these first */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Navigate to="/auth/login" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>
      
      {/* Protected Routes */}
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="projects" element={<div>Projects Page</div>} />
        <Route path="tasks" element={<div>Tasks Page</div>} />
        <Route path="team" element={<div>Team Page</div>} />
        <Route path="reports" element={<div>Reports Page</div>} />
        <Route path="settings" element={<div>Settings Page</div>} />
      </Route>

      {/* Catch all - redirect to auth */}
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
}

export default App;
