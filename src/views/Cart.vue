<template>
    <div class="container py-10 md:py-[60px]">
        <ProductList
            :products="showProducts"
            :tool="false"
            :trash="true"
            @removeProduct="removeProduct"
        />
        <Pagination :pages="products.length" :page="$props.page" :route="{ name: 'Cart', params: {} }" />
    </div>
</template>

<script>
import { computed } from 'vue';
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

        return {
            products,
            removeProduct,
            showProducts
        };
    }
};
</script>