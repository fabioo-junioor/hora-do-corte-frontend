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