<script setup>
const props = defineProps(["dataCustomerReservation", "isLoaderTime"]);
const emit = defineEmits(["cancelReservation"]);
import userDefault from "../../assets/imgsDefault/user.png";

const cancelReservation = (pkReservation) => {
  emit("cancelReservation", pkReservation);
};
</script>
<template>
  <div id="card-reservation">
    <q-card dark class="my-card q-ma-sm bg-brown-9">
      <q-card-section class="section-date column q-pa-none">
        <div class="text-h6 q-mt-md q-ml-sm">
          {{ props.dataCustomerReservation[0]?.dateReservation }}
        </div>
        <q-card-section
          class="section-user row q-ma-md"
          v-for="i in props.dataCustomerReservation"
          :key="i"
        >
          <div
            class="card-reservation-details col-10 row justify-between items-center"
          >
            <div class="col-2 q-my-xs">
              <div class="text-subtitle1">Cliente</div>
              <div class="text-subtitle2 text-grey-4">{{ i.nameCustomer }}</div>
            </div>
            <div class="col-4 q-my-xs">
              <div class="text-subtitle1">Horário</div>
              <div class="text-subtitle2 text-grey-4">
                {{ i.dateReservation }} / {{ i.timeReservation }}
              </div>
            </div>
            <div class="col-4 q-my-xs">
              <div class="text-subtitle1">Serviços</div>
              <div
                class="text-subtitle2 text-grey-4"
                v-for="j in i.services"
                :key="j"
              >
                {{ j.name }} / {{ j.time }}min
              </div>
            </div>
            <div class="col-2 q-my-xs">
              <div class="text-subtitle1">Profisional</div>
              <div class="text-subtitle2 text-grey-4">
                {{ i.nameProfessional }}
              </div>
            </div>
            <q-tooltip
              class="bg-red-10 q-pa-md"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="q-my-sm">
                <div class="text-subtitle1">Telefone:</div>
                <div class="text-subtitle2 text-grey-4">
                  {{ i.phoneCustomer }}
                </div>
              </div>
              <div v-if="!!i.emailCustomer" class="q-my-sm">
                <div class="text-subtitle1">Email:</div>
                <div class="text-subtitle2 text-grey-4">
                  {{ i.emailCustomer }}
                </div>
              </div>
              <div class="q-my-sm">
                <div class="text-subtitle1">Serviços:</div>
                <div
                  class="text-subtitle2 text-grey-4"
                  v-for="j in i.services"
                  :key="j"
                >
                  {{ j.name }} | R$:{{ j.price }} | {{ j.time }}min
                </div>
              </div>
              <div v-if="!!i.observationCustomer" class="q-my-sm">
                <div class="text-subtitle1">Observações:</div>
                <div class="text-subtitle2 text-grey-4 q-pr-sm">
                  {{ i.observationCustomer }}
                </div>
              </div>
              <div class="q-my-sm">
                <div class="text-subtitle1">Valor total:</div>
                <div class="text-subtitle2 text-grey-4">R$: {{ i.price }}</div>
              </div>
            </q-tooltip>
          </div>
          <div class="card-reservation-btn col-2 row justify-end items-center">
            <q-btn
              dark
              stack
              push
              :disable="isLoaderTime"
              @click="cancelReservation(i.pkReservation)"
              class="full-height"
              size=".8rem"
              color="brown-5"
              :icon="!isLoaderTime ? 'delete' : ''"
              :label="!isLoaderTime ? 'Cancelar reserva' : ''">
              <slot v-if="isLoaderTime" />
            </q-btn>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#card-reservation {
  width: 100%;

  .my-card {
    box-shadow: none;

    .section-user {
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
@media only screen and (max-width: 992px) {
}
@media only screen and (max-width: 720px) {
  #card-reservation {
    .my-card {
      .section-user {
        .card-reservation-details {
          flex-direction: column;
          align-items: flex-start;
          padding: 0.2rem;
          
        }
      }
    }
  }
}
@media only screen and (max-width: 481px) {
}
@media only screen and (max-width: 360px) {
}
</style>