import { createApp } from 'vue';
import App from './App.vue';
import route from './route';
import store from './store';
import './index.scss';
import device from 'current-device';

const app = createApp(App);

app.directive('focus', {
    mounted (el) {
        if (device.desktop()) {
            el.focus();
        }
    }
});

app.use(route).use(store).mount('#app');
