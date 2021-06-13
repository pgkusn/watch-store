<template>
    <div class="bg-dark-golden overflow-auto">
        <div class="container flex items-center h-[52px] whitespace-nowrap">
            <span class="text-xl text-white mr-[14px] select-none hidden md:inline">
                CHANEL
            </span>
            <router-link
                v-for="item in brands"
                :key="item.brand"
                :to="{ name: 'Products', params: { brand: item.brand } }"
                :class="['text-xl leading-[52px] px-[14px] text-white md:hover:bg-golden', { 'bg-golden': $props.brand === item.brand }]"
            >
                {{ item.fullBrand }}
            </router-link>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';

export default {
    name: 'ChanelBar',
    props: {
        products: {
            type: Array,
            default: () => []
        },
        brand: {
            type: String,
            default: ''
        }
    },
    setup (props) {
        const brands = computed(() => {
            const all = props.products.reduce((previousValue, currentValue) => {
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

        return {
            brands
        };
    }
};
</script>