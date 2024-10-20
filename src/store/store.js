import { createStore } from 'vuex';

const store = createStore({
    state: {
        alertConfig: {
            isAlert: false,
            message: '',
            type: ''
        }
    },
    mutations: {
        setAlertConfig(state, data){
            state.alertConfig.isAlert = true;
            state.alertConfig.message = data.message;
            state.alertConfig.type = data.type;

            store.commit('removeAlertConfig');
        },
        removeAlertConfig(state){
            setTimeout(() => {
                state.alertConfig.isAlert = false;

            }, 2000);
        }
    },
    getters: {
        getAlertConfig(state){
            return state.alertConfig;

        }
    }
});

export default store;