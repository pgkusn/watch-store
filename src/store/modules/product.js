import axios from 'axios';
import API from '@/api.json';

export default {
    namespaced: true,
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
        }
    }
};