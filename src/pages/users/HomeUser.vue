<script setup>
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { CardProfessional } from '../../components';

const route = useRoute();
const isReservation = ref(true);
const step = ref(1);
const teste = ref('fabio');
const dataServices = reactive([
    {
        idProfessional: 1,
        professional: 'fabio',
        image: 'https://cdn.quasar.dev/img/avatar.png',
        services: ['corte', 'barba']
    },
    {
        idProfessional: 2,
        professional: 'joao',
        image: '',
        services: ['corte', 'barba', 'pezin']
    }
]);
const dataReservation = reactive({
        idProfessional: null,
        professional: '',
        services: [],
        dateTime: ''
});
const reservation = () => {
    console.log('reservou!', dataReservation);

};
const checkProfessional = (data) => {
    dataReservation.idProfessional = data.idProfessional;
    dataReservation.professional = data.professional;
    
};
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
                        <div class="reservation-content-step-card-professional">
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
                        <h4>teste2</h4>
                    </q-step>
                    <q-step
                        :name="3"
                        title="Selecione data e hora"
                        icon="today"
                        :done="step > 3">
                        <h4>teste3</h4>
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
                                <p class="q-ma-none q-py-md">
                                    Escolha um ou mais serviços. Tais serviços estão relacionados com o profissional anteriormente definido!
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
    height: calc(100vh - 4rem);
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
            .reservation-content-messages{
                display: flex;
                width: 100%;
                min-height: 10rem;

                .messages-banner-info{
                    width: 70%;

                }
                .messages-banner-details{
                    width: 30%;

                }
                .messages-banner-details{
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