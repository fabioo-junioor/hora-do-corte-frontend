<script setup>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { FormUser } from '../../components';
import { createUser } from '../../services/api/api.user.js';

const store = useStore();
const dataFormUser = reactive({
    email: 'fabio@bol.com',
    password: '11111111',
    confirmPassword: '11111111'

});
const create = async () => {
    let dataUser = await createUser(dataFormUser);
    if(dataUser.statusCode === 200){
        store.commit('setAlertConfig', {message: dataUser.message, type: 'warning'});
        return;

    };
    if(dataUser.statusCode === 201){
        store.commit('setAlertConfig', {message: dataUser.message, type: 'positive'});
        return;

    };
    store.commit('setAlertConfig', {message: dataUser.message, type: 'negative'});
    return;

};
</script>
<template>
    <div id="cad-user">
        <div class="cad-user-img">
            <q-img 
                src="../../assets/logo/logo.png"
                height="70%"
                width="70%" />
        </div>
        <div class="cad-user-forms q-px-sm">
            <FormUser
                class="form-user"
                typeForm="cadUser"
                v-model:email="dataFormUser.email"
                v-model:password="dataFormUser.password"
                v-model:confirmPassword="dataFormUser.confirmPassword"
                @createUser="create" />
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#cad-user{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 5rem);
    font-family: "Fredoka", sans-serif;

    .cad-user-img{
        width: 50%;
        min-height: calc(100vh - 5rem);
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $darkColorSecondary;

    }
    .cad-user-forms{
        width: 50%;
        min-height: calc(100vh - 5rem);
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;

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