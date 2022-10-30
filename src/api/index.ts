import axios from 'axios';

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
    login: '/auth/login',
    register: '/auth/register',
};

export default $api;
export { $api, endpoints };
