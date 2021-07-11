<template>
    <footer class="bg-raisin-black text-white">
        <div class="container flex justify-between items-center h-[80px]">
            <router-link :to="{ name: 'Home' }" class="w-12">
                <img src="@/assets/images/logo-white.svg" alt="Watch Store">
            </router-link>
            <p class="text-sm">
                <a href="https://www.freepik.com/vectors/logo" target="_blank">Logo vector created by eightonesix - www.freepik.com</a>
            </p>
        </div>
    </footer>
</template>

<script>

export default {
    name: 'FooterBlock'
};
</script>