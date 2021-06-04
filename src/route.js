import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Product from '@/views/Product.vue';
import Wishlist from '@/views/Wishlist.vue';
import Cart from '@/views/Cart.vue';
import ProductDetail from '@/views/ProductDetail.vue';

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
            path: '/:pathMatch(.*)*',
            redirect: Home
        }
    ],
    scrollBehavior: () => ({ top: 0 })
});