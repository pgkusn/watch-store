<template>
    <footer class="bg-dark-golden text-white">
        <div class="container flex justify-between items-center h-[80px]">
            <router-link :to="{ name: 'Home' }">
                <h1 class="w-[128px]">
                    <img src="@/assets/images/logo_w.png" :srcset="`${logoW2x} 2x`" alt="d’Perfume">
                </h1>
            </router-link>
            <p class="text-sm">
                © {{ new Date().getFullYear() }}. All Rights Reserved.
            </p>
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