<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { CardProfessional, CalendarSchedule, FormReservation, Loader } from '../../components';
import { dataServicesTest } from '../../utils/dataTests.js';
import { divideHoursIntoIntervals, formatString, formatPhoneNumber, orderSchedules, sumTimeService, cleanSpecialCharacters } from '../../utils/formatters.js';
import { dateCompare, getDateToday, getCurrentTime, getDayWeekFromDate, sumMinutes, calculePriceTotal } from '../../utils/dataUtils.js';
import { phoneValidator, fielsCheckSize } from '../../utils/inputValidators.js';
import { getUserDetailsBySlug } from '../../services/api/api.userDetails.js';
import { getAll } from '../../services/api/api.professional.js';
import { getService } from '../../services/api/api.services.js';
import { getSchedules } from '../../services/api/api.schedule.js';
import { getReservationByProfessional, createReservation } from '../../services/api/api.reservation.js';
import { getLastPurchasePlan } from '../../services/api/api.purchase.js';
import { date } from 'quasar';

const route = useRoute();
const router = useRouter();
const store = useStore();
const isReservation = ref(false);
const isUserExistis = ref(false);
const isTimes = ref(false);
const btnReservationDisable = ref(false);
const step = ref(1);

const dataUser = reactive([]);
const dataAllProfessionals = reactive([]);
const dataAllServices = reactive([]);
const dataAllSchedules = reactive([]);
const dataServiceSelected = reactive([]);
const dataScheduleSelected = reactive([]);

const timesIsReserved = reactive([]);
const dataTimesFromWeek = reactive([]);
const dataReservation = reactive({
        pkProfessional: null,
        professional: '',
        services: [],
        dateReservation: '',
        timeReservation: '',
        price: null,
        duration: null
});
const dataFormReservation = reactive({
    name: 'fabio',
    email: 'fabio@bol.com',
    phone: '11999900022',
    observation: 'sem'
});
const checkProfessional = async (data) => {
    dataServiceSelected.splice(0, dataServiceSelected.length);
    dataScheduleSelected.splice(0, dataScheduleSelected.length);

    dataReservation.pkProfessional = data.pkProfessional;
    dataReservation.professional = data.name;
    dataReservation.services = [];

    dataAllServices.filter((elem) => {
        if(elem.fkProfessional == data.pkProfessional){
            let dataServicesToJson = JSON.parse(elem.services);
            dataServiceSelected.push(...dataServicesToJson);

        };
    });
    dataAllSchedules.filter((elem) => {
        if(elem.fkProfessional == data.pkProfessional){
            let dataSchedulesToJson = JSON.parse(elem.schedules);
            dataScheduleSelected.push(...dataSchedulesToJson);

        };
    });    
    let orderSchedule = orderSchedules(dataScheduleSelected);
    dataScheduleSelected.splice(0, dataScheduleSelected.length);
    dataScheduleSelected.push(...orderSchedule);
    return;
    
};
const checkScheduleDate = async (date) => {
    if(date){
        dataTimesFromWeek.splice(0, dataTimesFromWeek.length);
        timesIsReserved.splice(0, timesIsReserved.length);

        dataReservation.dateReservation = date;
        isTimes.value = false;
        let dayWeek = getDayWeekFromDate(date);
        let totalMinutes = sumMinutes(dataReservation.services);
        dataReservation.duration = totalMinutes;
        
        let timesReserved = await getReservationByProfessional(dataReservation.pkProfessional, date);
        if(timesReserved?.data){
            timesIsReserved.push(
                timesReserved.data.map(elem => {
                    return { "timeStart": elem.timeReservation, "timeEnd": sumTimeService(elem.timeReservation, elem.duration)}

                })
            );
            dataTimesFromWeek.push(...divideHoursIntoIntervals(dataScheduleSelected, totalMinutes, timesIsReserved[0], dayWeek));
            isTimes.value = true;
            return;

        };
        dataTimesFromWeek.push(...divideHoursIntoIntervals(dataScheduleSelected, totalMinutes, timesIsReserved, dayWeek));
        isTimes.value = true;
        return;

    };
    isTimes.value = false;
    return;

};
const checkScheduleTime = (data) => {
    dataReservation.timeReservation = data;

};
const verifyReservationComplete = async () => {
    if(fielsCheckSize(dataFormReservation.name) && phoneValidator(dataFormReservation.phone)){
        dataReservation.price = calculePriceTotal(dataReservation.services);
        dataReservation.duration = sumMinutes(dataReservation.services);
        dataFormReservation.phone = cleanSpecialCharacters(dataFormReservation.phone);
        let dataReser = await createReservation(dataUser[0]?.fkUser, dataReservation, dataFormReservation);
        if(dataReser.statusCode !== 201){
            store.commit('setAlertConfig', {message: dataReser.message, type: 'warning'});
            return;

        };
        store.commit('setAlertConfig', {message: dataReser.message, type: 'positive'});
        reloadPage();
        return;

    };
};
const checkCustomerChoice = (step) => {
    if((step === 1) && (dataReservation.pkProfessional != null)){
        return true;

    };
    if((step === 2) && (dataReservation.services.length !== 0)){
        return true;

    };
    if((step === 3) && (dataReservation.dateReservation != '') && (dataReservation.timeReservation != '')){
        return true;

    };
    if((step === 4) && (dataReservation.pkProfessional != null) &&
        (dataReservation.services.length != 0) &&
        (dataReservation.dateReservation != '') && 
        (dataReservation.timeReservation != '') &&
        (dataFormReservation.name != '') &&
        (dataFormReservation.phone != '')){
        return true;

    };
    return false;

};
const getAllProfessionals = async () => {
    let dataProfessional = await getAll(dataUser[0]?.fkUser);
    if(dataProfessional.statusCode === 200 && dataProfessional.data?.length !== 0){
        dataAllProfessionals.push(...dataProfessional.data);
        return;

    };
    if(dataProfessional.statusCode === 200 && dataProfessional.data?.length === 0){
        return;

    };
    store.commit('setAlertConfig', {message: dataProfessional.message, type: 'negative'});
    return;

};
const getAllServices = async () => {
    dataAllProfessionals.filter( async (elem) => {
        let dataServices = await getService(elem.pkProfessional);
        if(dataServices.statusCode === 200 && dataServices.data?.length !== 0){
            dataAllServices.push(...dataServices.data);

        };
    });
};
const getAllSchedules = async () => {
    dataAllProfessionals.filter( async (elem) => {
        let dataSchedules = await getSchedules(elem.pkProfessional);
        if(dataSchedules.statusCode === 200 && dataSchedules.data.length !== 0){
            dataAllSchedules.push(...dataSchedules.data);

        };
    });
};
const servicesExistsByProfessional = (pkProfessional) => {
    for (let i = 0; i < dataAllServices.length; i++) {
        if(dataAllServices[i].fkProfessional === pkProfessional){
            return true;

        };        
    }
    return false;

};
const schedulesExistsByProfessional = (pkProfessional) => {
    for (let i = 0; i < dataAllSchedules.length; i++) {
        if(dataAllSchedules[i].fkProfessional === pkProfessional){
            return true;

        };        
    };
    return false;

};
const checkUserExists = async () => {
    let dataU = await getUserDetailsBySlug(route.params.nameUser);
    if(dataU.statusCode !== 200 || dataU.data?.length === 0){
        isUserExistis.value = false;
        router.push({ name: 'notFoundUser' });
        return;

    };
    isUserExistis.value = true;
    dataUser.push(...dataU.data);   
    let dataLastPurchase = await getLastPurchasePlan(dataU.data[0]?.fkUser);
    if(dataLastPurchase.statusCode === 200 && dataLastPurchase.data?.length === 0){
        btnReservationDisable.value = false;
        return;

    };
    if(dataLastPurchase.statusCode === 200 && dataLastPurchase.data?.length !== 0){
        let dateValidity = dataLastPurchase.data[0]?.purchaseValidity;
        let timeValidity = dataLastPurchase.data[0]?.purchaseTime;
        let dateToday = getDateToday();
        let timeToday = getCurrentTime();
        if(!dateCompare(dateValidity, timeValidity, dateToday, timeToday)){
            btnReservationDisable.value = false;
            return;

        };
        await getAllProfessionals();
        if(dataAllProfessionals.length !== 0){
            await getAllServices();
            await getAllSchedules();
            btnReservationDisable.value = true;
            return;

        };
        btnReservationDisable.value = true;
        return;

    };    
    return;

};
const reloadPage = () => {
    setTimeout(() => {
        location.reload();

    }, 3000);

};
onMounted(async () => {
    await checkUserExists();
        
});
</script>
<template>
    <div id="home-user">
        <div v-if="!isUserExistis" class="home-user-load row justify-center items-center">
            <Loader />
        </div>
        <div v-else class="home-user">
            <div class="home-user-details column justify-between"
                v-if="!isReservation">
                <h4 class="text-white text-center q-pt-xl q-ma-none">Bem vindo!</h4>
                <q-btn
                    push
                    :disable='!btnReservationDisable'
                    size="xl"
                    color="brown-10"
                    @click="isReservation = !isReservation" >
                        <i class='bx bxs-hand-up q-px-sm' />
                        Agendar
                </q-btn>
                <div class="row items-end justify-between q-pb-sm">
                    <div class="home-user-details-adress column items-start">
                        <div class="text-subtitle1 text-grey-3">{{ dataUser[0]?.state }}</div>
                        <div class="text-subtitle1 text-grey-3">{{ dataUser[0]?.city }}</div>
                        <div class="text-subtitle1 text-grey-3">{{ dataUser[0]?.street }}</div>
                        <div class="text-subtitle1 text-grey-3">{{ dataUser[0]?.number }}</div>
                    </div>
                    <div class=" home-user-details-contact column items-end justify-end">
                        <div class="text-subtitle1">
                            <a :href="dataUser[0]?.instagram" target="_blank">
                                <i class='bx bxl-instagram-alt text-white q-ma-xs' />
                            </a>
                        </div>
                        <div class="text-subtitle1 text-grey-3 row items-center">
                            <i class='bx bxl-whatsapp text-white q-ma-xs' />
                            {{ formatPhoneNumber(dataUser[0]?.phone) }}
                        </div>
                    </div>
                </div>
            </div>
            <div v-else
                class="reservation-content">
                <h4 class="text-white text-center q-pa-none q-my-lg">Bem vindo!</h4>
                <q-stepper
                    bordered
                    style="background-color: #A9907E;"
                    v-model="step"
                    ref="stepper"
                    active-color="brown-10"
                    inactive-color="brown-8"
                    done-color="green-10"
                    animated>
                    <q-step
                        :name="1"
                        title="Selecionar um profissional"
                        icon="person"
                        :done="step > 1">
                        <div 
                            v-if="!dataAllProfessionals.length"
                            class="text-subtitle1">
                            Ainda sem profissionais cadastrados!
                        </div>
                        <div
                            v-else 
                            class="reservation-content-step-card-professional q-my-md">
                            <CardProfessional
                                v-for="i in dataAllProfessionals" :key="i"
                                :dataProfessionals='i'
                                v-model:pkProfessional='dataReservation.pkProfessional'
                                :professionalEnable='servicesExistsByProfessional(i.pkProfessional) && schedulesExistsByProfessional(i.pkProfessional)'
                                @checkProfessional='checkProfessional' />
                        </div>
                    </q-step>
                    <q-step
                        :name="2"
                        title="Selecione o(s) serviço(s)"
                        icon="content_cut"
                        :done="step > 2">
                        <div class="reservation-content-services q-my-md">
                            <q-checkbox
                                dark
                                class="reservation-content-service text-brown-10 q-py-xs q-px-md"
                                v-for="i in dataServiceSelected" :key="i"
                                v-model="dataReservation.services"
                                color="brown-8"
                                keep-color
                                :val="i">
                                {{ i.name }}
                                <q-badge transparent class="badge-time q-py-sm q-ma-xs" color="brown-10" :label="i.time+'min'" />
                                <q-badge class="badge-price q-py-xs" color="brown-10" :label="'R$'+i.price" />
                            </q-checkbox>
                        </div>
                    </q-step>
                    <q-step
                        :name="3"
                        title="Selecione data e hora"
                        icon="today"
                        :done="step > 3">
                        <div class="reservation-content-schedules q-my-md">
                            <CalendarSchedule
                                :schedules='dataScheduleSelected'
                                :timesAvailable='dataTimesFromWeek'
                                :isLoaderTimes='isTimes'
                                @checkScheduleDate='checkScheduleDate'
                                @checkScheduleTime='checkScheduleTime'>
                                <Loader loaderColor='white' />
                            </CalendarSchedule>
                        </div>
                    </q-step>
                    <q-step
                        :name="4"
                        title="Confirmar agendamento"
                        icon="done_outline"
                        :done="step > 4">
                        <div class="reservation-content-confirm">
                            <FormReservation
                                v-model:dataFormReservation="dataFormReservation" />
                        </div>
                    </q-step>
                    <template v-slot:navigation>
                        <q-stepper-navigation>
                            <q-btn
                                push
                                v-if="step === 4"
                                @click="verifyReservationComplete"
                                :disable='!checkCustomerChoice(step)'
                                icon="check_circle"
                                color="brown-10"
                                label="Agendar" />
                            <q-btn
                                push
                                v-else
                                @click="$refs.stepper.next()"
                                :disable='!checkCustomerChoice(step)'
                                icon-right="arrow_forward"
                                color="brown-10"
                                label="Proxima etapa" />
                            <q-btn
                                v-if="step > 1"
                                flat
                                icon="arrow_back"
                                color="brown-8"
                                @click="$refs.stepper.previous()"
                                label="Voltar"
                                class="q-ml-sm" />
                        </q-stepper-navigation>
                    </template>

                    <template v-slot:message>
                        <div class="reservation-content-messages">
                            <q-banner v-if="step === 1" class="messages-banner-info bg-brown-10 text-white q-px-sm">
                                <p class="q-ma-none q-py-sm">
                                    1. Escolha um Profissional para realizar seu serviço!
                                </p>
                                <p class="q-ma-none q-py-sm">
                                    2. Cada profissional pode realizar diferentes serviços!
                                </p>
                            </q-banner>
                            <q-banner v-if="step === 2" class="messages-banner-info bg-brown-10 text-white q-px-sm">
                                <p class="q-ma-none q-py-sm">
                                    1. Escolha um ou mais serviços!
                                </p>
                                <p class="q-ma-none q-py-sm">
                                    2. Os serviços estão relacionados com o profissional anteriormente definido!
                                </p>
                            </q-banner>
                            <q-banner v-if="step === 3" class="messages-banner-info bg-brown-10 text-white q-px-sm">
                                <p class="q-ma-none q-py-sm">
                                    1. Defina um dia que estiver disponiveis!
                                </p>
                                <p class="q-ma-none q-py-sm">
                                    2. Defina um horário que estiver disponiveis!
                                </p>
                            </q-banner>
                            <q-banner v-if="step === 4" class="messages-banner-info bg-brown-10 text-white q-px-md">
                                <p class="q-ma-none q-py-md">
                                    Confira seu dados e preencha os campos abaixo.
                                    Os campos (nome e telefone) são obrigatórios!
                                </p>
                            </q-banner>
                            <q-banner class="messages-banner-details bg-brown-8 text-white q-px-md">
                                <h5 class="q-ma-none q-py-sm">Detalhes da reserva</h5>
                                <q-separator class="q-my-sm" color="white" inset />
                                <p class="q-ma-none q-py-xs">
                                    <q-icon class="q-ma-xs" name="person" size="1.5rem" />
                                    Profissional:
                                    <span v-if="!!dataReservation.professional"
                                        class="q-ml-xs">
                                        {{ formatString(dataReservation.professional) }}
                                    </span>    
                                </p>
                                <p class="q-ma-none q-py-xs">
                                    <q-icon class="q-ma-xs" name="today" size="1.5rem" />
                                    Dia:
                                    <span v-if="!!dataReservation.dateReservation"
                                        class="q-ml-xs">
                                        {{ dataReservation.dateReservation }}
                                    </span>
                                </p>
                                <p class="q-ma-none q-py-xs">
                                    <q-icon class="q-ma-xs" name="alarm" size="1.5rem" />
                                    Horário:
                                    <span v-if="!!dataReservation.timeReservation"
                                        class="q-ml-xs">
                                        {{ dataReservation.timeReservation }}
                                    </span>
                                </p>
                                <div v-if="dataReservation.services.length !== 0"
                                    class="q-mt-lg">
                                    <div v-for="i, index in dataReservation.services" :key="i"
                                        class="row justify-between">
                                        <p class="q-ma-none">
                                            {{`${index+1}. ` + formatString(i.name) }}
                                        </p>
                                        <p class="q-ma-none">
                                            {{ 'R$ ' + i.price}}
                                        </p>
                                    </div>
                                    <q-separator class="q-my-xs" color="white" />
                                    <div class="row justify-between">
                                        <p class="q-ma-none">
                                            Total:
                                        </p>
                                        <p class="q-ma-none">
                                            <q-badge outline class="q-my-xs q-pa-xs" color="white" :label="'R$ ' + calculePriceTotal(dataReservation.services)" />
                                        </p>
                                    </div>
                                </div>
                            </q-banner>
                        </div>
                    </template>
                </q-stepper>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#home-user{
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: calc(100vh - 5rem);
    font-family: "Fredoka", sans-serif;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, .05)),
      url("../../assets/background/background-wave.png") no-repeat
        fixed bottom;
    background-size: cover;

    .home-user-load{
        min-height: calc(100vh - 5rem);
        width: 100%;
        
    }
    .home-user{
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: calc(100vh - 5rem);
        width: 90%;

        .home-user-details{
            min-height: calc(100vh - 5rem);
            width: 70%;

            .home-user-details-contact{
                i{
                    font-size: 1.8rem;
                    color: $brown-10 !important;
                    
                }
                .bxl-instagram-alt:hover{
                    color: $brown-3 !important;

                }
            }
        }
        .q-btn{
            i{
                font-size: 2rem;

            }
            &:hover{
                background-color: $brown-10 !important;
                color: $whiteColorPrimary !important;

            }
        }       
        .reservation-content{
            height: 100%;
            width: 100%;

            .reservation-content-step-card-professional{
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;

            }
            .reservation-content-services{
                display: flex;
                flex-wrap: wrap;
                gap: 1.5rem;

                .reservation-content-service{
                    border-radius: 5px;
                    border: 1px solid $brown-8;
                    font-size: 1.2rem;
                    position: relative;
    
                    &:hover{
                        border: 1px solid $brown-10;
                        background-color: $brown-5;
                        
                    }
                    .badge-price{
                        font-size: .9rem;
                        position: absolute;
                        right: -20px;
                        top: -15px;

                        &:hover{
                            background-color: $whiteColorPrimary !important;
                            color: $darkColorPrimary;

                        }
                    }
                }
            }
            .reservation-content-schedules{
                display: flex;
                justify-content: center;
                
            }
            .reservation-content-messages{
                display: flex;
                width: 100%;

                .messages-banner-info{
                    width: 70%;

                    p{
                        font-size: 1rem;

                    }
                }
                .messages-banner-details{
                    width: 30%;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;

                    h5{
                        font-size: 1.5rem;
                        text-align: center;

                    }
                    p{
                        display: flex;
                        align-items: center;
                    }
                }
            }
        }
    }
}
</style>