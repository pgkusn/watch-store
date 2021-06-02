<template>
    <footer class="bg-dark-golden text-white">
        <div class="container flex justify-between items-center h-[80px]">
            <router-link :to="{ name: 'Home' }">
                <h1 class="w-[128px]">
                    <img src="@/assets/images/logo_w.png" :srcset="`${logoW2x} 2x`" alt="d’Perfume">
                </h1>
            </router-link>
            <p class="text-sm">
                © 2020. All Rights Reserved.
            </p>
            <!-- <div class="hidden md:flex ml-auto text-white text-xl">
                <a href="">Product</a>
                <a href="" class="ml-9">Blog</a>
                <a href="" class="ml-9">Contact</a>
            </div> -->
        </div>
    </footer>
</template>

<script>
import logoW2x from '@/assets/images/logo_w@2x.png';

export default {
    name: 'FooterBlock',
    setup () {
        return {
            logoW2x
        };
    }
};
</script>

<style>

</style>