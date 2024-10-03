<script setup>
import { reactive } from 'vue';
import { FormUser } from '../../components';

const dataFormUser = reactive({
    email: '',
    password: ''

});
const loginUser = () => {
    console.log('login ', dataFormUser);

}
</script>
<template>
    <div id="login-user">
        <div class="login-user-img">
            <q-img 
                src="../../assets/logo/logo.png"
                height="80%"
                width="80%"
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
    min-height: calc(100vh - 5rem);
    font-family: "Fredoka", sans-serif;

    .login-user-img{
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $darkColorSecondary;

    }
    .login-user-forms{
        display: flex;
        justify-content: center;
        width: 50%;
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