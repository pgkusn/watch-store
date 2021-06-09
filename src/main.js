import { createApp } from 'vue';
import App from './App.vue';
import route from './route';
import store from './store';
import './index.scss';

const app = createApp(App);

app.directive('focus', {
    mounted (el) {
        el.focus();
    }
});

app.use(route).use(store).mount('#app');
