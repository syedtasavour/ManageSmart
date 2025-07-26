import { useAppSelector } from '../../hooks/useRedux';
import { useAppDispatch } from '../../hooks/useRedux';
import { 
    selectIsAuthenticated, 
    selectUser, 
    selectAuthLoading, 
    selectAuthError 
} from '../../store/selectors/authSelectors';
import { logoutUser } from '../../store/actions/authActions';

export function AuthStatus() {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const user = useAppSelector(selectUser);
    const loading = useAppSelector(selectAuthLoading);
    const error = useAppSelector(selectAuthError);

    const handleLogout = () => {
        dispatch(logoutUser() as any);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (isAuthenticated && user) {
        return (
            <div>
                <p>Welcome, {user.name}!</p>
                <p>Email: {user.email}</p>
                <p>User ID: {user._id}</p>
                <p>Email Verified: {user.isEmailVerified ? 'Yes' : 'No'}</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        );
    }

    return <div>Please log in</div>;
} 