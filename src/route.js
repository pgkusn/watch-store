import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Product from '@/views/Product.vue';

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/product/:page?',
            name: 'Product',
            component: Product,
            props: route => ({ page: route.params.page || '1' })
        }
    ],
    scrollBehavior: () => ({ top: 0 })
});