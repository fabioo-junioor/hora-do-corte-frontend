<script setup>
import { reactive } from 'vue';
import { useStore} from 'vuex';
import { FormUser } from '../../components';
import { loginUser } from '../../services/api/api.user.js';
import { setDataUser } from '../../services/storage/settingSession.js';

const store = useStore();
const dataFormUser = reactive({
    email: 'fabio@bol.com',
    password: 'teste1010'

});
const login = async () => {
    let dataUser = await loginUser(dataFormUser);
    if(dataUser.data?.length === 0 && dataUser.statusCode === 200){
        store.commit('setAlertConfig', {message: dataUser.message, type: 'warning'});
        //console.log(datauser);
        return;

    };
    if(dataUser.data?.length !== 0 && dataUser.statusCode === 200){
        store.commit('setAlertConfig', {message: dataUser.message, type: 'positive'});
        setDataUser(dataUser.data);
        return;

    };
    store.commit('setAlertConfig', {message: dataUser.message, type: 'negative'});
    return;

};
</script>
<template>
    <div id="login-user">
        <div class="login-user-img">
            <q-img 
                src="../../assets/logo/logo.png"
                height="70%"
                width="70%"
                fit="contain" /> 
        </div>
        <div class="login-user-forms">
            <FormUser
                class="form-user"
                typeForm="loginUser"
                v-model:email="dataFormUser.email"
                v-model:password="dataFormUser.password"
                @loginUser="login" />
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#login-user{
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Fredoka", sans-serif;

    .login-user-img{
        width: 50%;
        min-height: calc(100vh - 5rem);
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $darkColorSecondary;

    }
    .login-user-forms{
        width: 50%;
        min-height: calc(100vh - 5rem);
        display: flex;
        justify-content: center;
        align-items: center;

        .form-user{
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
    
            .q-form{
                width: 100%;
                
            }
        }
    }
}
</style>