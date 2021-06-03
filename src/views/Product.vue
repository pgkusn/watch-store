<template>
    <div class="bg-dark-golden overflow-auto">
        <div class="container flex items-center h-[52px] whitespace-nowrap">
            <span class="text-xl text-white mr-[14px] select-none hidden md:inline">
                CHANEL
            </span>
            <router-link
                v-for="item in brands"
                :key="item.brand"
                :to="{ name: 'Product', params: { brand: item.brand } }"
                :class="['text-xl leading-[52px] px-[14px] text-white', { 'bg-golden': $props.brand === item.brand }]"
            >
                {{ item.fullBrand }}
            </router-link>
        </div>
    </div>

    <div class="container py-10 md:py-[60px]">
        <ProductList :products="showProducts" />
        <Pagination :pages="products.length" :page="$props.page" :route="{ name: 'Product', params: { brand: $props.brand } }" />
    </div>

    <Subscribe />
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import Subscribe from '@/components/Subscribe.vue';
import ProductList from '@/components/ProductList.vue';
import Pagination from '@/components/Pagination.vue';
import useShowList from '@/composition/showList.js';

export default {
    name: 'Product',
    components: {
        Subscribe,
        ProductList,
        Pagination
    },
    props: {
        brand: {
            type: String,
            default: 'jo'
        },
        page: {
            type: String,
            default: '1'
        }
    },
    setup (props) {
        const store = useStore();

        const productData = ref([]);
        const brands = computed(() => {
            const all = productData.value.reduce((previousValue, currentValue) => {
                previousValue.push({
                    brand: currentValue.brand,
                    fullBrand: currentValue.fullBrand
                });
                return previousValue;
            }, []);

            // 去除重複物件
            const strAry = all.map(item => JSON.stringify(item));
            const single = Array.from(new Set(strAry));
            const final = single.map(item => JSON.parse(item));

            return final;
        });
        const singleBrandProduct = computed(() => productData.value.filter(item => item.brand === props.brand));
        const products = useShowList(singleBrandProduct);
        const showProducts = computed(() => products.value[props.page - 1]);

        onMounted(async () => {
            store.dispatch('product/readLS', 'favorite');
            productData.value = await store.dispatch('product/getProduct') || [];
        });

        return {
            brands,
            products,
            showProducts
        };
    }
};
</script>