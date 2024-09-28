<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { FormDialogAddProfessional, FormDialogAddServices, CardProfessionalList } from '../../components';
import userDefault from '../../assets/imgsDefault/user.png';

const isDialogAdd = ref(false);
const isDialogSchedules = ref(false);
const isDialogServices = ref(false);
const imageProfile = ref(null);
const dataEditProfessional = reactive({
    name: '',
    image: null,
    instagram: ''
    
});
const dataEditServices = reactive({
    name: '',
    price: null,
    time: null
    
});
const servicesByProfesional = reactive([]);
const dataProfessionais = reactive([
    { name: 'fabio', image: null, instagram: 'teste' },
    { name: 'maria', image: 'https://cdn.quasar.dev/img/mountains.jpg', instagram: '' },
    { name: 'joao', image: null, instagram: '' }

]);
const addProfessional = () => {
    dataEditProfessional.name = '';
    dataEditProfessional.image = '';
    dataEditProfessional.instagram = '';
    isDialogAdd.value = true;

};
const saveFormProfessional = () => {
    console.log(dataEditProfessional);

};
const saveFormServices = () => {
    console.log(servicesByProfesional);

};
const addService = () => {
    servicesByProfesional.push({name: dataEditServices.name, price: dataEditServices.price, time: dataEditServices.time});

};
const deleteService = (data) => {
    let indice = servicesByProfesional.findIndex(obj => obj.name === data);
    servicesByProfesional.splice(indice, 1);

}
const editFormProfessional = (data) => {
    dataEditProfessional.name = data.name;
    dataEditProfessional.image = data.image;
    dataEditProfessional.instagram = data.instagram;
    isDialogAdd.value = true;

};
const editScheduleProfessional = (schedule) => {
    console.log(schedule);

};
const editServicesProfessional = (services) => {
    isDialogServices.value = true;

};
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
watch(() => dataEditProfessional.image, () => {
    imageProfile.value = !dataEditProfessional.image ? userDefault : imageProfile.value;

});
</script>
<template>
    <div id="edit-professional">
        <div class="edit-professional q-ma-md">
            <div class="edit-professional-add text-white q-pa-xs">
                <h5 class="q-ma-none">Adicionar profissional</h5>
                <q-btn
                    @click="addProfessional"
                    outline 
                    color="brown-8"
                    text-color="white"
                    size="md" 
                    icon="person_add" 
                    label="Adicionar" />
            </div>
            <div class="edit-professional-list q-my-md">
                <CardProfessionalList
                    v-for="i in dataProfessionais" :key="i"
                    :dataProfessional='i'
                    @editFormProfessional='editFormProfessional'
                    @editScheduleProfessional='editScheduleProfessional'
                    @editServicesProfessional='editServicesProfessional' />
            </div>
            <FormDialogAddProfessional
                v-model:isDialogAdd='isDialogAdd'
                v-model:dataEditProfessional='dataEditProfessional'
                :imageProfile='imageProfile || userDefault'
                @saveFormProfessional='saveFormProfessional'
                @previewImage='previewImage' />
            <FormDialogAddServices
                v-model:isDialogServices='isDialogServices'
                v-model:dataEditServices='dataEditServices'
                :servicesByProfesional='servicesByProfesional'
                @addService='addService'
                @deleteService='deleteService'
                @saveFormServices='saveFormServices' />
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");
#edit-professional{
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: calc(100vh - 4rem);
    font-family: "Fredoka", sans-serif;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, .05)),
      url("../../assets/background/background-wave.png") no-repeat
        fixed bottom;
    background-size: cover;

    .edit-professional{
        width: 70%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .edit-professional-add{
            width: 100%;
            display: flex;
            justify-content: space-between;
            border-bottom: 2px solid $darkColorSecondary;

        }
        .edit-professional-list{
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            gap: 1rem;
            flex-wrap: wrap;

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