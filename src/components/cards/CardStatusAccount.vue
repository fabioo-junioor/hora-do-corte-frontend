<script setup>
const props = defineProps(['purchaseDate', 'purchaseTime', 'namePlan', 'pricePlan', 'purchaseValidity', 'closeToExpiration']);

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
            <div class="text-subtitle1 q-my-xs">
                Nome do plano: {{ props.namePlan }}
            </div>
            <div class="text-subtitle1 q-my-xs">
                Valor: R${{ props.pricePlan }}
            </div>
            <div class="text-subtitle1 q-my-xs">
                Data da validade:
                <q-badge transparent
                  v-if="props.purchaseValidity !== ''"
                  class="text-subtitle2 text-white"
                  :color="!props.closeToExpiration ? 'green-10' : 'red-10'"
                  :label="props.purchaseValidity" />
            </div>
        </q-card-section>
        <q-card-section class="card-status-account-icon q-pa-none">
          <i class='bx bxs-user-account' />
        </q-card-section>
    </q-card>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#card-status-account{
  height: 100%;

  .my-card{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: transparent;
    border: 1px solid #EEEEEEA6;
    box-shadow: 2px 2px 0px 0px #EEEEEE;
    border-radius: 5px;

    .text-h6{
      text-align: center;
      text-decoration: underline;

    }
    .card-status-account-infos{
      width: 100%;
      display: flex;
      flex-direction: column;

    }
    .card-status-account-icon{
      display: flex;
      justify-content: flex-end;
      
      i{
        font-size: 4rem;
        color: #EEEEEEA6;
  
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