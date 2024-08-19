<script setup>
import { reactive } from 'vue';

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
        <div class="cad-user">
            <div class="cad-user-img">
                <q-img 
                    src="../../assets/draw/undraw_hello.svg"
                    fit="contain" />
            </div>
            <div class="cad-user-forms">
                
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#cad-user{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 3.1rem);
    font-family: "Fredoka", sans-serif;

    .cad-user{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: green;
        box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, .5);
        border-radius: 5px;
        width: 60%;
        height: 80%;

        .cad-user-img{
            width: 50%;
            height: 100%;
            border-radius: 5px;
            background-color: yellow;

            .q-img{
                height: 100%;
                width: 100%;
                
            }
        }
        .cad-user-forms{
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