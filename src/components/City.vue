<template>
    <div class="select mt-2">
        <select v-model="citySelect" required @change="changeCity">
            <option value="" selected disabled>
                請選擇
            </option>
            <option v-for="city in cities" :key="city" :value="city">
                {{ city }}
            </option>
        </select>
    </div>
    <div class="select ml-[10px]">
        <select v-model="areaSelect" required @change="changeCity">
            <option value="" selected disabled>
                請選擇
            </option>
            <option v-for="area in areas" :key="area" :value="area">
                {{ area }}
            </option>
        </select>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import cityData from '@/assets/data/city.json';

export default {
    name: 'Address',
    emits: ['changeCity'],
    setup (props, { emit }) {
        const cities = cityData.map(city => city.CityName);
        const citySelect = ref('');
        const areas = computed(() => cityData.find(city => city.CityName === citySelect.value)?.AreaList.map(item => item.AreaName));
        const areaSelect = ref('');

        watch(citySelect, () => {
            areaSelect.value = '';
        });

        const changeCity = () => {
            emit('changeCity', {
                city: citySelect.value,
                area: areaSelect.value
            });
        };

        return {
            cities,
            citySelect,
            areas,
            areaSelect,
            changeCity
        };
    }
};
</script>