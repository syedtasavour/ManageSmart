import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useRedux';
import { checkAuthStatus } from '../store/actions/authActions';
import { selectAuthLoading } from '../store/selectors/authSelectors';

export const useAuthCheck = () => {
  const dispatch = useAppDispatch();
  const authLoading = useAppSelector(selectAuthLoading);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(checkAuthStatus() as any);
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };
    checkAuth();
  }, []); // Empty dependency array - only run on mount

  return { authLoading };
}; 