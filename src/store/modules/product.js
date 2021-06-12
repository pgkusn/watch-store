import axios from 'axios';
import API from '@/assets/data/api.json';
import LS from '@/composition/localStorage.js';

export default {
    namespaced: true,
    state: {
        products: [],
        favorite: [],
        cart: []
    },
    mutations: {
        setState (state, { name, value }) {
            state[name] = value;
        }
    },
    actions: {
        createLS ({ commit }, { name, value }) {
            LS.set(name, value);
            commit('setState', { name, value });
            return value;
        },
        readLS ({ commit }, name) {
            const products = LS.get(name) || [];
            commit('setState', { name, value: products });
            return products;
        },
        removeLS ({ commit, dispatch, rootState }, name) {
            LS.remove(name);
            commit('setState', { name, value: [] });

            if (rootState.member.loginInfo) {
                dispatch('member/updatePreferences', null, { root: true });
            }

            return [];
        },
        updateLS ({ commit, dispatch, rootState }, { name, value }) {
            const products = LS.get(name) || [];
            const index = products.findIndex(item => item.id === value.id);
            if (index === -1) {
                products.push(value);
            }
            else {
                products.splice(index, 1);
            }
            LS.set(name, products);
            commit('setState', { name, value: products });

            if (rootState.member.loginInfo) {
                dispatch('member/updatePreferences', null, { root: true });
            }

            return products;
        },
        async getProduct ({ commit }) {
            try {
                const { data } = await axios({
                    method: API.product.method,
                    url: API.product.url
                });
                commit('setState', { name: 'products', value: data });
                return data;
            }
            catch (error) {
                console.error(error.message);
            }
        },
        async getProductDetail (context, id) {
            try {
                const { data } = await axios({
                    method: API.productDetail.method,
                    url: API.productDetail.url.replace(':id', id)
                });
                return data;
            }
            catch (error) {
                console.error(error.message);
            }
        }
    }
};