<template>
    <div class="container flex flex-col md:flex-row items-center py-10 md:py-[60px]">
        <div class="w-full md:w-0 md:flex-grow-[6.5]">
            <div class="pt-[63%] bg-center bg-cover" style="background-image: url(https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80)" />
        </div>
        <form class="flex flex-col md:flex-grow-[3.5] w-[350px] md:w-0 mx-auto mt-7 md:mt-0 md:ml-[30px]" @submit.prevent="submitHandler">
            <h2 class="text-[32px]">
                Log in
            </h2>
            <label for="email" class="mt-3">帳號</label>
            <input
                id="email"
                v-model="loginData.email"
                v-focus
                type="email"
                placeholder="email@example.com"
                class="mt-1 text-input"
                required
            >
            <label for="password" class="mt-5">密碼</label>
            <input
                id="password"
                v-model="loginData.password"
                type="password"
                placeholder="Password"
                class="mt-1 text-input"
                required
            >
            <div class="flex items-center mt-9">
                <button type="submit" class="w-[65px] h-[38px] rounded bg-dark-golden text-white focus:outline-none">
                    登入
                </button>
                <span class="mx-2">or</span>
                <router-link :to="{ name: 'CreateAccount' }" class="w-[65px] leading-[36px] text-center rounded border border-dark-golden text-dark-golden focus:outline-none">
                    註冊
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    name: 'Login',
    setup () {
        const store = useStore();
        const router = useRouter();

        const loginData = reactive({
            email: '',
            password: ''
        });
        const submitHandler = async () => {
            const result = await store.dispatch('member/userLogin', loginData);
            if (result.status === 200) {
                const beforeLogin = sessionStorage.getItem('beforeLogin');
                sessionStorage.removeItem('beforeLogin');
                if (!beforeLogin) {
                    await store.dispatch('setAlertMsgHandler', '登入成功');
                }
                router.replace({ name: beforeLogin || 'Home' });
            }
            else if (result.status === 401) {
                submitHandler();
            }
            else {
                store.dispatch('setAlertMsgHandler', result.message);
            }
        };

        return {
            loginData,
            submitHandler
        };
    }
};
</script>