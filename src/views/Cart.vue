<template>
    <div>
        <div class="container py-10 md:py-15">
            <ProductList
                :products="showProducts"
                :tool="false"
                :trash="true"
                :amount="true"
                @removeProduct="removeProduct"
            />
            <Pagination :pages="products.length" :page="$props.page" :route="{ name: 'Cart', params: {} }" />
            <button v-if="products.length" class="block mt-10 md:mt-15 mx-auto w-[160px] h-[38px] rounded bg-dark-golden text-white focus:outline-none" @click="postOrder">
                送出訂單
            </button>
        </div>
        <div v-if="!products.length" class="text-2xl text-dark-golden absolute inset-0 m-auto flex justify-center items-center">
            {{ orderSuccess ? '訂單已送出' : '購物車內無商品' }}
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ProductList from '@/components/ProductList.vue';
import Pagination from '@/components/Pagination.vue';
import useShowList from '@/composition/showList.js';

export default {
    name: 'Cart',
    components: {
        ProductList,
        Pagination
    },
    props: {
        page: {
            type: String,
            default: '1'
        }
    },
    setup (props) {
        const store = useStore();
        const router = useRouter();

        const allProducts = computed(() => store.state.product.cart);
        const products = useShowList(allProducts);
        const showProducts = computed(() => products.value[props.page - 1]);
        const removeProduct = product => {
            store.dispatch('product/updateLS', { name: 'cart', value: product });
            if (!showProducts.value) {
                router.replace({ name: 'Cart' });
            }
        };

        const loginInfo = computed(() => store.state.member.loginInfo);
        const orderSuccess = ref(false);
        const postOrder = async () => {
            if (!loginInfo.value) {
                sessionStorage.setItem('beforeLogin', 'Cart');
                router.push({ name: 'Login' });
                return;
            }
            const order = allProducts.value.reduce((previousValue, currentValue) => {
                previousValue.content.push({ name: currentValue.fullBrand, amount: currentValue.amount });
                previousValue.total += currentValue.price;
                previousValue.createTime = new Date().getTime();
                return previousValue;
            }, { content: [], total: 0 });

            const result = await store.dispatch('member/createOrder', order);
            if (result.status === 200) {
                await store.dispatch('setAlertMsgHandler', '訂購成功');
                store.dispatch('product/removeLS', 'cart');
                orderSuccess.value = true;
            }
            else if (result.status === 401) {
                postOrder();
            }
            else {
                await store.dispatch('setAlertMsgHandler', '訂購失敗，請稍後再試！');
            }
        };

        onMounted(() => {
            if (loginInfo.value && sessionStorage.getItem('beforeLogin')) {
                order();
            }
        });

        return {
            products,
            removeProduct,
            showProducts,
            postOrder,
            orderSuccess
        };
    }
};
</script>