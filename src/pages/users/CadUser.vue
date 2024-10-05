<script setup>
import { reactive } from 'vue';
import { FormUser } from '../../components';

const dataFormUser = reactive({
    email: '',
    password: '',
    repeatPassword: ''

});
const createUser = () => {
    console.log('cadastrar ', dataFormUser);

}
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
                v-model:repeatPassword="dataFormUser.repeatPassword"
                @createUser="createUser" />
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