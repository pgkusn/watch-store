<template>
    <HeaderBlock />

    <main class="flex-grow relative overflow-hidden">
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </main>

    <FooterBlock />

    <transition name="fade">
        <Alert v-if="alertMsg" :msg="alertMsg" />
    </transition>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import HeaderBlock from '@/components/HeaderBlock.vue';
import FooterBlock from '@/components/FooterBlock.vue';
import Alert from '@/components/Alert.vue';

export default {
    components: {
        HeaderBlock,
        FooterBlock,
        Alert
    },
    setup () {
        const store = useStore();

        const alertMsg = computed(() => store.state.alertMsg);

        onMounted(() => {
            store.dispatch('login/readLS');
            store.dispatch('product/readLS', 'favorite');
            store.dispatch('product/readLS', 'cart');
        });

        return {
            alertMsg
        };
    }
};
</script>

<style lang="scss">
@import '@/assets/sass/common';
body {
    min-width: 375px;
}
.container {
    margin: 0 auto;
    padding: 0 15px;
    max-width: 1110px !important;
    @media (min-width: #{$screen-xl}px) {
        padding-right: 0;
        padding-left: 0;
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
#app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
</style>