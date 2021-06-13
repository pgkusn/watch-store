<template>
    <div>
        <ChanelBar :products="productData" :brand="$props.brand" />

        <div class="container py-10 md:py-[60px]">
            <ProductList :products="showProducts" />
            <Pagination :pages="products.length" :page="$props.page" :route="{ name: 'Products', params: { brand: $props.brand } }" />
        </div>

        <Subscribe />
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Subscribe from '@/components/Subscribe.vue';
import ProductList from '@/components/ProductList.vue';
import Pagination from '@/components/Pagination.vue';
import ChanelBar from '@/components/ChanelBar.vue';
import useShowList from '@/composition/showList.js';

export default {
    name: 'Products',
    components: {
        Subscribe,
        ProductList,
        Pagination,
        ChanelBar
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

        const productData = computed(() => store.state.product.products);
        const singleBrandProduct = computed(() => productData.value.filter(item => item.brand === props.brand));
        const products = useShowList(singleBrandProduct);
        const showProducts = computed(() => products.value[props.page - 1]);

        onMounted(async () => {
            if (!productData.value.length) {
                await store.dispatch('product/getProducts');
            }
        });

        return {
            products,
            showProducts,
            productData
        };
    }
};
</script>