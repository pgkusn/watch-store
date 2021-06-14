import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// reference：https://firebase.google.com/docs/reference/rest/auth
export const authAPI = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
    params: {
        key: import.meta.env.VITE_FIREBASE_API_KEY
    }
});

authAPI.interceptors.request.use(function (config) {
    NProgress.start();
    return config;
}, function (error) {
    return Promise.reject(error);
});

authAPI.interceptors.response.use(function (response) {
    NProgress.done();
    return response;
}, function (error) {
    NProgress.done();
    return Promise.reject(error);
});