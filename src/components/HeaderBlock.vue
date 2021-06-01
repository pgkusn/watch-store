<template>
    <div class="container relative flex items-center py-[9px]">
        <router-link :to="{ name: 'Home' }">
            <h1 class="w-[128px]">
                <img src="@/assets/images/logo.png" :srcset="`${logo2x} 2x`" alt="d’Perfume">
            </h1>
        </router-link>
        <a href="" class="relative ml-auto mr-4 md:hidden">
            <span class="material-icons text-dark-gray">shopping_cart</span>
            <span class="absolute -top-1 -right-1 text-xs text-white bg-dark-golden rounded-lg px-1">3</span>
        </a>
        <label for="nav" class="cursor-pointer md:hidden">
            <span class="material-icons text-dark-gray text-4xl">menu</span>
        </label>
        <input id="nav" class="hidden" type="checkbox">
        <nav class="absolute md:static md:ml-auto top-full inset-x-0 flex flex-col md:flex-row text-center text-white md:text-dark-gray bg-dark-gray md:bg-transparent opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto transition-opacity duration-300">
            <a href="" class="text-xl leading-[56px]">
                <span class="material-icons align-middle hidden md:inline-block">store</span>
                Product
            </a>
            <a href="" class="text-xl leading-[56px] order-1 md:order-none">
                <span class="material-icons align-middle hidden md:inline-block">person</span>
                Log in
            </a>
            <a href="" class="text-xl leading-[56px]">
                <span class="material-icons align-middle hidden md:inline-block">favorite</span>
                Wishlist
            </a>
            <a href="" class="text-xl leading-[56px] hidden md:block">
                <span class="material-icons align-middle hidden md:inline-block">shopping_cart</span>
                Cart(3)
            </a>
        </nav>
    </div>
</template>

<script>
import logo2x from '@/assets/images/logo@2x.png';

export default {
    name: 'HeaderBlock',
    setup () {
        return {
            logo2x
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
</style>