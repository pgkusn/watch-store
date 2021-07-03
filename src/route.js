import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';
import Home from '@/views/Home.vue';
import Products from '@/views/Products.vue';
import Wishlist from '@/views/Wishlist.vue';
import Cart from '@/views/Cart.vue';
import Product from '@/views/Product.vue';
import Login from '@/views/Login.vue';
import SignUp from '@/views/SignUp.vue';
import CreateAccount from '@/views/CreateAccount.vue';
import CreateProfile from '@/views/CreateProfile.vue';
import Member from '@/views/Member.vue';

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/products/:brand?/:page?',
            name: 'Products',
            component: Products,
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
            path: '/product/:id',
            name: 'Product',
            component: Product,
            props: true
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            beforeEnter (to, from, next) {
                if (store.state.member.loginInfo) {
                    next({ name: 'Home' });
                }
                else {
                    next();
                }
            }
        },
        {
            path: '/signUp',
            name: 'SignUp',
            component: SignUp,
            children: [
                {
                    path: '',
                    name: 'CreateAccount',
                    component: CreateAccount
                },
                {
                    path: 'createProfile',
                    name: 'CreateProfile',
                    component: CreateProfile,
                    beforeEnter (to, from, next) {
                        if (from.name !== 'CreateAccount') {
                            next({ name: 'CreateAccount' });
                        }
                        else {
                            next();
                        }
                    }
                }
            ]
        },
        {
            path: '/member',
            name: 'Member',
            component: Member,
            beforeEnter (to, from, next) {
                if (!store.state.member.loginInfo) {
                    next({ name: 'Login' });
                }
                else {
                    next();
                }
            }
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