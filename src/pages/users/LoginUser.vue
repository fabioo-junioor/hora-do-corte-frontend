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
        <div class="login-user">
            <div class="login-user-img">
                <q-img 
                    src="../../assets/draw/undraw_hello.svg"
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
    </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#login-user{
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 5rem);
    font-family: "Fredoka", sans-serif;

    .login-user{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $darkColorSecondary;
        box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, .3);
        border: 1px solid $brown-10;
        border-radius: 5px;
        width: 60%;
        height: 80%;

        .login-user-img{
            width: 50%;
            height: 100%;
            border-radius: 5px;
            background-color: $darkColorSecondary;

            .q-img{
                height: 100%;
                width: 100%;
                
            }
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
}
</style>