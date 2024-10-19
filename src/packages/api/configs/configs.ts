
import axios from 'axios'

export const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(BASE_URL);

export const baseInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})