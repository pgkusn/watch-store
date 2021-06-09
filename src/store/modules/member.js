import axios from 'axios';
import API from '@/assets/data/api.json';
import LS from '@/composition/localStorage.js';
import store from '..';

// reference：https://firebase.google.com/docs/reference/rest/auth
const authAPI = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
    params: {
        key: import.meta.env.VITE_FIREBASE_API_KEY
    }
});

// reference: https://firebase.google.com/docs/reference/rest/database
const dbAPI = axios.create({
    baseURL: 'https://perfume-8b21d-default-rtdb.firebaseio.com'
});

export default {
    namespaced: true,
    state: {
        loginInfo: null,
        signUpInfo: null,
        profile: null
    },
    mutations: {
        setLoginInfo (state, info) {
            state.loginInfo = info;
        },
        setSignUpInfo (state, info) {
            state.signUpInfo = info;
        },
        setProfile (state, profile) {
            state.profile = profile;
        }
    },
    actions: {
        readLS ({ commit }) {
            const info = LS.get('loginInfo');
            commit('setLoginInfo', info);
            return info;
        },
        async userLogin ({ commit }, { email, password, checkPassword }) {
            try {
                const { data } = await authAPI({
                    method: API.userLogin.method,
                    url: API.userLogin.url,
                    data: {
                        email,
                        password,
                        returnSecureToken: true
                    }
                });

                if (!checkPassword) {
                    commit('setLoginInfo', data);
                    LS.set('loginInfo', data);
                }

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
        userLogout ({ commit }) {
            commit('setLoginInfo', '');
            LS.remove('loginInfo');
        },
        async userSignUp ({ commit }, { email, password }) {
            try {
                const { data } = await authAPI({
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
        async createProfile ({ state, commit }, memberData) {
            try {
                const { data } = await axios({
                    method: API.createProfile.method,
                    url: API.createProfile.url,
                    data: {
                        uid: state.signUpInfo.localId,
                        profile: memberData
                    }
                });
                LS.set('loginInfo', state.signUpInfo);
                commit('setLoginInfo', state.signUpInfo);

                return data;
            }
            catch (error) {
                console.error(error.message);
            }
            finally {
                commit('setSignUpInfo', '');
            }
        },
        async readProfile ({ state, commit }) {
            const { localId, idToken, email } = state.loginInfo;
            try {
                const { data } = await dbAPI({
                    method: API.readProfile.method,
                    url: API.readProfile.url.replace(':uid', localId),
                    params: { auth: idToken }
                });
                const profile = { email, ...data };
                commit('setProfile', profile);

                return profile;
            }
            catch (error) {
                console.error(error.message);
            }
        },
        async updateProfile ({ state, commit }, memberData) {
            const { localId, idToken, email } = state.loginInfo;
            try {
                const { data } = await dbAPI({
                    method: API.updateProfile.method,
                    url: API.updateProfile.url.replace(':uid', localId),
                    params: { auth: idToken },
                    data: memberData
                });
                const profile = { email, ...data };
                commit('setProfile', profile);

                return profile;
            }
            catch (error) {
                console.error(error.message);
            }
        },
        async updatePassword ({ state, dispatch }, { oldPassword, newPassword }) {
            const { idToken, email } = state.loginInfo;

            // check old password
            const result = await dispatch('userLogin', {
                email,
                password: oldPassword,
                checkPassword: true
            });
            if (!result.success) return result;

            // update password
            try {
                await authAPI({
                    method: API.changePassword.method,
                    url: API.changePassword.url,
                    data: {
                        idToken,
                        password: newPassword,
                        returnSecureToken: true
                    }
                });
                return { success: true };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.response.data.error.message
                };
            }
        }
    }
};