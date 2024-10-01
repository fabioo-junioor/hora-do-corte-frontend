<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { FormEditPasswordUser } from '../../components';

const dataEditPasswordUser = reactive({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
});
const saveFormPasswordUser = () => {
    console.log(dataEditPasswordUser);

};
</script>
<template>
    <div id="edit-password-user">
        <div class="edit-password-user q-mt-xl text-white">
            <h4 class="q-mb-md">Alterar senha</h4>
            <FormEditPasswordUser
                v-model:dataEditPasswordUser="dataEditPasswordUser"
                @saveFormPasswordUser='saveFormPasswordUser' />
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#edit-password-user{
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: calc(100vh - 5rem);
    font-family: "Fredoka", sans-serif;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, .05)),
      url("../../assets/background/background-wave.png") no-repeat
        fixed bottom;
    background-size: cover;

    .edit-password-user{
        width: 60%;
        display: flex;
        flex-direction: column;
        align-items: center;

    }
}
/* Breakpoints - response*/
@media only screen and (max-width: 1560px) {
}
@media only screen and (max-width: 1200px) {
}
@media only screen and (max-width: 960px) {
}
@media only screen and (max-width: 768px) {
}
@media only screen and (max-width: 480px) {
}
@media only screen and (max-width: 320px) {
}
</style>