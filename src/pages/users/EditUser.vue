<script setup>
import { reactive } from 'vue';
import { FormEditUser } from '../../components';
import userDefault from '../../assets/imgsDefault/user.png';

const dataEditUser = reactive({
    name: '',
    slug: '',
    phone: '',
    image: null,
    instagram: ''
});

</script>
<template>
    <div id="edit-user">
        <div class="edit-user q-pa-md text-white">
            <h4>Editar informações</h4>
            <div class="edit-user-image q-mb-md">
                <q-avatar>
                    <img :src="dataEditUser.image || userDefault">
                </q-avatar>
            </div>
            <FormEditUser
                v-model:dataEditUser="dataEditUser" />
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");
#edit-user{
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: calc(100vh - 4rem);
    font-family: "Fredoka", sans-serif;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, .05)),
      url("../../assets/background/background-wave.png") no-repeat
        fixed bottom;
    background-size: cover;

    .edit-user{
        width: 70%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .edit-user-image{
            .q-avatar{
                width: 15rem;
                height: 15rem;
                object-fit: contain;
            }
        }
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