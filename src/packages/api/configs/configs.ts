
import axios from 'axios'
import Cookies from 'universal-cookie';

export const BASE_URL = import.meta.env.VITE_BASE_URL;
const cookies = new Cookies(null, { path: '/' });

export const baseInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.get('token')}`
    }
})