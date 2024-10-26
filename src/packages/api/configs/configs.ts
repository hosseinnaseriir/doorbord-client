
import axios from 'axios'
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';

export const BASE_URL = import.meta.env.VITE_BASE_URL;
const cookies = new Cookies(null, { path: '/' });

export const baseInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.get('token')}`
    }
});

baseInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (!error.response) {
            toast.error("اتصال اینترنت خود را بررسی کنید")
        } else {
            const status = error.response.status;

            switch (status) {
                case 401:
                    cookies.remove('token');
                    toast.error("لطفا وارد شوید")
                    console.error('Unauthorized: Please log in again.');
                    break;
                case 403:
                    console.error('Forbidden: You do not have the required permissions.');
                    break;
                case 404:
                    console.error('Resource not found.');
                    break;
                case 500:
                    console.error('Server error: Please try again later.');
                    break;
                default:
                    console.error(`Error ${status}: ${error.response.statusText}`);
            }
        }

        return Promise.reject(error);
    }
);