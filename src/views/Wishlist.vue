<template>
    <div>
        <div class="container py-10 md:py-15">
            <ProductList
                :products="showProducts"
                :tool="false"
                :trash="true"
                @removeProduct="removeProduct"
            />
            <Pagination :pages="products.length" :page="page" :route="{ name: 'Wishlist', params: {} }" />
        </div>
        <div v-if="!products.length" class="text-2xl text-raisin-black absolute inset-0 m-auto flex justify-center items-center">
            無收藏的商品
        </div>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ProductList from '@/components/ProductList.vue';
import Pagination from '@/components/Pagination.vue';
import useShowList from '@/composition/showList.js';

export default {
    name: 'Wishlist',
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

        const allProducts = computed(() => store.state.product.favorite);
        const products = useShowList(allProducts);
        const showProducts = computed(() => products.value[props.page - 1]);

        const removeProduct = product => {
            store.dispatch('product/updateLS', { name: 'favorite', value: product });
            if (!showProducts.value) {
                router.replace({ name: 'Wishlist' });
            }
        };

        onMounted(async () => {
            store.dispatch('product/readLS', 'favorite');
        });

        return {
            products,
            removeProduct,
            showProducts
        };
    }
};
</script>