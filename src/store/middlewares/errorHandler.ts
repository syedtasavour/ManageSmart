import type { Middleware } from 'redux';

export const errorHandlerMiddleware: Middleware = store => next => action => {
  try {
    return next(action);
  } catch (error) {
    console.error('Redux Error:', error);
    console.error('Action:', action);
    console.error('State:', store.getState());
    
    // You can dispatch an error action here if needed
    // store.dispatch({ type: 'ERROR_OCCURRED', payload: error });
    
    throw error;
  }
}; 