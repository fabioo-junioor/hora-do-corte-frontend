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
      <q-card-section class="section-date column q-pa-none">
        <div class="text-h6 q-mt-md q-ml-sm">{{props.dataCustomerReservation[0]?.date}}</div>
        <q-card-section class="section-user row q-ma-md" v-for="i in props.dataCustomerReservation" :key="i">
            <div class="card-reservation-details col-11 row justify-between items-center">
                <div class="col">
                    <div class="text-subtitle1">Cliente</div>
                    <div class="text-subtitle2 text-grey-4">{{ i.name }}</div>
                </div>
                <div class="col">
                    <div class="text-subtitle1">Telefone</div>
                    <div class="text-subtitle2 text-grey-4">{{ i.phone }}</div>
                </div>
                <div v-if="!!i.email" class="col">
                    <div class="text-subtitle1">Email</div>
                    <div class="text-subtitle2 text-grey-4">{{ i.email }}</div>
                </div>
                <div class="col">
                    <div class="text-subtitle1">Data e horário</div>
                    <div class="text-subtitle2 text-grey-4">{{ i.date }} - {{ i.time }}</div>
                </div>
                <div class="col">
                    <div class="text-subtitle1">Serviços</div>
                    <div class="text-subtitle2 text-grey-4"
                        v-for="(j, index) in i.services" :key="j">{{index+1}}: {{j}}</div>
                </div>
                <div class="col">
                    <div class="text-subtitle1">Profisional</div>
                    <div class="text-subtitle2 text-grey-4">{{ i.professional }}</div>
                </div>
                <div class="col">
                    <div class="text-subtitle1">Valor</div>
                    <div class="text-subtitle2 text-grey-4">R$: {{ i.price }}</div>
                </div>
                <div v-if="!!i.observation" class="col">
                    <div class="text-subtitle1">Observações</div>
                    <div class="text-subtitle2 text-grey-4 q-pr-sm">R$: {{ i.observation }}</div>
                </div>
            </div>
            <div class="card-reservation-btn col-1 row justify-center items-center">
                <q-btn
                    dark stack push
                    @click="cancelReservation(i.id)"
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