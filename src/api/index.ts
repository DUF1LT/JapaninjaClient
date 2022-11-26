import axios from 'axios';
import { ProductType } from 'models/domain/ProductType';

const API_URL = 'https://localhost:2472/api';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use(config => {
    config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

const endpoints = {
    auth: {
        login: '/auth/login',
        register: '/auth/register',
    },
    manager: {
    },
    products: {
        products: `/products`,
        productsWithId: (id: string) => `/products/${id}`,
        productsOfType: (type: ProductType) => `/products?type=${type}`,
    }
};

export default $api;
export { $api, endpoints };
