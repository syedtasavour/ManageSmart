import type { RootState } from '../../store/index';

// Basic selectors
export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;

// Memoized selectors (for performance optimization)
export const selectUserEmail = (state: RootState) => state.auth.user?.email;
export const selectUserName = (state: RootState) => state.auth.user?.name;
export const selectUserId = (state: RootState) => state.auth.user?._id;

// Complex selectors
export const selectAuthStatus = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  error: state.auth.error,
  hasUser: !!state.auth.user,
}); 