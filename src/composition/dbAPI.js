import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import store from '@/store';
import router from '@/route';

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
}, async function (error) {
    NProgress.done();
    const currentPage = location.hash.split('/').pop();
    if (error.response.status === 401 && currentPage !== 'createProfile') {
        await store.dispatch('setAlertMsgHandler', '登入逾時，請重新登入！');
        store.dispatch('member/userLogout');
        router.push({ name: 'Login' });
    }
    else if (currentPage !== 'createProfile') {
        router.replace({ name: 'Error', query: { status: error.response.status } });
    }
    return Promise.reject(error);
});