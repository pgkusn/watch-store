import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// reference: https://firebase.google.com/docs/reference/rest/database
export const dbAPI = axios.create({
    baseURL: import.meta.env.VITE_DB_API_URL
});

dbAPI.interceptors.request.use(function (config) {
    NProgress.start();
    return config;
}, function (error) {
    return Promise.reject(error);
});

dbAPI.interceptors.response.use(function (response) {
    NProgress.done();
    return response;
}, function (error) {
    NProgress.done();
    return Promise.reject(error);
});