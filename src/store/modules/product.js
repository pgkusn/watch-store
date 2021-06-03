import axios from 'axios';
import API from '@/api.json';
import LS from '@/composition/localStorage.js';

export default {
    namespaced: true,
    state: {
        favorite: [],
        cart: []
    },
    mutations: {
        setState (state, { name, value }) {
            state[name] = value;
        }
    },
    actions: {
        async getProduct () {
            try {
                const { data } = await axios({
                    method: API.product.method,
                    url: API.product.url
                });
                return data;
            }
            catch (error) {
                console.error(error.message);
            }
        },
        readLS ({ commit }, name) {
            const products = LS.get(name);
            commit('setState', { name, value: products });
            return products;
        },
        updateLS ({ commit }, { name, value }) {
            const products = LS.get(name);
            const index = products.findIndex(item => item.id === value.id);
            if (index === -1) {
                products.push(value);
            }
            else {
                products.splice(index, 1);
            }
            LS.set(name, products);
            commit('setState', { name, value: products });
            return products;
        }
    }
};