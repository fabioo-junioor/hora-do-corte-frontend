<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { FormDialogAddProfessional, FormDialogAddServices, 
        FormDialogAddSchedules, CardProfessionalList, Loader } from '../../components';
import { isAnyShiftOpen } from '../../utils/inputValidators.js';
import { scheduleFormatter } from '../../utils/dataUtils.js';
import userDefault from '../../assets/imgsDefault/user.png';
import { getAll, create, update, deleteProf } from '../../services/api/api.professional.js';
import { getService, createService, updateService } from '../../services/api/api.services.js';
import { getSchedules, createSchedules, updateSchedules } from '../../services/api/api.schedule.js';
import { getDataUser } from '../../services/storage/settingSession.js';

const store = useStore();
const isDialogAdd = ref(false);
const isDialogSchedules = ref(false);
const isDialogServices = ref(false);
const isLoaderEditProfessional = ref(false);

const pkProfessional = ref(null);
const pkProfessionalServices = ref(null);
const pkProfessionalSchedule = ref(null);
const imageProfile = ref(null);
const dataEditProfessional = reactive({
    pkProfessional: '',
    name: '',
    image: null,
    instagram: '',
    isUnavailable: false
    
});
const dataEditServices = reactive({
    name: '',
    price: null,
    time: null
    
});
const dataEditSchedules = reactive([]);
const newServices = reactive([]);
const dataProfessionals = reactive([]);
const dataServices = reactive([]);
const addProfessional = () => {
    cleanFormProfessional();
    isDialogAdd.value = true;

};
const saveFormProfessional = async (pkProfessional) => {
    if(pkProfessional == ''){
        let dataProfessional = await create(dataEditProfessional, 4);
        if(dataProfessional.statusCode !== 201){
            store.commit('setAlertConfig', {message: dataProfessional.message, type: 'negative'});
            return;

        }
        store.commit('setAlertConfig', {message: dataProfessional.message, type: 'positive'});
        reloadPage();
        return;

    };
    let dataProfessional = await update(dataEditProfessional, pkProfessional);
    if(dataProfessional.statusCode !== 201){
        store.commit('setAlertConfig', {message: dataProfessional.message, type: 'negative'});
        return;

    }
    store.commit('setAlertConfig', {message: dataProfessional.message, type: 'positive'});
    reloadPage();
    return;

};
const saveFormServices = async () => {
    if(pkProfessionalServices.value){
        let dataService = await updateService(newServices, dataServices[0].pkProfessionalServices);
        if(dataService.statusCode !== 201){
            store.commit('setAlertConfig', {message: dataService.message, type: 'negative'});
            return;
            
        };
        store.commit('setAlertConfig', {message: dataService.message, type: 'positive'});
        reloadPage();
        return;

    };
    let dataService = await createService(newServices, pkProfessional.value);
    if(dataService.statusCode === 201){
        store.commit('setAlertConfig', {message: dataService.message, type: 'positive'});
        reloadPage();
        return;

    };
    store.commit('setAlertConfig', {message: dataService.message, type: 'negative'});
    return;

};
const saveFormSchedules = async () => {
    if(!isAnyShiftOpen(dataEditSchedules)){
        store.commit('setAlertConfig', {message: 'Preencher pelo menos um turno!', type: 'warning'});
        return;

    };
    if(pkProfessionalSchedule.value){
        let dataSchedule = await updateSchedules(dataEditSchedules, pkProfessionalSchedule.value);
        if(dataSchedule.statusCode !== 201){
            store.commit('setAlertConfig', {message: dataSchedule.message, type: 'negative'});
            return;

        };
        store.commit('setAlertConfig', {message: dataSchedule.message, type: 'positive'});
        reloadPage();
        return;

    };
    let dataSchedule = await createSchedules(dataEditSchedules, pkProfessional.value);
    if(dataSchedule.statusCode !== 201){
        store.commit('setAlertConfig', {message: dataSchedule.message, type: 'negative'});
        return;

    };
    store.commit('setAlertConfig', {message: dataSchedule.message, type: 'positive'});
    reloadPage();
    return;

};
const addService = () => {
    newServices.push({name: dataEditServices.name, price: dataEditServices.price, time: dataEditServices.time});

};
const deleteService = (data) => {
    let indice = newServices.findIndex(obj => obj.name === data);
    newServices.splice(indice, 1);

}
const editFormProfessional = (data) => {
    dataEditProfessional.pkProfessional = data.pkProfessional;
    dataEditProfessional.name = data.name;
    dataEditProfessional.image = data.image;
    dataEditProfessional.instagram = data.instagram;
    dataEditProfessional.isUnavailable = !!data.isUnavailable;
    isDialogAdd.value = true;

};
const editScheduleProfessional = async (data) => {
    let dataSchedule = await getSchedules(data.pkProfessional);
    pkProfessional.value = data.pkProfessional;
    if(dataSchedule.statusCode === 200 && dataSchedule.data?.length !== 0){
        dataEditSchedules.splice(0, dataEditSchedules.length);
        let dataSchedulesToJson = JSON.parse(dataSchedule.data[0]?.schedules);
        dataEditSchedules.push(...dataSchedulesToJson);
        pkProfessionalSchedule.value = dataSchedule.data[0]?.pkProfessionalSchedules;
        isDialogSchedules.value = true;
        return;

    };
    if(dataSchedule.statusCode === 200 && dataSchedule.data?.length === 0){
        store.commit('setAlertConfig', {message: dataSchedule.message, type: 'info'});
        dataEditSchedules.splice(0, dataEditSchedules.length);
        dataEditSchedules.push(...scheduleFormatter);
        pkProfessionalSchedule.value = null;
        isDialogSchedules.value = true;
        return;

    };
};
const editServicesProfessional = async (services) => {
    newServices.splice(0, newServices.length);
    dataServices.splice(0, dataServices.length);
    cleanDataEditServices();
    let dataService = await getService(services.pkProfessional);
    pkProfessional.value = services.pkProfessional;
    if(dataService.statusCode === 200 && dataService.data?.length !== 0){
        dataServices.push(...dataService.data);
        let dataServicesToJson = JSON.parse(dataService.data[0]?.services);
        newServices.push(...dataServicesToJson);
        pkProfessionalServices.value = dataService.data[0]?.pkProfessionalServices;
        isDialogServices.value = true;
        return;
        
    };
    if(dataService.statusCode === 200 && dataService.data?.length === 0){
        store.commit('setAlertConfig', {message: dataService.message, type: 'info'});
        pkProfessionalServices.value = null;
        isDialogServices.value = true;
        return;

    };
};
const deleteProfessional = async (pkProfessional) => {
    let dataProfessional = await deleteProf(pkProfessional);
    if(dataProfessional.statusCode !== 200){
        store.commit('setAlertConfig', {message: dataProfessional.message, type: 'negative'});
        return;

    }
    store.commit('setAlertConfig', {message: dataProfessional.message, type: 'positive'});
    reloadPage();
    return;

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
const getAllProfessionals = async () => {
    let dataUserStorage = getDataUser();
    let dataProfessional = await getAll(dataUserStorage.pkUser);
    if(dataProfessional.statusCode !== 200){
        isLoaderEditProfessional.value = true;
        store.commit('setAlertConfig', {message: dataProfessional.message, type: 'negative'});
        return;

    };
    dataProfessionals.push(...dataProfessional.data);
    isLoaderEditProfessional.value = true;
    store.commit('setAlertConfig', {message: dataProfessional.message, type: 'info'});
    return;

};
const cleanFormProfessional = () => {
    dataEditProfessional.name = '';
    dataEditProfessional.image = '';
    dataEditProfessional.instagram = '';
    dataEditProfessional.isUnavailable = false;

};
const cleanDataEditServices = () => {
    dataEditServices.name = '';
    dataEditServices.price = null;
    dataEditServices.time = null;

};
const reloadPage = () => {
    setTimeout(() => {
        location.reload();

    }, 3000);

};
watch(() => dataEditProfessional.image, () => {
    imageProfile.value = !dataEditProfessional.image ? userDefault : imageProfile.value;

});
onMounted( async () => {
    dataEditSchedules.push(...scheduleFormatter);
    await getAllProfessionals();
        
});
</script>
<template>
    <div id="edit-professional">
        <div class="edit-professional q-mt-xl">
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
            <div class="edit-professional-list q-my-lg">
                <div v-if="!isLoaderEditProfessional">
                    <Loader />
                </div>
                <div v-else
                    class="edit-professional-list-card">
                    <CardProfessionalList
                        v-for="i in dataProfessionals" :key="i"
                        :dataProfessional='i'
                        @deleteProfessional='deleteProfessional'
                        @editFormProfessional='editFormProfessional'
                        @editScheduleProfessional='editScheduleProfessional'
                        @editServicesProfessional='editServicesProfessional' />
                </div>
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
                :newServices='newServices'
                @addService='addService'
                @deleteService='deleteService'
                @saveFormServices='saveFormServices' />
            <FormDialogAddSchedules
                v-model:isDialogSchedules='isDialogSchedules'
                v-model:dataEditSchedules='dataEditSchedules'
                @saveFormSchedules='saveFormSchedules' />
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");
#edit-professional{
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: calc(100vh - 5rem);
    font-family: "Fredoka", sans-serif;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, .05)),
      url("../../assets/background/background-wave.png") no-repeat
        fixed bottom;
    background-size: cover;

    .edit-professional{
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .edit-professional-add{
            width: 100%;
            display: flex;
            justify-content: space-between;
            border-bottom: 2px solid $brown-9;

        }
        .edit-professional-list{
            width: 100%;
            
            .edit-professional-list-card{
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: 1.2rem;

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