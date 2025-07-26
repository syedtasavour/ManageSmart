import { useMSForm } from '../../components/forms/useMSForm';
import { MSForm } from '../../components/forms/MSForm';
import { MSInput } from '../../components/ui/input/MSInput';
import { MsButton } from '../../components/ui/buttons/MsButton';
import { loginSchema } from '../../lib/validationSchemas';
import type { LoginSchema } from '../../lib/validationSchemas';

export function LoginForm() {
    const form = useMSForm<LoginSchema>({
        schema: loginSchema,
        defaultValues: { email: '', password: '' },
        apiConfig: {
            endpoint: '/auth/login',
            method: 'POST',
        },
        onSuccess: (response) => {
            if (response?.token) {
                document.cookie = `accessToken=${response.token}; path=/; max-age=86400; SameSite=Strict; Secure`;
            }
            localStorage.setItem('isLoggedIn', 'true');
        },
        onError: (error) => console.log(error),
        successMessage: 'Logged in successfully!',
        errorMessage: 'Login failed. Please check your credentials.',
    });


    return (
        <MSForm form={form}>
            <MSInput name="email" label="Email" placeholder="Enter your email" />
            <MSInput name="password" className='w-sm' label="Password" type="password" placeholder="Enter your password" />
            <MsButton type="submit" variant="primary" fullWidth={false} className='sm' loading={form.apiLoading}>
                Login
            </MsButton>
        </MSForm>
    );
}
