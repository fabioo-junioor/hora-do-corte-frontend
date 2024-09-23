<script setup>
import { reactive } from 'vue';
import { CardPricing } from '../components';

const pricingPlans = reactive([
    { 
        id: 1, 
        name: 'Prata', 
        about: 'teste', 
        price: 25, 
        time: 30,
        benefits: ['30 dias de uso', 'Suporte']
    },
    { 
        id: 2, 
        name: 'Ouro', 
        about: 'teste', 
        price: 150, 
        time: 180,
        benefits: ['180 dias de uso', 'Suporte']
    }
]);
</script>
<template>
  <div id="home">
    <div class="home-about q-pt-xl">
      <h1 class="q-ma-xl">Hora do corte</h1>
      <p class="q-mb-xl">
        Plataforma de agendamentos online para barbearias.
        Simplifique o atendimento e organize os horários dos seus clientes de forma automática!
      </p>
      
      <q-img 
        src="../assets/icon/barbearia.svg"
        height="9rem" width="9rem" 
        class="home-icon-barbearia" />
      <q-img 
        src="../assets/icon/navalha.svg"
        height="9rem" width="9rem" 
        class="home-icon-navalha" />
      <q-img
        src="../assets/icon/navalha2.svg"
        height="9rem" width="9rem" 
        class="home-icon-navalha2" />
      <q-img
        src="../assets/icon/maquina-cortar-cabelo.svg"
        height="9rem" width="9rem" 
        class="home-icon-maquina-cortar-cabelo" />
      
      <q-btn
        push
        class="q-mt-xl"
        size="xl"
        color="brown-8"
        text-color="grey-3"
        label="Resgistre-se gratuitamente"
        icon-right="trending_flat" />
    </div>
    <div class="home-pricing q-py-xl">
        <CardPricing
            v-for=" i in pricingPlans" :key="i.id"
            :dataPricing='i' />
    </div>
    <div class=""></div>
    <div class=""></div>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#home {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Fredoka", sans-serif;

  .home-about {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    color: $whiteColorPrimary;
    background-color: transparent;

    h1{
        font-size: 5rem;
        z-index: 2;

    }
    p{
        text-align: center;
        font-size: 1.3rem;
        color: $grey-3;
        z-index: 2;

    }
    .q-btn {
      width: 100%;

    }
    .home-icon-barbearia{
      position: absolute;
      bottom: 15%;
      left: 0%;
      opacity: .5;

    }
    .home-icon-navalha{
      position: absolute;
      top: 15%;
      right: 5%;
      opacity: .5;

    }
    .home-icon-navalha2{
      position: absolute;
      top: 10%;
      left: 20%;
      opacity: .5;

    }
    .home-icon-maquina-cortar-cabelo{
      position: absolute;
      bottom: 0;
      right: 10%;
      opacity: .5;

    }
  }
  .home-pricing{
    display: flex;
    gap: 1rem;

  }
}
</style>