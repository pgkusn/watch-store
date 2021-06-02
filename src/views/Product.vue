<template>
    <div class="bg-dark-golden hidden md:block">
        <div class="container">
            <button class="text-xl text-white h-[52px]">
                CHANEL
            </button>
            <button class="text-xl text-white h-[52px] ml-7">
                Jo Malone
            </button>
            <button class="text-xl text-white h-[52px] ml-7">
                Curology
            </button>
        </div>
    </div>

    <div class="container py-10 md:py-[60px]">
        <div class="grid auto-rows-auto grid-cols-2 md:grid-cols-4 gap-y-7 md:gap-y-14 gap-x-[15px] md:gap-x-[30px]">
            <div v-for="n in 12" :key="n">
                <a href="" class="block pt-[100%] bg-cover bg-center" style="background-image: url(https://hexschool.github.io/webLayoutTraining1st/perfume-week6/product1.jpg)" />
                <h2 class="text-xl md:text-2xl">
                    Poppy & Barley
                </h2>
                <p>Jo Malone</p>
                <ul class="flex">
                    <li>NT$1,380</li>
                    <li class="ml-[6px] text-dark-gray line-through">
                        NT$1,580
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
        <div class="flex justify-center mt-[46px] md:mt-[78px] text-xl leading-6">
            <router-link
                v-for="n in 3"
                :key="n"
                :to="{ name: 'Product', params: { page: n } }"
                :class="pageClass(n)"
            >
                {{ n }}
            </router-link>
        </div>
    </div>

    <Subscribe />
</template>

<script>
import Subscribe from '@/components/Subscribe.vue';

export default {
    name: 'Product',
    components: {
        Subscribe
    },
    props: {
        page: {
            type: String,
            default: '1'
        }
    },
    setup (props) {
        const pageClass = page => {
            page = String(page);
            let classes = ['block', 'w-5', 'text-center'];
            if (props.page === page) {
                classes = classes.concat(['text-golden', 'border-golden', 'border-b-2']);
            }
            if (page > 1) {
                classes.push('ml-5');
            }
            return classes;
        };
        return {
            pageClass
        };
    }
};
</script>