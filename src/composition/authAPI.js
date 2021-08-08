import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import store from '@/store';
import router from '@/route';

// reference：https://firebase.google.com/docs/reference/rest/auth
export const authAPI = axios.create({
    baseURL: import.meta.env.VITE_AUTH_API_URL,
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
}, async function (error) {
    NProgress.done();
    if (error.response.status === 401) {
        await store.dispatch('setAlertMsgHandler', '登入逾時，請重新登入！');
        store.dispatch('member/userLogout');
        router.push({ name: 'Login' });
    }
    return Promise.reject(error);
});