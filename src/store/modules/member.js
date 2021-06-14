import { toRaw } from 'vue';
import API from '@/assets/data/api.json';
import LS from '@/composition/localStorage.js';
import { authAPI } from '@/composition/authAPI.js';
import { dbAPI } from '@/composition/dbAPI.js';

export default {
    namespaced: true,
    state: {
        loginInfo: null,
        signUpInfo: null,
        profile: null,
        orders: []
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
        },
        setOrders (state, orders) {
            state.orders = orders;
        }
    },
    actions: {
        readLS ({ commit }) {
            const info = LS.get('loginInfo');
            commit('setLoginInfo', info);
            return info;
        },
        async userLogin ({ commit, dispatch }, { email, password }) {
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

                commit('setLoginInfo', data);
                LS.set('loginInfo', data);

                // 如 DB 有資料時寫入 client 端，否則 client 端寫入 DB
                const result = await dispatch('readPreferences');
                if (result.status === 200) {
                    const { cart = [], favorite = [] } = result.data;
                    if (cart.length || favorite.length) {
                        dispatch('product/createLS', { name: 'cart', value: cart }, { root: true });
                        dispatch('product/createLS', { name: 'favorite', value: favorite }, { root: true });
                    }
                    else {
                        const result = await dispatch('updatePreferences');
                        if (result.status === 401) {
                            return {
                                status: result.status
                            };
                        }
                    }
                }
                else if (result.status === 401) {
                    return {
                        status: result.status
                    };
                }

                return {
                    status: 200,
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
                    status: error.response.status,
                    message
                };
            }
        },
        async userLogout ({ commit, dispatch }) {
            LS.remove('loginInfo');
            commit('setLoginInfo', null);
            commit('setProfile', null);
            commit('setOrders', []);
            dispatch('product/removeLS', 'cart', { root: true });
            dispatch('product/removeLS', 'favorite', { root: true });
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
                    status: 200,
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
                    status: error.response.status,
                    message
                };
            }
        },
        async createProfile ({ state, commit, dispatch }, memberData) {
            const { localId, refreshToken } = state.signUpInfo;
            try {
                await dbAPI({
                    method: API.createProfile.method,
                    url: API.createProfile.url.replace(':uid', localId),
                    data: memberData
                });

                LS.set('loginInfo', state.signUpInfo);
                commit('setLoginInfo', state.signUpInfo);

                const result = await dispatch('updatePreferences');
                if (result.status === 401) {
                    return {
                        status: result.status
                    };
                }

                return {
                    status: 200
                };
            }
            catch (error) {
                if (error.response?.status === 401) {
                    const result = await dispatch('refreshToken', refreshToken);
                    if (result) {
                        return {
                            status: error.response.status
                        };
                    }
                }
            }
            finally {
                commit('setSignUpInfo', '');
            }
        },
        async readProfile ({ state, commit, dispatch }) {
            const { localId, idToken, email, refreshToken } = state.loginInfo;
            try {
                const { data } = await dbAPI({
                    method: API.readProfile.method,
                    url: API.readProfile.url.replace(':uid', localId),
                    params: { auth: idToken }
                });
                const profile = { email, ...data };
                commit('setProfile', profile);

                return {
                    status: 200,
                    profile
                };
            }
            catch (error) {
                if (error.response?.status === 401) {
                    const result = await dispatch('refreshToken', refreshToken);
                    if (result) {
                        return {
                            status: error.response.status
                        };
                    }
                }
            }
        },
        async updatePassword ({ state, dispatch }, { oldPassword, newPassword }) {
            // check old password
            const result = await dispatch('userLogin', {
                email: state.loginInfo.email,
                password: oldPassword
            });
            if (result.status === 401) {
                const result = await dispatch('refreshToken', refreshToken);
                if (result) {
                    return {
                        status: result.status
                    };
                }
            }
            else if (result.status !== 200) {
                return result;
            }

            // update password
            try {
                await authAPI({
                    method: API.changePassword.method,
                    url: API.changePassword.url,
                    data: {
                        idToken: state.loginInfo.idToken,
                        password: newPassword,
                        returnSecureToken: true
                    }
                });
                return { status: 200 };
            }
            catch (error) {
                return {
                    status: error.response.status,
                    message: error.response.data.error.message
                };
            }
        },
        async resetPassword (context, email) {
            try {
                await authAPI({
                    method: API.resetPassword.method,
                    url: API.resetPassword.url,
                    data: {
                        requestType: 'PASSWORD_RESET',
                        email
                    }
                });
                return {
                    status: 200
                };
            }
            catch (error) {
                console.error(error.message);

                let message = error.response.data.error.message;
                if (message === 'INVALID_EMAIL') {
                    message = '查無此信箱';
                }
                return {
                    status: error.response.status,
                    message
                };
            }
        },
        async refreshToken ({ state, commit }, token) {
            const params = new URLSearchParams();
            params.append('grant_type', 'refresh_token');
            params.append('refresh_token', token);
            try {
                const { data } = await authAPI({
                    method: API.refreshToken.method,
                    url: API.refreshToken.url,
                    data: params
                });
                const loginInfo = toRaw(state.loginInfo);
                loginInfo.idToken = data.id_token;
                loginInfo.refreshToken = data.refresh_token;
                commit('setLoginInfo', loginInfo);
                LS.set('loginInfo', loginInfo);
                return data;
            }
            catch (error) {
                console.error(error.message);
            }
        },
        async updateProfile ({ state, commit, dispatch }, memberData) {
            const { localId, idToken, email, refreshToken } = state.loginInfo;
            try {
                const { data } = await dbAPI({
                    method: API.updateProfile.method,
                    url: API.updateProfile.url.replace(':uid', localId),
                    params: { auth: idToken },
                    data: memberData
                });
                const profile = { email, ...data };
                commit('setProfile', profile);

                return {
                    status: 200,
                    profile
                };
            }
            catch (error) {
                if (error.response?.status === 401) {
                    const result = await dispatch('refreshToken', refreshToken);
                    if (result) {
                        return {
                            status: error.response.status
                        };
                    }
                }
            }
        },
        async updatePreferences ({ state, rootState, dispatch }) {
            const { localId, idToken, refreshToken } = state.loginInfo;
            try {
                await dbAPI({
                    method: API.updatePreferences.method,
                    url: API.updatePreferences.url.replace(':uid', localId),
                    params: { auth: idToken },
                    data: {
                        cart: rootState.product.cart,
                        favorite: rootState.product.favorite
                    }
                });
                return {
                    status: 200
                };
            }
            catch (error) {
                if (error.response?.status === 401) {
                    const result = await dispatch('refreshToken', refreshToken);
                    if (result) {
                        return {
                            status: error.response.status
                        };
                    }
                }
            }
        },
        async readPreferences ({ state, dispatch }) {
            const { localId, idToken, refreshToken } = state.loginInfo;
            try {
                const { data } = await dbAPI({
                    method: API.readPreferences.method,
                    url: API.readPreferences.url.replace(':uid', localId),
                    params: { auth: idToken }
                });
                return {
                    status: 200,
                    data
                };
            }
            catch (error) {
                if (error.response?.status === 401) {
                    const result = await dispatch('refreshToken', refreshToken);
                    if (result) {
                        return {
                            status: error.response.status
                        };
                    }
                }
            }
        },
        async createOrder ({ state, dispatch }, order) {
            const { localId, idToken, refreshToken } = state.loginInfo;
            try {
                await dbAPI({
                    method: API.createOrder.method,
                    url: API.createOrder.url.replace(':uid', localId),
                    params: { auth: idToken },
                    data: order
                });
                return {
                    status: 200
                };
            }
            catch (error) {
                if (error.response?.status === 401) {
                    const result = await dispatch('refreshToken', refreshToken);
                    if (result) {
                        return {
                            status: error.response.status
                        };
                    }
                }
            }
        },
        async readOrders ({ state, commit, dispatch }) {
            const { localId, idToken, refreshToken } = state.loginInfo;
            try {
                const { data } = await dbAPI({
                    method: API.readOrders.method,
                    url: API.readOrders.url.replace(':uid', localId),
                    params: { auth: idToken }
                });
                if (data) {
                    const orders = Object.keys(data).reduce((previousValue, currentValue) => {
                        previousValue.push({ orderID: currentValue, ...data[currentValue] });
                        return previousValue;
                    }, []);
                    commit('setOrders', orders);
                }
                return {
                    status: 200
                };
            }
            catch (error) {
                if (error.response?.status === 401) {
                    const result = await dispatch('refreshToken', refreshToken);
                    if (result) {
                        return {
                            status: error.response.status
                        };
                    }
                }
            }
        }
    }
};