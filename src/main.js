import { createApp } from 'vue';
import App from './App.vue';
import route from './route';
import store from './store';
import './index.css';

createApp(App).use(route).use(store).mount('#app');
