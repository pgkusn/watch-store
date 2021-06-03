<template>
    <div class="grid auto-rows-auto grid-cols-2 md:grid-cols-4 gap-y-7 md:gap-y-14 gap-x-[15px] md:gap-x-[30px]">
        <div v-for="product in products" :key="product.id" class="relative group">
            <a href="" class="block pt-[100%] bg-cover bg-center" :style="{ 'background-image': `url(${product.url})` }" />
            <h2 class="text-xl md:text-2xl">
                {{ product.name }}
            </h2>
            <p>{{ product.fullBrand }}</p>
            <ul class="flex">
                <li>{{ showPrice(product.price) }}</li>
                <li v-if="product.discount" class="ml-[6px] text-dark-gray line-through">
                    {{ showPrice(Math.floor(product.price * product.discount)) }}
                </li>
            </ul>
            <div v-if="$props.tool">
                <button class="material-icons align-middle text-dark-golden focus:outline-none" :class="{ 'opacity-50': !inFavorite(product.id) }" @click="updateLS('favorite', product)">
                    favorite
                </button>
                <button class="material-icons align-middle text-dark-golden ml-[10px] focus:outline-none" :class="{ 'opacity-50': !inCart(product.id) }" @click="updateLS('cart', product)">
                    shopping_cart
                </button>
            </div>
            <button v-if="$props.trash" class="material-icons absolute top-2 right-2 hidden group-hover:block focus:outline-none text-dark-golden" @click="$emit('removeProduct', product)">
                close
            </button>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'ProductList',
    props: {
        products: {
            type: Array,
            default: () => []
        },
        tool: {
            type: Boolean,
            default: true
        },
        trash: {
            type: Boolean,
            default: false
        }
    },
    emit: ['removeProduct'],
    setup () {
        const store = useStore();

        // 最愛商品
        const favorite = computed(() => store.state.product.favorite);
        const inFavorite = id => favorite.value.find(item => item.id === id);

        // 購物車
        const cart = computed(() => store.state.product.cart);
        const inCart = id => cart.value.find(item => item.id === id);

        const updateLS = async (name, value) => {
            store.dispatch('product/updateLS', { name, value });
        };

        const showPrice = num => 'NT$' + num.toLocaleString();

        return {
            showPrice,
            inFavorite,
            inCart,
            updateLS
        };
    }
};
</script>