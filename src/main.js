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

import { authUser } from './services/api/api.user.js';
import { getDataUser, deleteDataUser } from './services/storage/settingSession.js';

const validAuth = await authUser(getDataUser()?.token || 'notToken');
if(validAuth.statusCode !== 200){
    //localStorage.removeItem('dataUser');
    deleteDataUser();
    store.commit('setStateUser', { login: false });
    //console.log(validAuth);

};

createApp(App)
    .use(Quasar, {
        plugins: { Notify }
    })
    .use(router)
    .use(store)
    .mount('#app');
