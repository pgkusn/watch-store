<template>
    <div class="select mt-2">
        <select v-model="citySelectComputed" :required="required" @change="changeCity">
            <option value="" selected disabled>
                請選擇
            </option>
            <option v-for="city in cities" :key="city" :value="city">
                {{ city }}
            </option>
        </select>
    </div>
    <div class="select ml-[10px]">
        <select v-model="areaSelect" :required="required" @change="changeCity">
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
import { ref, computed } from 'vue';
import cityData from '@/assets/data/city.json';

export default {
    name: 'CitySelect',
    props: {
        required: {
            type: Boolean,
            default: false
        }
    },
    emits: ['changeCity'],
    setup (props, { emit }) {
        const cities = cityData.map(city => city.CityName);
        const citySelect = ref('');
        const citySelectComputed = computed({
            get () {
                return citySelect.value;
            },
            set (value) {
                citySelect.value = value;
                areaSelect.value = '';
            }
        });
        const areas = computed(() => cityData.find(city => city.CityName === citySelect.value)?.AreaList.map(item => item.AreaName));
        const areaSelect = ref('');

        const changeCity = () => {
            emit('changeCity', {
                city: citySelect.value,
                area: areaSelect.value
            });
        };

        return {
            cities,
            citySelect,
            citySelectComputed,
            areas,
            areaSelect,
            changeCity
        };
    }
};
</script>