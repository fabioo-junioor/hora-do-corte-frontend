<script setup>
import { reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { CardPricing } from '../components';

const router = useRouter();
const pricingPlans = reactive([
    { 
        id: 1, 
        name: 'Prata', 
        about: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 
        price: 25, 
        time: 30,
        benefits: ['30 dias de uso', 'Suporte diário']
    },
    { 
        id: 2, 
        name: 'Ouro', 
        about: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 
        price: 135, 
        time: 180,
        benefits: ['180 dias de uso', 'Suporte diário']
    }
]);
const buyPlan = (data) => {
  console.log('buy ', data);

};
const register = () => {
  router.push({ path: '/cadUser' });

};
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
        src="../assets/icon/navalha.svg"
        height="9rem" width="9rem" 
        class="home-icon-navalha" />
      <q-img
        src="../assets/icon/maquina-cortar-cabelo.svg"
        height="9rem" width="9rem" 
        class="home-icon-maquina-cortar-cabelo" />
      
      <q-btn
        push
        @click="register"
        class="q-my-xl"
        size="xl"
        color="brown-8"
        text-color="grey-3"
        label="Resgistre-se gratuitamente"
        icon-right="trending_flat" />
    </div>
    <div class="home-works q-py-xl q-my-xl">
      <h3 class="q-ma-none">Como funciona?</h3>
      <div class="home-work-profesional">
        <q-img
          src="https://www.cbvl.esp.br/upload/post/default.jpg"
          class="rounded-borders"
          height="auto"
          width="50%" />
        <p class="q-pa-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </div>
      <div class="home-work-services">
        <q-img
          src="https://www.cbvl.esp.br/upload/post/default.jpg"
          class="rounded-borders"
          height="auto"
          width="50%" />
        <p class="q-pa-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
      </div>
    </div>
    <div class="home-pricings q-py-xl q-my-xl">
        <CardPricing
            v-for=" i in pricingPlans" :key="i.id"
            class="home-pricing q-my-xl"
            :dataPricing='i'
            @buyPlan='buyPlan' />
        
        <q-img 
          src="../assets/icon/navalha2.svg"
          height="9rem" width="9rem" 
          class="home-icon-navalha2" />
        <q-img
          src="../assets/icon/barbearia.svg"
          height="9rem" width="9rem" 
          class="home-icon-barbearia" />
        <q-img
          src="../assets/icon/escova-barbear.svg"
          height="9rem" width="9rem" 
          class="home-icon-escova-barbear" />
    </div>
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
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
      url("../assets/background/background-wave.png") no-repeat
        fixed center;
  background-size: cover;

  .home-about {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    color: $whiteColorPrimary;

    h1{
        font-size: 5rem;
        font-weight: 500;
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
    .home-icon-navalha{
      position: absolute;
      top: 15%;
      left: 5%;
      opacity: .4;

    }
    .home-icon-maquina-cortar-cabelo{
      position: absolute;
      bottom: 10%;
      right: 10%;
      opacity: .5;

    }
  }
  .home-works{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    width: 80%;

    h3{
      color: $grey-2;
      font-weight: 500;

    }
    .home-work-profesional{
      display: flex;
      justify-content: center;
      align-items: center;

      p{
        width: 50%;
        font-size: 1rem;
        color: $grey-2;

      }
    }
    .home-work-services{
      display: flex;
      flex-direction: row-reverse;
      justify-content: center;
      align-items: center;

      p{
        width: 50%;
        font-size: 1rem;
        color: $grey-2;

      }
    }
  }
  .home-pricings{
    position: relative;
    display: flex;
    justify-content: center;
    gap: 1rem;
    width: 80%;

    .home-pricing{
      z-index: 2;

    }
    .home-icon-navalha2{
      position: absolute;
      top: 10%;
      left: 10%;
      opacity: .5;

    }
    .home-icon-barbearia{
      position: absolute;
      bottom: 0;
      left: 40%;
      opacity: .5;

    }
    .home-icon-escova-barbear{
      position: absolute;
      bottom: 5%;
      right: 5%;
      opacity: .5;

    }
  }
}
</style>