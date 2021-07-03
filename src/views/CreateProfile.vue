<template>
    <form @submit.prevent="submitHandler">
        <table class="w-full">
            <caption class="text-left font-medium pb-2 border-b border-blue-gray">
                建立個人資料
            </caption>
            <tbody class="text-blue-gray">
                <tr>
                    <td class="pt-5 w-[90px]">
                        <div>會員姓名</div>
                    </td>
                    <td class="pt-5">
                        <input
                            v-model="memberData.name"
                            type="text"
                            class="text-input"
                            required
                        >
                    </td>
                </tr>
                <tr>
                    <td class="pt-5">
                        <div>會員性別</div>
                    </td>
                    <td class="pt-5">
                        <div class="select">
                            <select v-model="memberData.gender">
                                <option value="male">
                                    男
                                </option>
                                <option value="female">
                                    女
                                </option>
                            </select>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="pt-5">
                        <div>手機號碼</div>
                    </td>
                    <td class="pt-5">
                        <input
                            v-model="memberData.cellPhone"
                            type="text"
                            class="text-input"
                            required
                        >
                    </td>
                </tr>
                <tr>
                    <td class="pt-5 align-top">
                        <div class="pt-2">
                            聯絡地址
                        </div>
                    </td>
                    <td class="pt-5">
                        <div class="select w-[174px]">
                            <select v-model="memberData.address.contact.country" required>
                                <option value="台灣及離島">
                                    台灣及離島
                                </option>
                            </select>
                        </div>
                        <br>
                        <CitySelect @changeCity="value => changeCity('contact', value)" />
                        <input
                            v-model="memberData.address.contact.other"
                            type="text"
                            class="text-input mt-2"
                            placeholder="請輸入地址"
                        >
                        <label class="flex items-center mt-3">
                            <input v-model="memberData.edm" type="checkbox" class="checkbox appearance-none w-[15px] h-[15px] rounded-[3px] mr-1 border border-[#CED4DA] checked:border-none checked:bg-dark-golden">
                            我願意收到最新優惠情報
                        </label>
                    </td>
                </tr>
                <tr>
                    <td class="pt-5 align-top">
                        <div class="pt-2">
                            配送地址
                        </div>
                    </td>
                    <td class="pt-5">
                        <div class="select w-[174px]">
                            <select v-model="memberData.address.delivery.country" required>
                                <option value="台灣及離島">
                                    台灣及離島
                                </option>
                            </select>
                        </div>
                        <br>
                        <CitySelect :required="true" @changeCity="value => changeCity('delivery', value)" />
                        <input
                            v-model="memberData.address.delivery.other"
                            type="text"
                            class="text-input mt-2"
                            placeholder="請輸入地址"
                            required
                        >
                        <input type="submit" value="送出" class="form-btn block">
                    </td>
                </tr>
            </tbody>
        </table>
    </form>
</template>

<script>
import { reactive, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import CitySelect from '@/components/CitySelect.vue';

let profileCreated = false;

export default {
    name: 'CreateProfile',
    components: {
        CitySelect
    },
    beforeRouteLeave (to, from, next) {
        if (profileCreated) {
            next();
        }
        else if (confirm('確定要離開嗎？資料將無法保留。')) {
            next();
        }
    },
    setup () {
        const store = useStore();
        const router = useRouter();

        const memberData = reactive({
            name: '',
            gender: 'male',
            cellPhone: '',
            edm: false,
            address: {
                contact: {
                    country: '台灣及離島',
                    city: '',
                    area: '',
                    other: ''
                },
                delivery: {
                    country: '台灣及離島',
                    city: '',
                    area: '',
                    other: ''
                }
            }
        });

        const changeCity = (type, { city, area }) => {
            memberData.address[type].city = city;
            memberData.address[type].area = area;
        };

        const submitHandler = async () => {
            const result = await store.dispatch('member/createProfile', memberData);
            if (result.status === 200) {
                await store.dispatch('setAlertMsgHandler', '註冊成功');
                profileCreated = true;
                router.replace({ name: 'Home' });
            }
            else if (result.status === 401) {
                submitHandler();
            }
        };

        // 離開頁面提示
        const beforeunloadHandler = () => {
            event.preventDefault();
            event.returnValue = '';
        };
        onMounted(() => {
            window.addEventListener('beforeunload', beforeunloadHandler);
        });
        onBeforeUnmount(() => {
            window.removeEventListener('beforeunload', beforeunloadHandler);
        });

        return {
            memberData,
            changeCity,
            submitHandler
        };
    }
};
</script>

<style lang="scss" scoped>
.checkbox:checked {
    background-image: url('@/assets/images/tick.svg');
    background-position: 50%;
    background-size: cover;
}
</style>