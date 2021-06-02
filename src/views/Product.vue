<template>
    <div class="bg-dark-golden overflow-auto">
        <div class="container flex items-center h-[52px] whitespace-nowrap">
            <span class="text-xl text-white mr-[14px] select-none hidden md:inline">
                CHANEL
            </span>
            <router-link
                v-for="(value, key) in brands"
                :key="value"
                :to="{ name: 'Product', params: { brand: key } }"
                :class="['text-xl leading-[52px] px-[14px] text-white', { 'bg-golden': props.brand === key }]"
            >
                {{ value }}
            </router-link>
        </div>
    </div>

    <div class="container py-10 md:py-[60px]">
        <div class="grid auto-rows-auto grid-cols-2 md:grid-cols-4 gap-y-7 md:gap-y-14 gap-x-[15px] md:gap-x-[30px]">
            <div v-for="product in showProducts[props.page - 1]" :key="product.id">
                <a href="" class="block pt-[100%] bg-cover bg-center" :style="{ 'background-image': `url(${product.url})` }" />
                <h2 class="text-xl md:text-2xl">
                    {{ product.name }}
                </h2>
                <p>{{ brands[product.brand] }}</p>
                <ul class="flex">
                    <li>{{ showPrice(product.price) }}</li>
                    <li v-if="product.discount" class="ml-[6px] text-dark-gray line-through">
                        {{ showPrice(Math.floor(product.price * product.discount)) }}
                    </li>
                </ul>
                <div>
                    <button class="material-icons align-middle text-dark-golden">
                        favorite
                    </button>
                    <button class="material-icons align-middle text-dark-golden ml-[10px]">
                        shopping_cart
                    </button>
                </div>
            </div>
        </div>
        <div v-if="showProducts.length > 1" class="flex justify-center mt-[46px] md:mt-[78px] text-xl leading-6">
            <router-link
                v-for="n in showProducts.length"
                :key="n"
                :to="{ name: 'Product', params: { brand: props.brand, page: n } }"
                :class="pageClass(n)"
            >
                {{ n }}
            </router-link>
        </div>
    </div>

    <Subscribe />
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import Subscribe from '@/components/Subscribe.vue';
import useShowList from '@/composition/showList.js';

export default {
    name: 'Product',
    components: {
        Subscribe
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

        const pageClass = page => {
            const currentPage = Number(props.page);
            let classes = ['block', 'w-5', 'text-center'];
            if (currentPage === page) {
                classes = [...classes, 'text-golden', 'border-golden', 'border-b-2'];
            }
            if (page > 1) {
                classes = [...classes, 'ml-5'];
            }
            return classes;
        };

        // 商品資料
        const brands = {
            jo: 'Jo Malone',
            curology: 'Curology',
            dior: 'Dior',
            chloe: 'Chloe',
            zara: 'ZARA'
        };
        const productData = ref([]);
        const singleBrandProduct = computed(() => productData.value.filter(item => item.brand === props.brand));
        const showProducts = useShowList(singleBrandProduct);

        const showPrice = num => 'NT$' + num.toLocaleString();

        onMounted(async () => {
            productData.value = await store.dispatch('product/getProduct') || [];
        });

        return {
            props,
            pageClass,
            showProducts,
            showPrice,
            brands
        };
    }
};
</script>