<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { FormDialogAddProfessional, 
        FormDialogAddServices, 
        FormDialogAddSchedules, 
        CardProfessionalList } from '../../components';
import { isAnyShiftOpen } from '../../utils/inputValidators.js';
import userDefault from '../../assets/imgsDefault/user.png';
import { getAll, create, update, deleteProf } from '../../services/api/api.professional.js';
import { getService, createService, updateService } from '../../services/api/api.services.js';
import { getSchedules, createSchedules, updateSchedules } from '../../services/api/api.schedule.js';

const store = useStore();
const isDialogAdd = ref(false);
const isDialogSchedules = ref(false);
const isDialogServices = ref(false);
const pkProfessional = ref(null);
const pkProfessionalServices = ref(null);
const pkProfessionalSchedule = ref(null);
const imageProfile = ref(null);
const dataEditProfessional = reactive({
    pkProfessional: '',
    name: '',
    image: null,
    instagram: ''
    
});
const dataEditServices = reactive({
    name: '',
    price: null,
    time: null
    
});
const dataEditSchedules = reactive([
    {
        mon: {
            morning: { open: null, close: null },
            afternoon: { open: null, close: null },
            night: { open: null, close: null }
        }
    },
    {
        tue: {
            morning: { open: null, close: null },
            afternoon: { open: null, close: null },
            night: { open: null, close: null }
        }
    },
    {
        wed: {
            morning: { open: null, close: null },
            afternoon: { open: null, close: null },
            night: { open: null, close: null }
        }
    },
    {
        thu: {
            morning: { open: null, close: null },
            afternoon: { open: null, close: null },
            night: { open: null, close: null }
        }
    },
    {
        fri: {
            morning: { open: null, close: null },
            afternoon: { open: null, close: null },
            night: { open: null, close: null }
        }
    },
    {
        sat: {
            morning: { open: null, close: null },
            afternoon: { open: null, close: null },
            night: { open: null, close: null }
        }
    },
    {
        sun: {
            morning: { open: null, close: null },
            afternoon: { open: null, close: null },
            night: { open: null, close: null }
        }
    }
]);
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
        store.commit('setAlertConfig', {message: dataProfessional.message, type: 'positive'});
        //console.log('create', pkProfessional);
        return;

    };
    let dataProfessional = await update(dataEditProfessional, pkProfessional);
    store.commit('setAlertConfig', {message: dataProfessional.message, type: 'positive'});
    //console.log('update');
    return;

};
const saveFormServices = async () => {
    if(pkProfessionalServices.value){
        let dataService = await updateService(newServices, dataServices[0].pkProfessionalServices);
        store.commit('setAlertConfig', {message: dataService.message, type: 'positive'});
        //console.log('update');
        return;

    };
    let dataService = await createService(newServices, pkProfessional.value);
    store.commit('setAlertConfig', {message: dataService.message, type: 'positive'});
    //console.log('create');
    return;

};
const saveFormSchedules = async () => {
    if(!isAnyShiftOpen(dataEditSchedules)){
        store.commit('setAlertConfig', {message: 'Preencher algum horário', type: 'warning'});
        return;

    };
    if(pkProfessionalSchedule.value){
        let dataSchedule = await updateSchedules(dataEditSchedules, pkProfessionalSchedule.value);
        store.commit('setAlertConfig', {message: dataSchedule.message, type: 'positive'});
        //console.log(dataSchedule, dataEditSchedules, pkProfessionalSchedule.value);
        return;

    };
    let dataSchedule = await createSchedules(dataEditSchedules, pkProfessional.value);
    store.commit('setAlertConfig', {message: dataSchedule.message, type: 'positive'});
    //console.log(dataSchedule);
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
    isDialogAdd.value = true;

};
const editScheduleProfessional = async (data) => {
    let dataSchedule = await getSchedules(data.pkProfessional);
    pkProfessional.value = data.pkProfessional;
    if(dataSchedule.statusCode === 200){
        dataEditSchedules.splice(0, dataEditSchedules.length);
        dataEditSchedules.push(...dataSchedule.data[0].schedules);
        pkProfessionalSchedule.value = dataSchedule.data[0].pkProfessionalSchedules;
        isDialogSchedules.value = true;
        return;

    };
    pkProfessionalSchedule.value = null;
    isDialogSchedules.value = true;
    return;

};
const editServicesProfessional = async (services) => {
    newServices.splice(0, newServices.length);
    dataServices.splice(0, dataServices.length);
    cleanDataEditServices();
    let dataService = await getService(services.pkProfessional);
    pkProfessional.value = services.pkProfessional;
    if(dataService.data?.length !== 0){
        dataServices.push(...dataService.data);
        newServices.push(...dataService.data[0].services);
        pkProfessionalServices.value = dataService.data[0].pkProfessionalServices;
        isDialogServices.value = true;
        return;
        
    };
    console.log(dataService.message);
    pkProfessionalServices.value = null;
    isDialogServices.value = true;
    return;

};
const deleteProfessional = async (pkProfessional) => {
    let dataProfessional = await deleteProf(pkProfessional);
    console.log(dataProfessional);
    store.commit('setAlertConfig', {message: dataProfessional.message, type: 'info'});
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
const cleanFormProfessional = () => {
    dataEditProfessional.name = '';
    dataEditProfessional.image = '';
    dataEditProfessional.instagram = '';

};
const cleanDataEditServices = () => {
    dataEditServices.name = '';
    dataEditServices.price = null;
    dataEditServices.time = null;

};
watch(() => dataEditProfessional.image, () => {
    imageProfile.value = !dataEditProfessional.image ? userDefault : imageProfile.value;

});
watch(() => store.getters.getAlertConfig.isAlert, () => {
    if(!store.getters.getAlertConfig.isAlert){
        //console.log(store.getters.getAlertConfig.isAlert);
        return location.reload();

    };
});
onMounted( async () => {
    let dataProfessional = await getAll(1);
    dataProfessionals.push(...dataProfessional.data);
    
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
                <CardProfessionalList
                    v-for="i in dataProfessionals" :key="i"
                    :dataProfessional='i'
                    @deleteProfessional='deleteProfessional'
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
        width: 70%;
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