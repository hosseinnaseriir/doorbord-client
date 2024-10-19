import { AxiosError } from './../../../../../node_modules/axios/index.d';
import { useMutation } from '@tanstack/react-query';
import { baseInstance } from '../../configs';
import { toast } from 'react-toastify';
import { ErrorResponse } from '../../types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../app';
import { useCookies } from 'react-cookie';

type LoginPayload = { username: string; password: string }

type UserResponse = {
    message: string;
    validatedUser: {
        id: 1,
        firstName: string;
        lastName: string;
        username: string;
        role: string;
    },
    token: string;
}

const loginUser = async (loginData: LoginPayload) => {
    const response = await baseInstance.post('/user/validate', loginData);
    return response.data;
};

export const useLogin = () => {
    const navigate = useNavigate();
    const [, setCookie] = useCookies(['token']);

    return useMutation({
        mutationFn: loginUser,
        onError(ex: AxiosError<ErrorResponse>) {
            toast.error(ex?.response?.data?.message)
        },
        onSuccess(res: UserResponse) {
            if (res.token) {
                navigate(ROUTES.ROOT);
                setCookie('token', res.token);
                toast.success(res.message);
            }
        }
    });
};

