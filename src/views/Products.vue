<template>
    <div>
        <ProductNav :products="productData" :brand="brand" />

        <div class="container py-10 md:py-15">
            <ProductList :products="showProducts" />
            <Pagination :pages="products.length" :page="page" :route="{ name: 'Products', params: { brand: brand } }" />
        </div>

        <Subscribe />
    </div>
</template>

<script>
import { computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Subscribe from '@/components/Subscribe.vue';
import ProductList from '@/components/ProductList.vue';
import Pagination from '@/components/Pagination.vue';
import ProductNav from '@/components/ProductNav.vue';
import useShowList from '@/composition/showList.js';

export default {
    name: 'Products',
    components: {
        Subscribe,
        ProductList,
        Pagination,
        ProductNav
    },
    props: {
        brand: {
            type: String,
            default: ''
        },
        page: {
            type: String,
            default: ''
        }
    },
    setup (props) {
        const store = useStore();
        const router = useRouter();

        const productData = computed(() => store.state.product.products);
        const singleBrandProduct = computed(() => productData.value.filter(item => item.brand === props.brand));
        const products = useShowList(singleBrandProduct);
        const showProducts = computed(() => products.value[props.page - 1]);

        watch(showProducts, value => {
            if (!value) {
                router.replace({ name: 'Error', query: { status: 404 } });
            }
        });

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