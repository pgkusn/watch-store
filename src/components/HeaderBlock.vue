<template>
    <div class="container relative flex items-center py-[9px]">
        <router-link :to="{ name: 'Home' }">
            <h1 class="w-[128px]">
                <img src="@/assets/images/logo.png" :srcset="`${logo2x} 2x`" alt="d’Perfume">
            </h1>
        </router-link>
        <router-link :to="{ name: 'Cart' }" class="relative ml-auto mr-4 md:hidden">
            <span class="material-icons text-dark-gray">shopping_cart</span>
            <span v-if="cart.length" class="absolute -top-1 -right-1 text-xs text-white bg-dark-golden rounded-lg px-1">{{ cart.length }}</span>
        </router-link>
        <label for="nav" class="cursor-pointer md:hidden" @click="stopPropagation">
            <span class="material-icons text-dark-gray text-4xl">menu</span>
        </label>
        <input
            id="nav"
            v-model="showNav"
            class="hidden"
            type="checkbox"
        >
        <nav class="absolute z-10 md:static md:ml-auto top-full inset-x-0 flex flex-col md:flex-row text-center text-white md:text-dark-gray bg-dark-gray md:bg-transparent opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto transition-opacity duration-300">
            <router-link :to="{ name: 'Product' }" class="text-xl leading-[56px]">
                <span class="material-icons align-middle hidden md:inline-block">store</span>
                Product
            </router-link>
            <router-link :to="{ name: 'Wishlist' }" class="text-xl leading-[56px]">
                <span class="material-icons align-middle hidden md:inline-block">favorite</span>
                Wishlist
            </router-link>
            <router-link :to="{ name: 'Cart' }" class="text-xl leading-[56px] hidden md:block">
                <span class="material-icons align-middle hidden md:inline-block">shopping_cart</span>
                Cart<span v-if="cart.length">({{ cart.length }})</span>
            </router-link>
            <a href class="text-xl leading-[56px] order-1 md:order-none" @click.prevent="login">
                <span class="material-icons align-middle hidden md:inline-block">person</span>
                {{ loginInfo.length ? 'Log out' : 'Log in' }}
            </a>
        </nav>
    </div>
</template>

<script>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import logo2x from '@/assets/images/logo@2x.png';

export default {
    name: 'HeaderBlock',
    setup () {
        const store = useStore();
        const router = useRouter();

        const cart = computed(() => store.state.product.cart);

        const loginInfo = computed(() => store.state.login.loginInfo);
        const login = () => {
            if (!loginInfo.value.length) {
                router.push({ name: 'Login' });
                return;
            }
            if (confirm('確定登出?')) {
                store.dispatch('login/userLogout');
            }
        };

        // toggle nav
        const showNav = ref(false);
        const clickHandler = () => {
            showNav.value = false;
        };
        const stopPropagation = () => {
            event.stopPropagation();
        };
        onMounted(() => {
            document.body.addEventListener('click', clickHandler);
        });
        onBeforeUnmount(() => {
            document.body.removeEventListener('click', clickHandler);
        });

        return {
            logo2x,
            cart,
            showNav,
            stopPropagation,
            loginInfo,
            login
        };
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common';
#nav:checked + nav {
    opacity: 1;
    pointer-events: auto;
}
nav > a + a {
    border-top: 1px solid #fff;
    @media (min-width: #{$screen-md}px) {
        margin-left: 32px;
        border-top: none;
    }
}
.router-link-active {
    color: #333;
}
</style>