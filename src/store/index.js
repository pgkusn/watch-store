import { createStore } from 'vuex';
import axios from 'axios';
import product from './modules/product';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export default createStore({
    modules: {
        product
    }
});