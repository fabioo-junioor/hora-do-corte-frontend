import { createApp } from 'vue';
import App from './App.vue';

// Router
import router from './router/router.js';

// Vuex
import store from './store/store.js';

// Quasar
import { Quasar, Notify } from 'quasar';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

createApp(App)
    .use(Quasar, {
        plugins: { Notify }
    })
    .use(router)
    .use(store)
    .mount('#app');
