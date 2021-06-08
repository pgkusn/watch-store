import axios from 'axios';
import API from '@/assets/data/api.json';
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
        loginInfo: null,
        signUpInfo: null
    },
    mutations: {
        setLoginInfo (state, info) {
            state.loginInfo = info;
        },
        setSignUpInfo (state, info) {
            state.signUpInfo = info;
        }
    },
    actions: {
        readLS ({ commit }) {
            const info = LS.get('loginInfo');
            commit('setLoginInfo', info);
            return info;
        },
        async userLogin ({ commit }, loginData) {
            try {
                const { data } = await firebaseApi({
                    method: API.userLogin.method,
                    url: API.userLogin.url,
                    data: {
                        ...loginData,
                        returnSecureToken: true
                    }
                });
                commit('setLoginInfo', data);
                LS.set('loginInfo', data);

                return {
                    success: true,
                    ...data
                };
            }
            catch (error) {
                console.error(error.message);

                let message = error.response.data.error.message;
                switch (message) {
                case 'EMAIL_NOT_FOUND':
                    message = 'Email 不存在';
                    break;
                case 'INVALID_PASSWORD':
                    message = '密碼錯誤';
                    break;
                }

                return {
                    success: false,
                    message
                };
            }
        },
        async userSignUp ({ commit }, { email, password }) {
            try {
                const { data } = await firebaseApi({
                    method: API.userLogin.method,
                    url: API.userSignUp.url,
                    data: {
                        email,
                        password,
                        returnSecureToken: true
                    }
                });
                commit('setSignUpInfo', data);

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
        async createProfile ({ state, commit }, profile) {
            try {
                const { data } = await axios({
                    method: API.createProfile.method,
                    url: API.createProfile.url,
                    data: {
                        uid: state.signUpInfo.localId,
                        profile
                    }
                });
                commit('setLoginInfo', state.signUpInfo);
                LS.set('loginInfo', state.signUpInfo);
                return data;
            }
            catch (error) {
                console.error(error.message);
            }
        },
        async updateProfile () {

        },
        userLogout ({ commit }) {
            commit('setLoginInfo', '');
            LS.remove('loginInfo');
        }
    }
};