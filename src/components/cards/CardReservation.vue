<script setup>
const props = defineProps(['dataCustomerReservation']);
const emit = defineEmits(['cancelReservation']);
import userDefault from '../../assets/imgsDefault/user.png';

const cancelReservation = (idReservation) => {
    emit('cancelReservation', idReservation);

};
</script>
<template>
  <div id="card-reservation">
    <q-card dark class="my-card q-ma-lg bg-brown-9">
      <q-card-section class="row">
        <div class="card-reservation-details col-10 row justify-between items-center">
            <div class="col">
                <q-avatar size="4rem">
                    <img :src="userDefault">
                </q-avatar>
            </div>
            <div class="col">
                <div class="text-subtitle1">Cliente</div>
                <div class="text-subtitle2 text-grey-4">{{ dataCustomerReservation.name }}</div>
            </div>
            <div class="col">
                <div class="text-subtitle1">Data e horário</div>
                <div class="text-subtitle2 text-grey-4">{{ dataCustomerReservation.date }} - {{ dataCustomerReservation.time }}</div>
            </div>
            <div class="col">
                <div class="text-subtitle1">Serviços</div>
                <div class="text-subtitle2 text-grey-4"
                    v-for="(i, index) in dataCustomerReservation.services" :key="i">{{index+1}}: {{i}}</div>
            </div>
            <div class="col">
                <div class="text-subtitle1">Profisional</div>
                <div class="text-subtitle2 text-grey-4">{{ dataCustomerReservation.professional }}</div>
            </div>
            <div class="col">
                <div class="text-subtitle1">Valor</div>
                <div class="text-subtitle2 text-grey-4">R$: {{ dataCustomerReservation.price }}</div>
            </div>
            <q-separator inset vertical color="grey-5" />
        </div>
        <div class="card-reservation-btn col-2 row justify-center items-center">
            <q-btn
                dark
                @click="cancelReservation(dataCustomerReservation.id)"
                color="brown-5"
                icon="delete"
                label="Cancelar reserva" />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

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