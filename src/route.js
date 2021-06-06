import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Product from '@/views/Product.vue';
import Wishlist from '@/views/Wishlist.vue';
import Cart from '@/views/Cart.vue';
import ProductDetail from '@/views/ProductDetail.vue';
import Login from '@/views/Login.vue';

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/product/:brand?/:page?',
            name: 'Product',
            component: Product,
            props: route => ({
                brand: route.params.brand || 'jo',
                page: route.params.page || '1'
            })
        },
        {
            path: '/wishlist/:page?',
            name: 'Wishlist',
            component: Wishlist,
            props: route => ({
                page: route.params.page || '1'
            })
        },
        {
            path: '/cart/:page?',
            name: 'Cart',
            component: Cart,
            props: route => ({
                page: route.params.page || '1'
            })
        },
        {
            path: '/productDetail/:id',
            name: 'ProductDetail',
            component: ProductDetail,
            props: true
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: Home
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ left: 0, top: 0 });
            }, 500);
        });
    }
});