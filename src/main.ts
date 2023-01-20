import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueCameraLib from 'vue-camera-lib';

import App from './App.vue';

import './index.css';

const app = createApp(App);

app.use(VueCameraLib);
app.use(createPinia());

app.mount('#app');
