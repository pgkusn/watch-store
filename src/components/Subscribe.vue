<template>
    <div class="bg-cover bg-left" style="background-image: url(https://hexschool.github.io/webLayoutTraining1st/perfume-week6/index10.jpg)">
        <div class="container h-[600px] pt-[312px]">
            <form class="max-w-[350px] mx-auto md:ml-0" @submit.prevent="subscribe">
                <p class="text-dark-gray text-[32px]">
                    記得<br>訂閱以獲取更多資訊！
                </p>
                <div class="flex mt-5">
                    <input
                        v-model="email"
                        type="email"
                        placeholder="Your email address"
                        class="flex-grow w-0 h-15 pl-[14.5px] rounded-l rounded-r-none border-2 border-dark-golden placeholder-dark-gray outline-none"
                        required
                    >
                    <input type="submit" value="Subscribe" class="w-[129px] h-15 text-white rounded-r rounded-l-none bg-dark-golden cursor-pointer">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'Subscribe',
    setup () {
        const store = useStore();

        const email = ref('');
        const subscribe = async () => {
            await store.dispatch('setAlertMsgHandler', '訂閱成功');
            email.value = '';
        };

        return {
            email,
            subscribe
        };
    }
};
</script>