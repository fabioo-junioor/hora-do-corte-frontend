<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isReservation = ref(false);
const reservation = () => {
    isReservation.value = !isReservation.value;
    console.log(isReservation.value);
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
                @click="reservation" >
                    <i class='bx bxs-hand-up q-px-sm' />
                    Agendar
            </q-btn>
            <div
                v-if="isReservation" 
                class="reservation-content">

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
            background-color: aquamarine;

        }
    }
}
</style>