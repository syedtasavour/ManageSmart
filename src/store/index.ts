import { applyMiddleware, combineReducers, legacy_createStore as createStore, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { authReducer } from './slices/authSlice';
import { loggerMiddleware } from './middlewares/logger';
import { errorHandlerMiddleware } from './middlewares/errorHandler';

// Root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  // Add more reducers here as needed
});

// Middleware configuration
const middleware = [errorHandlerMiddleware, thunk, loggerMiddleware];

// Redux DevTools Extension setup
const composeEnhancers = 
  (typeof window !== 'undefined' && 
   (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Store creation
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

// Type definitions are now in src/types/redux.Interface.ts
