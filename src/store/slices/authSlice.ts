import type { 
  AuthState, 
  AuthActions, 
  LoginRequestAction,
  LoginSuccessAction, 
  LoginFailureAction,
  LogoutAction 
} from '../../types/redux.Interface';
import { 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE, 
  LOGOUT 
} from '../../constants/redux.constants';

// Initial State
const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
  user: null,
};

// Reducer
export function authReducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
        loading: false,
        error: null,
      };
    
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
        loading: false,
        error: action.payload,
      };
    
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
        loading: false,
        error: null,
      };
    
    default:
      return state;
  }
}

// Action Creators
export const loginRequest = (): LoginRequestAction => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (token: string, user: any): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: {
    token,
    user,
  },
});

export const loginFailure = (error: string): LoginFailureAction => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = (): LogoutAction => ({
  type: LOGOUT,
});

// Note: Async action creators are now in src/store/actions/authActions.ts
