import type { AppDispatch } from '../index';
import { loginRequest, loginSuccess, loginFailure, logout } from '../slices/authSlice';
import { apiClient } from '../../utils/apiClient';
import { toast } from '../../utils/toast';
import { ApiError } from '../../utils/ApiError';

// Helper function to get token from storage
const getStoredToken = (): string | null => {
  // Check localStorage first, then cookies
  const localToken = localStorage.getItem('accessToken');
  
  if (localToken) return localToken;
  
  // Check cookies
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('accessToken='));
  
  if (tokenCookie) {
    return tokenCookie.split('=')[1];
  }
  
  return null;
};

// Helper function to store token
const storeToken = (token: string): void => {
  localStorage.setItem('accessToken', token);
  localStorage.setItem('isLoggedIn', 'true');
  document.cookie = `accessToken=${token}; path=/; max-age=86400; SameSite=Strict; Secure`;
};

// Helper function to clear stored token
const clearStoredToken = (): void => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('isLoggedIn');
  document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export const loginUser = (credentials: { email: string; password: string }) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(loginRequest());
      
      const response = await apiClient('/auth/login', {
        method: 'POST',
        body: credentials,
      });

      const data = response.data;

      // Handle different response formats
      let token = data.token;
      let userData = data.user || data; // If no separate user object, use the whole response
      if (token) {
        storeToken(token);
      } else {
        // If no token in response, try to get it from cookies/localStorage
        token = getStoredToken();
        if (!token) {
          console.error('No token found anywhere!');
          throw new Error('No token received from login');
        }
      }

      dispatch(loginSuccess(token, userData));
      toast.success('Login successful!');
      return data;
    } catch (error) {
      let errorMessage = 'Login failed';
      if (error instanceof ApiError) {
        errorMessage = error.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(loginFailure(errorMessage));
      toast.error(errorMessage);
      throw error;
    }
  };
};

export const logoutUser = () => {
  return async (dispatch: AppDispatch) => {
    try {
      // Call logout endpoint to invalidate token on server
      await apiClient('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      // Continue with logout even if server call fails
      console.warn('Logout server call failed:', error);
    } finally {
      clearStoredToken();
      dispatch(logout());
      toast.success('Logged out successfully!');
    }
  };
};

// Check if user is already logged in (token validation)
export const checkAuthStatus = () => {
  return async (dispatch: AppDispatch) => {
    const token = getStoredToken();
    
    if (!token) {
      dispatch(logout());
      return;
    }

    try {
      dispatch(loginRequest());
      // Validate token with server
      const response = await apiClient('/users/me', {
        method: 'GET',
      });
     

      const userData = response.data;
      
      // Token is valid, restore user session with existing token and user data
      dispatch(loginSuccess(token, userData));
    } catch (error) {
      console.error('Auth check failed:', error);
      
      // Token is invalid, clear storage and logout
      clearStoredToken();
      dispatch(logout());
      
      if (error instanceof ApiError && error.status === 401) {
        // Silent logout for expired tokens
        return;
      }
      
      console.warn('Auth check failed with error:', error);
    }
  };
};

// Refresh token if needed
export const refreshToken = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await apiClient('/auth/refresh', {
        method: 'POST',
      });

      const data = response.data;
      
      if (data.token) {
        storeToken(data.token);
        dispatch(loginSuccess(data.token, data.user));
      }
    } catch (error) {
      // Refresh failed, logout user
      clearStoredToken();
      dispatch(logout());
      toast.error('Session expired. Please login again.');
    }
  };
};