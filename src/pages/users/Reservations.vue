<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { CardReservation, Loader, CardNotice, CardMessage } from "../../components";
import { getReservation, deleteReservation } from "../../services/api/api.reservation.js";
import { getDataUser } from "../../services/storage/settingSession.js";

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
  let dataReservaions = await deleteReservation(pkReservation);
  if(dataReservaions?.statusCode === 200) {
    isLoaderCancelReservations.value = false;
    store.commit("setAlertConfig", { message: dataReservaions.message, type: "positive" });
    reloadPage();
    return;

  };
  isLoaderCancelReservations.value = false;
  store.commit("setAlertConfig", { message: dataReservaions.message, type: "warning" });
  return;

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
  let dataReservaions = await getReservation(dataUser?.pkUser);
  if((dataReservaions?.statusCode === 200) &
    (dataReservaions?.data.length === 0)) {
    isLoaderReservations.value = true;
    isMessage.value = dataReservaions.message;
    //store.commit("setAlertConfig", { message: dataReservaions.message, type: "info" });
    return;

  };
  if((dataReservaions.statusCode === 200) &
    (dataReservaions?.data.length !== 0)) {
    dataCustomerReservation.push(...dataReservaions.data);
    converterDataToJson(dataCustomerReservation);
    isLoaderReservations.value = true;
    //store.commit("setAlertConfig", { message: dataReservaions.message, type: "positive" });
    return;

  };
  isLoaderReservations.value = true;
  //store.commit("setAlertConfig", { message: dataReservaions.message, type: "negative" });
  return;

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
  <div id="reservations" class="column items-center q-mt-sm">
    <CardNotice
      class="full-width q-pa-md"
      v-if="isNotice"
      v-model:isNotice="isNotice"
      :noticeList="noticeList"
    />
    <h4 class="text-white q-my-lg">Lista de agendamentos!</h4>
    <div v-if="!isLoaderReservations">
      <Loader class="row justify-center items-center" />
    </div>
    <div v-if="isLoaderReservations && !!isMessage">
      <CardMessage
        :message="isMessage"
        class="row justify-center items-center" />
    </div>
    <div v-else>
      <CardReservation
        v-for="i in groupByDate(orderbyDate(dataCustomerReservation))"
        :key="i"
        :dataCustomerReservation="i"
        :isLoaderTime="isLoaderCancelReservations"
        @cancelReservation="cancelReservation">
        <Loader loaderSize="1.2em" loaderColor="white" />  
      </CardReservation>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#reservations {
  div {
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