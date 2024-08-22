<script setup>
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { CardProfessional } from '../../components';

const route = useRoute();
const isReservation = ref(true);
const step = ref(1);
const dataServices = reactive([
    {
        professional: 'fabio',
        services: ['corte', 'barba']
    },
    {
        professional: 'joao',
        services: ['corte', 'barba', 'pezin']
    }
]);
const dataReservation = reactive([
    {
        professional: 'fabio',
        services: [],
        dateTime: ''
    }
]);
const reservation = () => {
    console.log('reservou!', dataReservation);

};
const checkProfessional = (data) => {
    console.log(data);
    
}
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
                        <CardProfessional
                            v-for="i in dataServices" :key="i"
                            :professional="i.professional"
                            @checkProfessional='checkProfessional' />
                            {{dataReservation.professional}}
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
                        <q-banner v-if="step === 1" class="bg-brown-10 text-white q-px-md">
                        Campaign settings are important...
                        </q-banner>
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
            
        }
    }
}
</style>