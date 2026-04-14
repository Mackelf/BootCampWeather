// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// CSS de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// JS de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/scss/main.scss';

// IMPORTANTE: una sola app, usando router Y store
const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');