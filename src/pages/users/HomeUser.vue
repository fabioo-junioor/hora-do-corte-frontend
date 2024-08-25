<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { CardProfessional, CalendarSchedule } from '../../components';
import { dataServicesTest } from '../../utils/dataTests.js';

const route = useRoute();
const isReservation = ref(true);
const step = ref(1);
const dataServices = reactive([]);
const dataReservation = reactive({
        idProfessional: null,
        professional: '',
        services: [],
        date: '',
        hours: ''
});
const reservation = () => {
    console.log('reservou!', dataReservation);

};
const checkProfessional = (data) => {
    dataReservation.idProfessional = data.idProfessional;
    dataReservation.professional = data.professional;
    dataReservation.services = [];
    
};
const checkScheduleDate = (data) => {
    dataReservation.date = data;
    console.log(dataReservation)

};
const verifyKeyByIdProfessional = (id) => {
    return dataServices.findIndex(elem => elem.idProfessional == id);

};
onMounted(() => {
    dataServices.push(...dataServicesTest);
    //console.log(dataServices)

});
</script>
<template>
    <div id="home-user">
        <div class="home-user q-pa-sm">
            <h5 class="text-white q-pa-md">Bem vindo!</h5>
            <q-btn
                v-if="!isReservation"
                outline
                size="lg"
                color="brown-10"
                @click="isReservation = !isReservation" >
                    <i class='bx bxs-hand-up q-px-sm' />
                    Agendar
            </q-btn>
            <div
                v-if="isReservation" 
                class="reservation-content">
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
                        <div class="reservation-content-step-card-professional q-my-md">
                            <CardProfessional
                                v-for="i, index in dataServices" :key="i"
                                :dataServices="dataServices[index]"
                                v-model:idProfessional="dataReservation.idProfessional"
                                @checkProfessional='checkProfessional' />
                        </div>
                    </q-step>
                    <q-step
                        :name="2"
                        title="Selecione o(s) serviço(s)"
                        icon="content_cut"
                        :done="step > 2">
                        <div v-if="dataReservation.idProfessional != null"
                            class="reservation-content-services q-my-md">
                            <q-checkbox
                                dark
                                class="reservation-content-service text-brown-10 q-py-xs q-px-md"
                                v-for="i in dataServices[verifyKeyByIdProfessional(dataReservation.idProfessional)].services" :key="i"
                                v-model="dataReservation.services"
                                color="brown-8"
                                keep-color
                                :val="i.name"
                                left-label>
                                {{ i.name }}
                                <q-badge color="brown-10" :label="'R$'+i.price" />
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
                                :schedules='dataServices[verifyKeyByIdProfessional(dataReservation.idProfessional)].schedules'
                                @checkScheduleDate='checkScheduleDate' />
                        </div>
                    </q-step>
                    <q-step
                        :name="4"
                        title="Confirmar agendamento"
                        icon="done_outline"
                        :done="step > 4">
                        <h4>teste4</h4>
                    </q-step>
                    <template v-slot:navigation>
                        <q-stepper-navigation>
                            <q-btn
                                v-if="step === 4"
                                @click="reservation"
                                icon="check_circle"
                                color="brown-10"
                                label="Agendar" />
                            <q-btn
                                v-else
                                @click="$refs.stepper.next()"
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
                            <q-banner v-if="step === 1" class="messages-banner-info bg-brown-10 text-white q-px-md">
                                <p class="q-ma-none q-py-md">
                                    Escolha um Profissional específico para realizar seu serviço!
                                </p>
                            </q-banner>
                            <q-banner v-if="step === 2" class="messages-banner-info bg-brown-10 text-white q-px-md">
                                <p 
                                    v-if="dataReservation.idProfessional != null"
                                    class="q-ma-none q-py-md">
                                    Escolha um ou mais serviços. Os serviços estão relacionados com o profissional anteriormente definido!
                                </p>
                                <p
                                    v-else
                                    class="q-ma-none q-py-md">
                                    Volte e escolha um profissional para que os serviços sejam visiveis!
                                </p>
                            </q-banner>
                            <q-banner v-if="step === 3" class="messages-banner-info bg-brown-10 text-white q-px-md">
                                <p class="q-ma-none q-py-md">
                                    Defina o dia e horário que estão disponiveis!
                                </p>
                            </q-banner>
                            <q-banner class="messages-banner-details bg-brown-9 text-white q-px-md">
                                <h5 class="q-ma-none q-py-sm">Detalhes da reserva</h5>
                                <q-separator class="q-my-sm" color="white" inset />
                                <p class="q-ma-none q-py-xs">
                                    <q-icon class="q-ma-xs" name="person" size="1.5rem" />
                                    Profissional:
                                    <span v-if="!!dataReservation.professional"
                                        class="q-ml-xs">
                                        {{ dataReservation.professional }}
                                    </span>    
                                </p>
                                <p class="q-ma-none q-py-xs">
                                    <q-icon class="q-ma-xs" name="content_cut" size="1.5rem" />
                                    Serviços:
                                    <span v-if="dataReservation.services.length !== 0"
                                        class="q-ml-xs">
                                        {{ dataReservation.services }}
                                    </span>
                                </p>
                                <p class="q-ma-none q-py-xs">
                                    <q-icon class="q-ma-xs" name="today" size="1.5rem" />
                                    Horário:
                                    <span v-if="!!dataReservation.date"
                                        class="q-ml-xs">
                                        {{ dataReservation.date }}
                                    </span>
                                </p>
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
    align-items: center;
    min-height: calc(100vh - 4rem);
    font-family: "Fredoka", sans-serif;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, .05)),
      url("../../assets/background/background-wave.png") no-repeat
        fixed bottom;
    background-size: cover;

    .home-user{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 80%;
        width: 80%;

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
                    .q-badge{
                        font-size: .9rem;
                        position: absolute;
                        right: -20px;
                        top: -8px;

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