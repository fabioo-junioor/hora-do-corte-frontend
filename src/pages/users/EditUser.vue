<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { FormEditUser, CardNotice } from '../../components';
import userDefault from '../../assets/imgsDefault/user.png';

const isNotice = ref(false);
const imageProfile = ref(null);
const dataEditUser = reactive({
    image: null,
    name: '',
    slug: '',
    whatsapp: '',
    instagram: '',
    state: '',
    city: '',
    street: '',
    number: ''
});
const noticeList = reactive([
    'Campos com (*) são obrigatórios!'
]);
const previewImage = (event) => {
    var input = event.target;
    if(input.files && input.files[0]){
        var render = new FileReader();
        render.onload = (e) => {
            imageProfile.value = e.target.result;
            
        }
        render.readAsDataURL(input.files[0]);

    }    
};
watch(() => dataEditUser.image, () => {
    imageProfile.value = !dataEditUser.image ? userDefault : imageProfile.value;

});
onMounted(() => {
    isNotice.value = noticeList.length != 0 || false;
    
});
</script>
<template>
    <div id="edit-user">
        <CardNotice
            class="bg-blue full-width q-pa-sm"
            v-if="isNotice"
            v-model:isNotice="isNotice"
            :noticeList='noticeList' />
        <div class="edit-user q-mt-xl text-white">
            <h4 class="q-ma-none">Informações do estabelecimento</h4>
            <div class="edit-user-image q-my-md">
                <q-avatar>
                    <img :src="imageProfile || userDefault">
                </q-avatar>
            </div>
            <FormEditUser
                v-model:dataEditUser="dataEditUser"
                @previewImage='previewImage' />
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");
#edit-user{
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: calc(100vh - 5rem);
    font-family: "Fredoka", sans-serif;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, .05)),
      url("../../assets/background/background-wave.png") no-repeat
        fixed bottom;
    background-size: cover;

    .edit-user{
        width: 60%;
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