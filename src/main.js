import { createApp } from 'vue';
import App from './App.vue';

// Quasar
import { Quasar, Notify } from 'quasar';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

createApp(App)
    .use(Quasar, {
        plugins: { Notify }
    })
    .mount('#app');
