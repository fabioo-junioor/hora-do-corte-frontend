<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { createPurchasePlan } from "../../services/api/api.purchase.js";
import { getDateToday, getCurrentTime } from "../../utils/dataUtils.js";
import barbershop from "../../assets/imgsDefault/barbershop-ai.jpg";

const store = useStore();
const isParamsStore = ref(false);
const dataBuyPlan = reactive({
  pkUser: null,
  pkPlan: null,
  namePlan: "",
  details: [],
});

const checkoutVerify = () => {
  if (store.getters.getStateBuyPlan.pkPlan == null ||
    store.getters.getStateBuyPlan.pkUser == null){
    console.log("algo deu errado!");
    isParamsStore.value = false;
    return;

  }
  let { pkPlan, pkUser, details } = store.getters.getStateBuyPlan;
  dataBuyPlan.pkUser = pkUser;
  dataBuyPlan.pkPlan = pkPlan;
  dataBuyPlan.namePlan = details[0].name;
  dataBuyPlan.details.push(...details);
  isParamsStore.value = true;
  return;

};
const buyPlan = async () => {
  let dateToday = getDateToday();
  let timeToday = getCurrentTime();
  let dataResult = await createPurchasePlan(dataBuyPlan.pkUser, dataBuyPlan.pkPlan, dateToday, timeToday);
  if(dataResult.statusCode === 200){
    store.commit("setAlertConfig", { message: dataResult.message, type: "warning" });
    return;

  };
  if(dataResult.statusCode === 201){
    store.commit("setAlertConfig", { message: dataResult.message, type: "positive" });
    return;
    
  }
  store.commit("setAlertConfig", { message: dataResult.message, type: "negative" });
  return;

};
onMounted(() => {
  checkoutVerify();

});
</script>
<template>
  <div id="checkout-buy-plan">
    <div v-if="!isParamsStore">
      <div class="text-h4 text-white q-my-md">
        Algo deu errado!
        <q-separator dark color="white" />
      </div>
    </div>
    <div v-else class="checkout-buy-plan-card">
      <q-card dark flat class="my-card bg-brown-9">
        <q-card-section class="q-pa-none">
          <q-badge
            floating
            transparent
            v-if="dataBuyPlan.pkPlan === 3"
            label="-10%"
            class="badge-discount q-pa-sm text-subtitle1"
            color="red-10"
          />
          <q-img height="15rem" :src="barbershop">
            <div class="absolute-bottom text-h6 text-center">
              {{ dataBuyPlan.namePlan }}
            </div>
          </q-img>
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle2 q-my-md">
            Valor(R$): {{ dataBuyPlan.details[0]?.price }}
            <q-separator dark color="brown-4" />
          </div>
          <div class="text-subtitle2 q-my-md">
            Tempo: {{ dataBuyPlan.details[0]?.time }} dias
            <q-separator dark color="brown-4" />
          </div>
          <div class="text-subtitle2 q-my-md">
            Descrição: {{ dataBuyPlan.details[0]?.about }}
            <q-separator dark color="brown-4" />
          </div>
          <div class="text-subtitle2 wrap q-my-md">
            Beneficios:
            <q-badge
              v-for="i in dataBuyPlan.details[0]?.benefits"
              :key="i"
              class="q-ma-xs q-pa-xs text-white text-subtitle2"
              color="brown-5"
              :label="i"
            />
          </div>
        </q-card-section>

        <q-separator dark color="white" />

        <q-card-actions class="row justify-center">
          <q-btn
            push
            style="height: 3rem"
            @click="buyPlan"
            class="full-width q-my-xs"
            label="Adquirir plano"
            color="brown-5"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#checkout-buy-plan {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 5rem);
  font-family: "Fredoka", sans-serif;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.05)),
    url("../../assets/background/background-wave.png") no-repeat fixed bottom;
  background-size: cover;

  .checkout-buy-plan-card {
    min-height: calc(100vh - 5rem);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .q-card {
      width: 30%;
      box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.3) !important;
      z-index: 0;

      .badge-discount {
        top: -1rem;
        right: -1rem;
        z-index: 1;

      }
    }
  }
}
/* Breakpoints - response*/
@media only screen and (max-width: 1560px) {
}
@media only screen and (max-width: 1200px) {
}
@media only screen and (max-width: 992px) {
  #checkout-buy-plan {
    .checkout-buy-plan-card {
      .q-card {
        width: 40%;

      }
    }
  }
}
@media only screen and (max-width: 720px) {
  #checkout-buy-plan {
    .checkout-buy-plan-card {
      .q-card {
        width: 60%;

      }
    }
  }
}
@media only screen and (max-width: 481px) {
  #checkout-buy-plan {
    .checkout-buy-plan-card {
      .q-card {
        width: 95%;
        
      }
    }
  }
}
@media only screen and (max-width: 360px) {
}
</style>