import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { baseInstance } from '../../configs';
import { toast } from 'react-toastify';
import { ErrorResponse } from '../../types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../app';
import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });

type LoginPayload = { username: string; password: string }

type UserResponse = {
    message: string;
    account: {
        id: 1,
        firstName: string;
        lastName: string;
        username: string;
        role: string;
    },
    token: string;
}

const loginUserService = async (loginData: LoginPayload) => {
    const response = await baseInstance.post('/user/validate', loginData);
    return response.data;
};

export const useLogin = () => {
    const navigate = useNavigate();
    const [, setCookie] = useCookies(['token']);

    return useMutation({
        mutationFn: loginUserService,
        onError(ex: AxiosError<ErrorResponse>) {
            toast.error(ex?.response?.data?.message)
        },
        onSuccess(res: UserResponse) {
            if (res.token) {
                setCookie('token', res.token, {
                    maxAge: 1200000,
                });
                baseInstance.defaults.headers['Authorization'] = `Bearer ${cookies.get('token')}`
                toast.success(res.message);
                console.log(res?.account?.role);
                if (res?.account?.role === "super_admin") return navigate(ROUTES.HOME.ROOT);
                navigate(ROUTES.HOME.ROOT);

            }
        }
    });
};

