import type { Middleware } from 'redux';

export const loggerMiddleware: Middleware = store => next => action => {
  if (import.meta.env.DEV) {
    console.group((action as any).type);
    console.info('dispatching', action);
    const result = next(action);
    console.groupEnd();
    return result;
  }
  return next(action);
}; 