<template>
    <HeaderBlock />
    <router-view />
    <FooterBlock />
</template>

<script>
import HeaderBlock from '@/components/HeaderBlock.vue';
import FooterBlock from '@/components/FooterBlock.vue';

export default {
    components: {
        HeaderBlock,
        FooterBlock
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
</style>