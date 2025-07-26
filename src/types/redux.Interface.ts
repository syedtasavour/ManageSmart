import { LOGIN_SUCCESS, LOGOUT } from '../constants/redux.constants';

// Action Types
export type AuthActions = LoginSuccessAction | LogoutAction | LoginRequestAction | LoginFailureAction;

// State Interfaces
export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
  user: User | null;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  isEmailVerified: boolean;
  is2FAEnabled: boolean;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  avatar?: string;
}

// Action Interfaces
export interface LoginRequestAction {
  type: 'auth/LOGIN_REQUEST';
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: {
    token: string;
    user: User;
  };
}

export interface LoginFailureAction {
  type: 'auth/LOGIN_FAILURE';
  payload: string;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

// Root State and Dispatch types
// These types are defined here and imported by store/index.ts
export type RootState = any; // Will be properly typed when store is configured
export type AppDispatch = any; // Will be properly typed when store is configured
