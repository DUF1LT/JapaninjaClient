import axios from 'axios';
import { ProductType } from 'models/domain/ProductType';

const API_URL = 'https://localhost:2472/api';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    timeout: 10000,
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
    couriers: {
        root: '/couriers',
        withId: (id: string) => `/couriers/${id}`,
    },
    products: {
        root: `/products`,
        withId: (id: string) => `/products/${id}`,
        ofType: (type: ProductType) => `/products?type=${type}`,
    },
    orders: {
        root: '/orders',
        orderConfiguration: (customerId?: string) => `/orders/configuration/${!!customerId ? customerId : 'null'}`,
    }
};

export default $api;
export { $api, endpoints };
