<template>
    <div class="container flex items-center py-[9px]">
        <router-link :to="{ name: 'Home' }" class="w-12">
            <img src="@/assets/images/logo.svg" alt="Watch Store">
        </router-link>
        <router-link :to="{ name: 'Cart' }" class="relative ml-auto mr-4 md:hidden">
            <span class="material-icons text-dark-gray">shopping_cart</span>
            <span v-if="cart.length" class="absolute -top-1 -right-1 text-xs text-white bg-raisin-black rounded-lg px-1">{{ cart.length }}</span>
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
        <nav class="absolute md:static top-[62px] inset-x-0 z-10 flex flex-col md:flex-row md:ml-auto text-center text-white md:text-dark-gray bg-dark-gray md:bg-transparent opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto transition-opacity duration-300">
            <router-link :to="{ name: 'Products' }" class="text-xl leading-[56px] md:hover:text-raisin-black">
                <span class="material-icons align-middle hidden md:inline-block">store</span>
                Product
            </router-link>
            <router-link :to="{ name: loginInfo ? 'Member' : 'Login' }" class="text-xl leading-[56px] order-1 md:order-none md:hover:text-raisin-black">
                <span class="material-icons align-middle hidden md:inline-block">person</span>
                {{ loginInfo ? 'Mypage' : 'Log in' }}
            </router-link>
            <router-link :to="{ name: 'Wishlist' }" class="text-xl leading-[56px] md:hover:text-raisin-black">
                <span class="material-icons align-middle hidden md:inline-block">favorite</span>
                Wishlist
            </router-link>
            <router-link :to="{ name: 'Cart' }" class="text-xl leading-[56px] hidden md:block md:hover:text-raisin-black">
                <span class="material-icons align-middle hidden md:inline-block">shopping_cart</span>
                Cart<span v-if="cart.length">({{ cart.length }})</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'HeaderBlock',
    setup () {
        const store = useStore();

        const cart = computed(() => store.state.product.cart);

        const loginInfo = computed(() => store.state.member.loginInfo);

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
            cart,
            showNav,
            stopPropagation,
            loginInfo
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
nav > .router-link-active {
    background-color: #666;
    @media (min-width: #{$screen-md}px) {
        background-color: transparent;
        color: $raisin-black;
    }
}
</style>