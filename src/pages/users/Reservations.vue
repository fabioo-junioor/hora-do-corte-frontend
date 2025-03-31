<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { CardReservation, Loader, CardNotice, CardMessage, CardAlertNotice } from "../../components";
import { getReservation, deleteReservation } from "../../services/api/api.reservation.js";
import { getDataUser } from "../../services/storage/settingSession.js";
import { getDateToday, getCurrentTime, dateCompare } from '../../utils/dataUtils.js';

const store = useStore();
const isLoaderReservations = ref(false);
const isLoaderCancelReservations = ref(false);
const isNotice = ref(false);
const isMessage = ref('');
const dataCustomerReservation = reactive([]);
const noticeList = reactive([
  "1. Para o seu estabelecimento ficar disponivel para as pessoas agendarem, adquira um de nossos planos!",
  "1.1. Vá até pagina inicial do nosso site. Você pode começar com o nosso plano [Free]!",
]);

const cancelReservation = async (pkReservation) => {
  isLoaderCancelReservations.value = true;
  let dataUserStorage = getDataUser();
  let dataReservaions = await deleteReservation(pkReservation, dataUserStorage?.pkUser);
  if(dataReservaions?.statusCode === 200) {
    isLoaderCancelReservations.value = false;
    store.commit("setAlertConfig", { message: dataReservaions?.message, type: "positive" });
    reloadPage();
    return;

  };
  if(dataReservaions?.statusCode === 403){
    isLoaderCancelReservations.value = false;
    store.commit("setAlertConfig", { message: dataReservaions?.message, type: "warning" });
    return;

  };
  if(dataReservaions?.statusCode === 400){
    isLoaderCancelReservations.value = false;
    store.commit("setAlertConfig", { message: dataReservaions?.message, type: "negative" });
    return;

  };
};
const orderbyDate = (array) => {
  return array.sort((a, b) => {
    const dataA = new Date(a.dateReservation.split("-").reverse().join("-"));
    const dataB = new Date(b.dateReservation.split("-").reverse().join("-"));

    return dataA - dataB;
  });
};
const groupByDate = (array) => {
  return array.reduce((grupo, item) => {
    (grupo[item.dateReservation] = grupo[item.dateReservation] || []).push(
      item
    );

    return grupo;
  }, {});
};
const getReservations = async () => {
  let dataUser = getDataUser();
  let dataReservaions = await getReservation(dataUser?.pkUser, getDateToday());
  if((dataReservaions?.statusCode === 200) &
    (dataReservaions?.data.length === 0)) {
    isLoaderReservations.value = true;
    isMessage.value = dataReservaions.message;
    return;

  };
  if((dataReservaions?.statusCode === 200) &
    (dataReservaions?.data.length !== 0)) {
    dataCustomerReservation.push(...dataReservaions?.data);
    converterDataToJson(dataCustomerReservation);
    isLoaderReservations.value = true;
    return;

  };
  if(dataReservaions?.statusCode === 403){
    store.commit("setAlertConfig", { message: dataReservaions?.message, type: "warning" });
    isLoaderReservations.value = true;
    return;

  };
};
const verifyTimeBefore = (data) => {
  return !dateCompare(data[0].dateReservation, data[0].timeReservation, getDateToday(), getCurrentTime());

};
const converterDataToJson = (data) => {
  data.filter((elem) => {
    elem.services = JSON.parse(elem.services);
  });

};
const reloadPage = () => {
  setTimeout(() => {
    location.reload();

  }, 3000);

};
onMounted(async () => {
  isNotice.value = noticeList.length != 0 || false;
  await getReservations();

});
</script>
<template>
  <div id="reservations">
    <CardNotice
      class="full-width q-pa-md"
      v-if="isNotice"
      v-model:isNotice="isNotice"
      :noticeList="noticeList"
    />
    <h4 class="text-white q-my-lg">Lista de agendamentos!</h4>
    <div v-if="!isLoaderReservations"
      class="reservations-loader">
      <Loader class="row justify-center items-center" />
    </div>
    <div v-if="isLoaderReservations && !!isMessage"
      class="reservations-card-message">
      <CardMessage
        :message="isMessage"
        class="row justify-center items-center" />
    </div>
    <div v-else
      class="reservations-card-reservation">
      <CardReservation
        v-for="i in groupByDate(orderbyDate(dataCustomerReservation))"
        :key="i"
        :dataCustomerReservation="i"
        :isLoaderTime="isLoaderCancelReservations"
        :isDisabledBtn='verifyTimeBefore(i)'
        @cancelReservation="cancelReservation">
        <Loader loaderSize="1.2em" loaderColor="white" />  
      </CardReservation>
    </div>
    <CardAlertNotice v-if="store.getters.getAlertNotice.isAlertNotice" />
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#reservations {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 5rem);
  font-family: "Fredoka", sans-serif;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.05)),
    url("../../assets/background/background-wave.png") no-repeat fixed bottom;
  background-size: cover;
  position: relative;

  .reservations-loader,
  .reservations-card-message,
  .reservations-card-reservation{
    width: 100%;

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
}
@media only screen and (max-width: 481px) {
}
@media only screen and (max-width: 360px) {
}
</style>