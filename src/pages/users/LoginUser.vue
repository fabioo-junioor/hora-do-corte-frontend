<script setup>
import { reactive } from 'vue';
import { useStore} from 'vuex';
import { FormUser } from '../../components';
import { login } from '../../services/api/api.user.js';

const store = useStore();
const dataFormUser = reactive({
    email: 'fabio@bol.com',
    password: 'teste1010'

});
const loginUser = async () => {
    let datauser = await login(dataFormUser);
    if(datauser.data.length === 0){
        store.commit('setAlertConfig', {message: datauser.message, type: 'negative'});
        //console.log(datauser);
        return;

    };
    store.commit('setAlertConfig', {message: datauser.message, type: 'positive'});
    //console.log(datauser);
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
                @loginUser="loginUser" />
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