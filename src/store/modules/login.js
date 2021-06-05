import axios from 'axios';
import API from '@/api.json';
import LS from '@/composition/localStorage.js';

// doc：https://firebase.google.com/docs/reference/rest/auth
const firebaseApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
    params: {
        key: import.meta.env.VITE_FIREBASE_API_KEY
    }
});

export default {
    namespaced: true,
    state: {
        loginInfo: ''
    },
    mutations: {
        setLoginInfo (state, info) {
            state.loginInfo = info;
        }
    },
    actions: {
        readLS ({ commit }) {
            const info = LS.get('loginInfo');
            commit('setLoginInfo', info);
            return info;
        },
        async userLogin ({ commit }, payload) {
            try {
                const { data } = await firebaseApi({
                    method: API.userLogin.method,
                    url: API.userLogin.url,
                    data: {
                        ...payload,
                        returnSecureToken: true
                    }
                });
                commit('setLoginInfo', data.email);
                LS.set('loginInfo', data.email);

                return {
                    success: true,
                    ...data
                };
            }
            catch (error) {
                console.error(error.message);

                let message = '';
                switch (error.response.data.error?.message) {
                case 'EMAIL_NOT_FOUND':
                    message = 'Email 不存在';
                    break;
                case 'INVALID_PASSWORD':
                    message = '密碼錯誤';
                    break;
                default:
                    message = '登入失敗';
                    break;
                }

                return {
                    success: false,
                    message
                };
            }
        },
        async userSignUp ({ commit }, payload) {
            try {
                const { data } = await firebaseApi({
                    method: API.userLogin.method,
                    url: API.userSignUp.url,
                    data: {
                        ...payload,
                        returnSecureToken: true
                    }
                });
                commit('setLoginInfo', data.email);
                LS.set('loginInfo', data.email);

                return {
                    success: true,
                    ...data
                };
            }
            catch (error) {
                console.error(error.message);

                let message = error.response.data.error.message;
                switch (message) {
                case 'EMAIL_EXISTS':
                    message = 'Email 重複';
                    break;
                case 'INVALID_EMAIL':
                    message = 'Email 格式錯誤';
                    break;
                }

                return {
                    success: false,
                    message
                };
            }
        },
        userLogout ({ commit }) {
            commit('setLoginInfo', '');
            LS.remove('loginInfo');
        }
    }
};