<template>
    <div>
        <div class="hero bg-cover" style="background-image: url(https://hexschool.github.io/webLayoutTraining1st/perfume-week6/index1.jpg)">
            <div class="container h-[480px] md:h-[870px] flex items-center">
                <div class="text-white max-w-[350px] md:max-w-[445px] mx-auto md:mr-0 md:ml-auto" data-aos="fade-left">
                    <h2 class="text-[32px] md:text-[40px]">
                        Perfume your day
                    </h2>
                    <p class="text-xl md:text-2xl">
                        A perfume is like a piece of clothing, a message, a way of presenting oneself a costume that according to the person who wears it.
                    </p>
                    <router-link :to="{ name: 'Products' }" class="home-btn text-[28px] border-white mt-4">
                        Shop now
                    </router-link>
                </div>
            </div>
        </div>

        <div class="container products my-10 md:my-15">
            <section class="flex flex-col items-center md:flex-row" data-aos="fade-right">
                <div class="w-[382px] md:w-0 md:flex-grow md:order-1" />
                <div class="md:w-0 md:flex-grow flex justify-center items-center">
                    <div class="max-w-[382px] p-4">
                        <h1 class="text-[32px]">
                            Gabrielle CHANEL
                        </h1>
                        <p class="text-xl mt-2">
                            全新嗅覺體驗，花香四溢、明亮馥郁。結合茉莉、依蘭依蘭、橙花和最迷人的格拉斯晚香玉之花香，呈現出夢幻花香氣息。 極具女性特質的香奈兒嘉柏麗香水，專為光芒四射的她而生。
                        </p>
                        <router-link :to="{ name: 'Product', params: { id: 1 } }" class="inline-block text-golden font-bold mt-2 md:mt-4">
                            查看更多
                        </router-link>
                    </div>
                </div>
            </section>
            <section class="flex flex-col items-center md:flex-row" data-aos="fade-left">
                <div class="w-[382px] md:w-0 md:flex-grow" />
                <div class="md:w-0 md:flex-grow flex justify-center items-center">
                    <div class="max-w-[382px] p-4">
                        <h1 class="text-[32px]">
                            Five O’clock Au Gingembre
                        </h1>
                        <p class="text-xl mt-2">
                            生薑與溫醇的肉桂香、紅糖的香甜摻和成一氣，溫暖微辛的氣息反倒形成一股輕煙氤氳開來，還帶點微微煙醺感漫溢在整個鼻息之間，細聞之下,又還有溫溫淡淡的木香，溫和而暖心。
                        </p>
                        <router-link :to="{ name: 'Product', params: { id: 2 } }" class="inline-block text-golden font-bold mt-2 md:mt-4">
                            查看更多
                        </router-link>
                    </div>
                </div>
            </section>
            <section class="flex flex-col items-center md:flex-row" data-aos="fade-right">
                <div class="w-[382px] md:w-0 md:flex-grow md:order-1" />
                <div class="md:w-0 md:flex-grow flex justify-center items-center">
                    <div class="max-w-[382px] p-4">
                        <h1 class="text-[32px]">
                            CHANEL N°5
                        </h1>
                        <p class="text-xl mt-2">
                            N°5，女性魅力的極致精髓。散發柔美澄透的乙醛花束香氣。經典傳奇香氛，蘊藏於極簡設計的獨特瓶身。
                        </p>
                        <router-link :to="{ name: 'Product', params: { id: 3 } }" class="inline-block text-golden font-bold mt-2 md:mt-4">
                            查看更多
                        </router-link>
                    </div>
                </div>
            </section>
            <section class="flex flex-col items-center md:flex-row" data-aos="fade-left">
                <div class="w-[382px] md:w-0 md:flex-grow" />
                <div class="md:w-0 md:flex-grow flex justify-center items-center">
                    <div class="max-w-[382px] p-4">
                        <h2 class="text-2xl">
                            1. Levels of Preventive Maintenance Compliance
                        </h2>
                        <p class="mt-2">
                            The core idea of preventative maintenance is the performance of proactive actions against unscheduled downtime in order to identify potential defects before they evolve into something more severe.
                        </p>
                        <h2 class="text-2xl mt-5 lg:mt-[52px]">
                            2. Percentage of Planned Maintenance
                        </h2>
                        <p class="mt-2">
                            The planned maintenance percentage is the total planned maintenance time in your CMMS software over a date range over the total number of hours of a service performed by the technicians.
                        </p>
                        <h2 class="text-2xl mt-5 lg:mt-[52px]">
                            3. Critical percentage of planned maintenance
                        </h2>
                        <p class="mt-2">
                            Calculating the critical percentage of planned maintenance will help you prioritize the most important operations that should be performed immediately.
                        </p>
                        <a href="javascript:;" class="home-btn text-xl mt-5 lg:mt-15">Plan a free online training</a>
                    </div>
                </div>
            </section>
        </div>

        <div class="bg-gray py-8 md:py-10">
            <div class="container flex flex-col md:flex-row items-center md:items-start">
                <div class="relative md:flex-grow w-[345px] md:w-0" data-aos="fade-up">
                    <router-link :to="{ name: 'Product', params: { id: 4 } }" class="block">
                        <div class="pt-[101%] md:pt-[150%] bg-center bg-cover" style="background-image: url(https://hexschool.github.io/webLayoutTraining1st/perfume-week6/index6.jpg)" />
                    </router-link>
                    <div>
                        <p class="text-2xl leading-9">
                            Poppy & Barley
                        </p>
                        <p>Jo Malone</p>
                        <ul class="flex">
                            <li>NT$1,380</li>
                            <li class="ml-[6px] text-dark-gray line-through">
                                NT$1,580
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="relative md:flex-grow w-[345px] md:w-0 mt-8 md:mt-0 md:ml-[30px]" data-aos="fade-up" :data-aos-delay="screens.md ? 50 : 0">
                    <router-link :to="{ name: 'Product', params: { id: 5 } }" class="block">
                        <div class="pt-[101%] md:pt-[150%] bg-center bg-cover" style="background-image: url(https://hexschool.github.io/webLayoutTraining1st/perfume-week6/index7.jpg)" />
                    </router-link>
                    <div>
                        <p class="text-2xl leading-9">
                            Body Wash
                        </p>
                        <p>Curology</p>
                        <ul class="flex">
                            <li>NT$1,580</li>
                        </ul>
                    </div>
                </div>
                <div class="md:flex-grow w-[345px] md:w-0 mt-8 md:mt-0 md:ml-[30px]" data-aos="fade-up" :data-aos-delay="screens.md ? 100 : 0">
                    <div class="relative">
                        <div class="pt-[101%] md:pt-[150%] bg-center bg-cover" style="background-image: url(https://hexschool.github.io/webLayoutTraining1st/perfume-week6/index8.jpg)" />
                        <div class="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 text-white text-2xl">
                            Sold out
                        </div>
                    </div>
                    <div>
                        <p class="text-2xl leading-9">
                            Apple Cider Vinegar Capsule
                        </p>
                        <p>Tonik</p>
                        <ul class="flex">
                            <li>NT$1,580</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <section class="container py-10 md:py-15 flex flex-col md:flex-row items-center" data-aos="zoom-in">
            <div class="w-[345px] md:w-0 md:flex-grow-[5] lg:flex-grow-[7]">
                <div class="pt-[150%] md:pt-[70%] bg-center bg-cover" style="background-image: url(https://hexschool.github.io/webLayoutTraining1st/perfume-week6/index9.jpg)" />
            </div>
            <div class="w-[345px] md:w-0 md:flex-grow-[5] lg:flex-grow-[3] md:pl-[30px]">
                <h1 class="text-[32px]">
                    Bottle-Recycling
                </h1>
                <p class="text-xl">
                    Recycle your used empty bottles and be rewarded!
                </p>
                <p class="mt-2">
                    For the past 10 years, we have collected over 800,000 bottles through Empty Bottle Recycling Campaign and planted more than 860 pine trees for a better environment.For the past 10 years, we have collected over 800,000 bottles through Empty Bottle Recycling Campaign and planted more than 860 pine trees for a better environment.
                </p>
                <router-link :to="{ name: 'Product', params: { id: 7 } }" class="inline-block text-golden font-bold mt-2">
                    查看更多
                </router-link>
            </div>
        </section>

        <Subscribe />
    </div>
</template>

<script>
import { onMounted } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Subscribe from '@/components/Subscribe.vue';
import { screens, useMediaSensor } from '@/composition/mediaSensor.js';

export default {
    name: 'Home',
    components: {
        Subscribe
    },
    setup () {
        useMediaSensor();

        onMounted(() => {
            AOS.init();
        });

        return {
            screens
        };
    }
};
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/assets/sass/common';
.hero {
    background-position: 10% 50%;
    @media (min-width: #{$screen-md}px) {
        background-position: 50%;
    }
    @media (min-width: #{$screen-2xl}px) {
        background-position: 80% 50%;
        background-size: 110% auto;
    }
}
.products > section {
    + section {
        margin-top: 32px;
        @media (min-width: #{$screen-md}px) {
            margin-top: 0;
        }
    }
    @each $name, $value in map-get($config, home-products) {
        &:nth-child(#{$name}) > div:first-child:before {
            display: block;
            padding-top: percentage(math.div(map-get($value, height), map-get($value, width)));
            background-image: url(map-get($value, url));
            background-position: map-get($value, pos-x) map-get($value, pos-y);
            background-size: cover;
            content: '';
            @media (min-width: #{$screen-md}px) {
                padding-top: percentage(math.div(map-get($value, md-height), map-get($value, md-width)));
            }
        }
    }
}
</style>