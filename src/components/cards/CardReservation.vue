<script setup>
const props = defineProps(['dataCustomerReservation']);
const emit = defineEmits(['cancelReservation']);
import userDefault from '../../assets/imgsDefault/user.png';

const cancelReservation = (pkReservation) => {
    emit('cancelReservation', pkReservation);

};
</script>
<template>
  <div id="card-reservation">
    <q-card dark class="my-card q-ma-lg bg-brown-9">
      <q-card-section class="section-date column q-pa-none">
        <div class="text-h6 q-mt-md q-ml-sm">{{props.dataCustomerReservation[0]?.dateReservation}}</div>
        <q-card-section class="section-user row q-ma-md" v-for="i in props.dataCustomerReservation" :key="i">
            <div class="card-reservation-details col-11 row justify-between items-center">
                <div class="col">
                    <div class="text-subtitle1">Cliente</div>
                    <div class="text-subtitle2 text-grey-4">{{ i.nameCustomer }}</div>
                </div>
                <div class="col">
                    <div class="text-subtitle1">Telefone</div>
                    <div class="text-subtitle2 text-grey-4">{{ i.phoneCustomer }}</div>
                </div>
                <div v-if="!!i.emailCustomer" class="col">
                    <div class="text-subtitle1">Email</div>
                    <div class="text-subtitle2 text-grey-4">{{ i.emailCustomer }}</div>
                </div>
                <div class="col">
                    <div class="text-subtitle1">Horário</div>
                    <div class="text-subtitle2 text-grey-4">{{ i.dateReservation }} - {{ i.timeReservation }}</div>
                </div>
                <div class="col">
                    <div class="text-subtitle1">Serviços</div>
                    <div class="text-subtitle2 text-grey-4"
                        v-for="j in i.services" :key="j">{{j.name}} | R$:{{j.price}} | {{j.time}}min</div>
                </div>
                <div class="col">
                    <div class="text-subtitle1">Profisional</div>
                    <div class="text-subtitle2 text-grey-4">{{ i.nameProfessional }}</div>
                </div>
                <div class="col">
                    <div class="text-subtitle1">Valor</div>
                    <div class="text-subtitle2 text-grey-4">R$: {{ i.price }}</div>
                </div>
                <div v-if="!!i.observationCustomer" class="col">
                    <div class="text-subtitle1">Observações</div>
                    <div class="text-subtitle2 text-grey-4 q-pr-sm">R$: {{ i.observationCustomer }}</div>
                </div>
            </div>
            <div class="card-reservation-btn col-1 row justify-center items-center">
                <q-btn
                    dark stack push
                    @click="cancelReservation(i.pkReservation)"
                    class="full-height"
                    size=".8rem"
                    color="brown-5"
                    icon="delete"
                    label="Cancelar reserva" />
            </div>
        </q-card-section>
    </q-card-section>
    </q-card>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#card-reservation{
    width: 100%;

    .my-card{
        box-shadow: none;

        .section-user{
            border: 1px solid $brown-3;
            border-radius: 5px;
            box-shadow: 1px 1px 1px 1px $brown-5;
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