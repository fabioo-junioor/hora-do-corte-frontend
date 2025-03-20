import { createStore } from 'vuex';

const store = createStore({
    state: {
        alertConfig: {
            isAlert: false,
            message: '',
            type: ''
        },
        stateUser: {
            isUserLogin: false
        },
        stateBuyPlan: {
            pkPlan: null,
            pkUser: null,
            details: []
        },
        stateLoader: {
            isLoader: false
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
        },
        setStateUser(state, data){
            state.stateUser.isUserLogin = data.login;

        },
        setStateBuyPlan(state, data){
            state.stateBuyPlan.pkPlan = data.pkPlan;
            state.stateBuyPlan.pkUser = data.pkUser;
            state.stateBuyPlan.details = data.details;

        },
        setStateLoader(state, data){
            state.stateLoader.isLoader = data.isLoader;

        }
    },
    getters: {
        getAlertConfig(state){
            return state.alertConfig;

        },
        getStateUser(state){
            return state.stateUser;

        },
        getStateBuyPlan(state){
            return state.stateBuyPlan;

        },
        getStateLoader(state){
            return state.stateLoader;

        }
    }
});

export default store;