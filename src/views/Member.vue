<template>
    <div class="container flex flex-col md:flex-row py-10 md:py-[60px]">
        <div class="text-dark-gray">
            <p class="hidden md:block mb-7">
                會員中心
            </p>
            <ul class="flex items-start md:flex-col">
                <li class="cursor-pointer" :class="componentId === 'MemberUpdate' ? 'border-b-2 border-dark-golden' : ''" @click="componentId = 'MemberUpdate'">
                    會員資料修改
                </li>
                <li class="ml-10 md:ml-0 md:mt-6 cursor-pointer" :class="componentId === 'OrderHistory' ? 'border-b-2 border-dark-golden' : ''" @click="componentId = 'OrderHistory'">
                    訂單查詢
                </li>
            </ul>
        </div>

        <div class="order-1 md:order-none md:flex-grow md:pl-[8.6%] md:pr-[30px] mt-10 md:mt-0">
            <component :is="componentId" />
        </div>

        <div class="text-[#818A91] mt-10 md:mt-0">
            <ul class="flex items-center">
                <li class="material-icons text-black">
                    person
                </li>
                <li class="ml-[5px]">
                    會員編號
                </li>
                <li class="text-xl ml-[5px]">
                    T00020080615
                </li>
            </ul>
            <table>
                <tr>
                    <td class="w-[95px] pt-4">
                        購物車
                    </td>
                    <td class="pt-4">
                        56
                    </td>
                </tr>
                <tr>
                    <td class="pt-4">
                        我的收藏
                    </td>
                    <td class="pt-4">
                        23
                    </td>
                </tr>
                <tr>
                    <td class="pt-4">
                        完成訂單
                    </td>
                    <td class="pt-4">
                        8
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import MemberUpdate from '@/components/MemberUpdate.vue';
import OrderHistory from '@/components/OrderHistory.vue';

export default {
    name: 'Member',
    components: {
        MemberUpdate,
        OrderHistory
    },
    setup () {
        const store = useStore();

        const componentId = ref('MemberUpdate');

        return {
            componentId
        };
    }
};
</script>