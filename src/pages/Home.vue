<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { CardPricing, Loader, SkeletonCardPricing } from "../components";
import { getDataUser } from "../services/storage/settingSession.js";
import { getAllPlans } from '../services/api/api.plan.js';

const router = useRouter();
const store = useStore();
const isLoaderCardPricing = ref(false);
const contactHDC = reactive({
  email: '',
  instagram: ''

});
const pricingPlans = reactive([]);
const getDetailsPlan = (pkPlan) => {
  return pricingPlans.filter((elem) => elem.pkPlan === pkPlan);

};
const buyPlan = (data) => {
  let dataUser = getDataUser();
  if (!dataUser) {
    store.commit("setAlertConfig", { message: "Primeiramente efetue o login ou cadastre-se!", type: "warning" });
    return;

  };
  store.commit("setStateBuyPlan", { pkPlan: data, pkUser: dataUser.pkUser, details: [...getDetailsPlan(data)] });
  router.push({ path: "/checkoutBuyPlan" });
  return;

};
const getPlans = async () => {
  let allPlans = await getAllPlans();
  if(allPlans?.statusCode === 200 && allPlans?.data.length !== 0){
    pricingPlans.push(...allPlans?.data);
    isLoaderCardPricing.value = true;
    return;

  };
};
const register = () => {
  router.push({ path: "/cadUser" });
  return;

};
onMounted(async () => {
  await getPlans();
  contactHDC.email = import.meta.env.VITE_CONTACT_EMAIL || '--';
  contactHDC.instagram = import.meta.env.VITE_CONTACT_INSTAGRAM || '';

});
</script>
<template>
  <div id="home">
    <div class="home-about q-py-xl">
      <h1 class="q-ma-xl">Hora do corte</h1>
      <p class="q-mb-xl">
        Plataforma de agendamentos online para barbearias. Simplifique o
        atendimento e organize os horários dos seus clientes de forma
        automática!
      </p>

      <q-img
        src="../assets/icon/navalha.svg"
        height="9rem"
        width="9rem"
        class="home-icon-navalha" />
      <q-img
        src="../assets/icon/barbearia.svg"
        height="9rem"
        width="9rem"
        class="home-icon-barbearia" />

      <q-btn
        push
        @click="register"
        class="q-my-xl"
        size="xl"
        color="brown-8"
        text-color="grey-3"
        label="Resgistre-se gratuitamente"
        icon-right="trending_flat"
      />
    </div>
    <div class="home-works q-py-xl q-my-xl">
      <h3 class="q-ma-none">Como funciona?</h3>
      <div class="home-work-services bg-brown-6 q-pa-md">
        <q-img
          src="../assets/screen/screen_1.png"
          class="rounded-borders"
          height="auto"
          width="70%" />
        <p class="q-ml-md text-justify">
          Escolha o profissional de sua preferência. <br>
          Cada profissional possui seus próprios serviços.
        </p>
      </div>
      <div class="home-work-services bg-brown-6 q-pa-md">
        <p class="q-mr-md text-justify">
          Escolha um ou mais serviços. <br>
          Os serviços estão relacionados diretamente com o profissional definido anteriormente. <br>
          Cada serviços possui seu valor e duração especifica.
        </p>
        <q-img
          src="../assets/screen/screen_2.png"
          class="rounded-borders"
          height="auto"
          width="70%" />
      </div>
      <div class="home-work-services bg-brown-6 q-pa-md">
        <q-img
          src="../assets/screen/screen_3.png"
          class="rounded-borders"
          height="auto"
          width="70%" />
        <p class="q-ml-md text-justify">
          Escolha o dia e horário de suas prefêrencia. <br>
          Os dias e horários podem alterar dependendo de cada profissional. <br>
          Os dias pré definidos aparecem em destaque. <br>
          Horários em vermelho já foram reservados.
        </p>
      </div>
      <div class="home-work-services bg-brown-6 q-pa-md">
        <p class="q-mr-md text-justify">
          Preencher alguns dados pessoais para realzar a reserva. <br>
          Nome e telefone são obrigatórios. <br>
          Ao informar o email o cliente receberá uma confirmação.
        </p>
        <q-img
          src="../assets/screen/screen_4.png"
          class="rounded-borders"
          height="auto"
          width="70%" />
      </div>
    </div>
    <div class="home-pricings row q-py-xl q-my-xl">
      <CardPricing
        v-show="isLoaderCardPricing"
        v-for="i in pricingPlans"
        :key="i.pk"
        class="home-pricing"
        :dataPricing="i"
        @buyPlan="buyPlan" />
        <SkeletonCardPricing
          v-show="!isLoaderCardPricing"
          v-for="i in 3" :key="i" />
    </div>
    <div class="home-footer row full-width q-pa-md q-mt-xl">
      <div class="col column justify-end">
        <div class="col row items-end">
          <a :href="`https://www.instagram.com/${contactHDC.instagram}/`" target="_blank">
            <i class="bx bxl-instagram" />
          </a>
        </div>
        <div class="col text-subtitle1 row items-end">
          Contato: {{ contactHDC.email }}
        </div>
        <div class="col text-subtitle2 row items-end">
          Hora do Corte, 2025. All Rights Reserved.
        </div>
      </div>
      <div class="col row justify-end">
        <q-img
          height="10rem"
          width="10rem"
          src="../assets/logo/logo_transparent.png"
          fit="contain"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#home {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 5rem);
  font-family: "Fredoka", sans-serif;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
    url("../assets/background/background-wave.png") no-repeat fixed center;
  background-size: cover;
  
  .home-about {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
    padding: 3rem 2rem;
    color: white;
    text-align: center;
    position: relative;
    z-index: 2;

    h1 {
      font-size: 4.5rem;
      font-weight: 600;
      margin-bottom: 1rem;

    }
    p {
      font-size: 1.3rem;
      color: $grey-3;
      margin-bottom: 2rem;

    }
    .q-btn {
      width: 100%;
      border-radius: 12px;
      font-weight: bold;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

    }
    .home-icon-navalha {
      position: absolute;
      top: 15%;
      left: 5%;
      opacity: .3;

    }
    .home-icon-barbearia {
      position: absolute;
      bottom: 10%;
      right: 10%;
      opacity: .3;

    }
  }
  .home-works {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 95%;
    padding: 3rem 0;
    gap: 2rem;

    h3 {
      font-size: 2.5rem;
      color: $brown-10;
      font-weight: 600;

    }
    .home-work-services {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      width: 100%;
      gap: 1.5rem;


      p {
        flex: 1;
        font-size: 1.2rem;
        color: $grey-1;
        line-height: 1.6;


      }
      .q-img{
        flex: 1;
        border-radius: 10px;

      }
    }
  }
  .home-pricings {
    position: relative;
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    gap: 1rem;
    width: 80%;

  }
  .home-footer {
    width: 100%;
    background-color: $darkColorSecondary;
    border-top: 2px solid $brown-8;
    box-shadow: 0 -2px 6px rgba(0, 0, 0, .2);
    padding: 1rem 2rem;

    .col {
      color: $grey-3;

    }

    i {
      font-size: 2rem;
      color: $brown-8;
      transition: color .3s ease;

      &:hover {
        color: $brown-5;

      }
    }
  }
}
/* Breakpoints - response*/
@media only screen and (max-width: 1560px) {
}
@media only screen and (max-width: 1200px) {
  #home {
    .home-about {
      width: 70%;

    }
    .home-pricings {
      width: 90%;
      flex-wrap: wrap;

    }
  }
}
@media only screen and (max-width: 992px) {
  #home {
    .home-about {
      width: 99%;

    }
    .home-works {
      width: 99%;

    }
    .home-pricings {
      width: 99%;

    }
  }
}
@media only screen and (max-width: 720px) {
  #home {
    .home-about {
      h1 {
        font-size: 3.5rem;

      }
      p {
        font-size: 1.1rem;

      }
      .q-btn {
        font-size: 1.1rem !important;

      }
    }
    .home-works {
      display: flex;
      flex-direction: column;
      align-items: center;

      h3 {
        font-size: 3rem;

      }
      .home-work-services {
        flex-direction: column-reverse;
        padding: .5rem;

        .q-img{
          width: 100% !important;

        }
        p {
          width: 100%;
          text-align: center;
          font-size: 1rem;
          margin: .5rem;

        }
      }
    }
    .home-pricings {
      width: 99%;

    }
  }
}
@media only screen and (max-width: 481px) {
  #home {
    .home-about {
      h1 {
        font-size: 2.5rem;

      }
      p {
        font-size: 1rem;

      }
      .q-btn {
        font-size: 1rem !important;
        height: 5rem;

      }
    }
    .home-works {
      h3 {
        font-size: 2.5rem;
        
      }
    }
  }
}
@media only screen and (max-width: 360px) {
}
</style>