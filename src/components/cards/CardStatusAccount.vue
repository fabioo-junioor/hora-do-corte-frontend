<script setup>
const props = defineProps(['purchaseDate', 'purchaseTime', 'namePlan', 'pricePlan', 'purchaseValidity']);

</script>
<template>
  <div id="card-status-account">
    <q-card dark class="my-card q-pa-xs">
        <div class="text-h6 q-pa-md">
            Detalhes da conta!
        </div>
        <q-card-section class="card-status-account-infos q-pa-md">
            <div class="text-subtitle1 q-my-xs">
                Data da compra: {{ props.purchaseDate }} / {{props.purchaseTime}}
            </div>
            <q-separator vertical color="white" />
            <div class="text-subtitle1 q-my-xs">
                Nome do plano: {{ props.namePlan }}
            </div>
            <q-separator vertical color="white" />
            <div class="text-subtitle1 q-my-xs">
                Valor: R${{ props.pricePlan }}
            </div>
            <q-separator vertical color="white" />
            <div class="text-subtitle1 q-my-xs">
                Data da validade: {{ props.purchaseValidity }}
            </div>
        </q-card-section>
    </q-card>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#card-status-account{
  .my-card{
    background-color: transparent;
    border: 1px solid rgba(0, 0, 0, .3);
    box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, .8);
    border-radius: 5px;

    .text-h6{
      text-align: center;
      text-decoration: underline;

    }
    .card-status-account-infos{
      width: 100%;
      display: flex;
      justify-content: space-evenly;

    }
  }
}

/* Breakpoints - response*/
@media only screen and (max-width: 1560px) {
}
@media only screen and (max-width: 1200px) {
}
@media only screen and (max-width: 992px) {
  #card-status-account{
    .my-card{
      .text-h6{
        text-align: left;

      }
      .card-status-account-infos{
        flex-direction: column;


    }
  }
}
}
@media only screen and (max-width: 720px) {
}
@media only screen and (max-width: 481px) {
}
@media only screen and (max-width: 360px) {
}
</style>