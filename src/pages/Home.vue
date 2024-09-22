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
])
</script>
<template>
  <div id="home">
    <div class="home-about q-py-xl">
      <h1 class="q-ma-none">Hora do corte</h1>
      <p class="q-my-xl">
        Plataforma de agendamentos online para barbearias.
        Simplifique o atendimento e organize os horários dos seus clientes de forma automática!
      </p>
      <q-btn
        push
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
  min-height: calc(100vh - 4rem);
  font-family: "Fredoka", sans-serif;

  .home-about {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    color: $whiteColorPrimary;

    h1{
        font-size: 5rem;

    }
    p{
        text-align: center;
        font-size: 1.3rem;
        color: $grey-3;

    }
    .q-btn {
      width: 100%;

    }
  }
  .home-pricing{
    display: flex;
    gap: 1rem;

  }
}
</style>