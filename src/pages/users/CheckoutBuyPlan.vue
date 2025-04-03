<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { Loader, CardAlertNotice } from '../../components';
import { createPurchasePlan } from "../../services/api/api.purchase.js";
import { getDateToday, getCurrentTime } from "../../utils/dataUtils.js";
import qrcodeplan2 from "../../assets/qrcodes/qrcode-pix-hdcpl2.png";
import qrcodeplan3 from "../../assets/qrcodes/qrcode-pix-hdcpl3.png";
import imgsDefault from '../../assets/imgsDefault/barbershop-ai.jpg'

const store = useStore();
const isParamsStore = ref(false);
const isLoaderBuyPlan = ref(false);
const dataCodeSelected = ref('');
const dataBuyPlan = reactive({
  pkUser: null,
  pkPlan: null,
  namePlan: "",
  details: [],
});

const checkoutVerify = () => {
  if(store.getters.getStateBuyPlan.pkPlan == null ||
    store.getters.getStateBuyPlan.pkUser == null){
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
  isLoaderBuyPlan.value = true;
  let dateToday = getDateToday();
  let timeToday = getCurrentTime();
  let dataResult = await createPurchasePlan(dataBuyPlan.pkUser, dataBuyPlan.pkPlan, dateToday, timeToday);
  if(dataResult?.statusCode === 201){
    isLoaderBuyPlan.value = false;
    store.commit("setAlertConfig", { message: dataResult?.message, type: "positive" });
    return;
    
  };
  if(dataResult?.statusCode === 200){
    isLoaderBuyPlan.value = false;
    store.commit("setAlertConfig", { message: dataResult?.message, type: "warning" });
    return;

  };
  if(dataResult?.statusCode === 403){
    isLoaderBuyPlan.value = false;
    store.commit("setAlertConfig", { message: dataResult?.message, type: "warning" });
    return;

  };
};
const verifyQrcode = (pkPlan) => {
  if(pkPlan === 1){
    return imgsDefault;

  };
  if(pkPlan === 2){
    return qrcodeplan2;

  };
  if(pkPlan === 3){
    return qrcodeplan3;

  };
};
const verifyCode = () => {
  if(dataBuyPlan.pkPlan === 1){
    dataCodeSelected.value = '';
    return;

  };
  if(dataBuyPlan.pkPlan === 2){
    dataCodeSelected.value = '00020126580014BR.GOV.BCB.PIX0136ab39bfb4-d4d4-4ac9-be64-4c8d67da1787520400005303986540525.005802BR5901N6001C62100506HDCPL26304EA23';
    return;

  };
  if(dataBuyPlan.pkPlan === 3){
    dataCodeSelected.value = '00020126580014BR.GOV.BCB.PIX0136ab39bfb4-d4d4-4ac9-be64-4c8d67da17875204000053039865406135.005802BR5901N6001C62100506HDCPL363040038';
    return;

  };
};
onMounted(() => {
  checkoutVerify();
  verifyCode();

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
    <div v-else class="checkout-buy-plan-card q-py-sm">
      <q-card dark flat class="my-card bg-brown-9">
        <q-card-section horizontal>
          <div class="checkout-buy-plan-card-qrcode">
            <q-badge
              floating
              transparent
              v-if="dataBuyPlan.pkPlan === 3"
              label="-10%"
              class="badge-discount q-pa-sm text-subtitle1"
              color="red-10" />
            <q-img fit="contain" :src="verifyQrcode(dataBuyPlan.pkPlan)" />
            <q-input
              dark
              outlined
              v-if="dataBuyPlan.pkPlan !== 1"
              v-model="dataCodeSelected"
              class="q-my-sm q-mx-xs"
              label="Código para pagamento"
              label-color="brown-2"
              bg-color="brown-7" />
          </div>
          <div class="checkout-buy-plan-card-details q-pa-xs">
            <div class="text-subtitle2 q-my-md">
              Valor: R${{ dataBuyPlan.details[0]?.price }}
              <q-separator dark color="brown-4" />
            </div>
            <div class="text-subtitle2 q-my-md">
              Tempo: {{ dataBuyPlan.details[0]?.time }} dias
              <q-separator dark color="brown-4" />
            </div>
            <div class="text-subtitle2 q-my-md">
              Descrição: {{ dataBuyPlan.details[0]?.description }}
              <q-separator dark color="brown-4" />
            </div>
            <div class="text-subtitle2 wrap q-my-md">
              Beneficios:
              <q-badge
                v-for="i in JSON.parse(dataBuyPlan.details[0]?.benefits)"
                :key="i"
                class="q-ma-xs q-pa-xs text-white text-subtitle2"
                color="brown-5"
                :label="i" />
            </div>
          </div>
        </q-card-section>

        <q-separator dark color="white" />

        <q-card-actions class="row justify-center">
          <q-btn
            push
            v-if="dataBuyPlan.pkPlan == 1"
            style="height: 3rem"
            :disable="isLoaderBuyPlan"
            @click="buyPlan"
            class="full-width q-my-xs"
            :label="!isLoaderBuyPlan ? 'Adquirir plano' : ''"
            color="brown-5">
            <Loader v-if="isLoaderBuyPlan" loaderSize="1.2em" loaderColor="white" />
          </q-btn>
          <div v-else class="text-subtitle1 text-center q-my-sm">
            Observação: Adicionar na descrição do pagamento
            o MESMO EMAIL de cadastro que foi utilizada na plataforma!
          </div>
        </q-card-actions>
      </q-card>
    </div>
    <CardAlertNotice v-if="store.getters.getAlertNotice.isAlertNotice" />
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
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .q-card {
      width: 60%;
      box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, .3) !important;
      z-index: 0;

      .checkout-buy-plan-card-qrcode{
        width: 40%;

      }
      .checkout-buy-plan-card-details{
        width: 60%;

      }

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
  #checkout-buy-plan {
    .checkout-buy-plan-card {
      .q-card {
        width: 70%;

      }
    }
  }
}
@media only screen and (max-width: 992px) {
  #checkout-buy-plan {
    .checkout-buy-plan-card {
      .q-card {
        width: 80%;

      }
    }
  }
}
@media only screen and (max-width: 720px) {
  #checkout-buy-plan {
    .checkout-buy-plan-card {
      .q-card {
        width: 50%;

        .q-card__section{
          flex-direction: column;
          align-items: center;

          .checkout-buy-plan-card-qrcode{
            width: 100%;

          }
          .checkout-buy-plan-card-details{
            width: 100%;

          }
        }
      }
    }
  }
}
@media only screen and (max-width: 481px) {
  #checkout-buy-plan {
    .checkout-buy-plan-card {
      .q-card {
        width: 70%;

      }
    }
  }
}
@media only screen and (max-width: 360px) {
}
</style>