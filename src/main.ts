import { createApp } from 'vue';
import App from './App.vue';
// 样式初始化
import 'normalize.css';
// 全局样式
import '@/assets/css/global.scss';

import ElementPlus from 'element-plus';
import router from './router';
import store from './store';

const app = createApp(App);
app.use(ElementPlus);
app.use(store);
app.use(router);
app.mount('#app');
