<script setup>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { CardPricing, Loader } from "../components";
import { getDataUser } from "../services/storage/settingSession.js";

const router = useRouter();
const store = useStore();
const pricingPlans = reactive([
  {
    pk: 1,
    name: "Free",
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    price: 0,
    time: 30,
    benefits: ["30 dias de uso grátis", "Suporte diário"],
  },
  {
    pk: 2,
    name: "Basic",
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    price: 25,
    time: 30,
    benefits: ["30 dias de uso", "Suporte diário"],
  },
  {
    pk: 3,
    name: "Pró",
    about:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    price: 135,
    time: 180,
    benefits: ["180 dias de uso", "Suporte diário"],
  },
]);
const getDetailsPlan = (pk) => {
  return pricingPlans.filter((elem) => elem.pk === pk);

};
const buyPlan = (data) => {
  let dataUser = getDataUser();
  if (!dataUser) {
    store.commit("setAlertConfig", {
      message: "Primeiramente efetue o login ou cadastre-se!",
      type: "warning",
    });
    return;

  };
  store.commit("setStateBuyPlan", {
    pkPlan: data,
    pkUser: dataUser.pkUser,
    details: [...getDetailsPlan(data)],
  });
  router.push({ path: "/checkoutBuyPlan" });
  return;

};
const register = () => {
  router.push({ path: "/cadUser" });
  return;

};
</script>
<template>
  <div id="home">
    <div class="home-about q-pt-xl">
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
        class="home-icon-navalha"
      />
      <q-img
        src="../assets/icon/maquina-cortar-cabelo.svg"
        height="9rem"
        width="9rem"
        class="home-icon-maquina-cortar-cabelo"
      />

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
      <div class="home-work-profesional">
        <q-img
          src="https://www.cbvl.esp.br/upload/post/default.jpg"
          class="rounded-borders"
          height="auto"
          width="50%"
        />
        <p class="q-pa-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
      <div class="home-work-services">
        <q-img
          src="https://www.cbvl.esp.br/upload/post/default.jpg"
          class="rounded-borders"
          height="auto"
          width="50%"
        />
        <p class="q-pa-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
    </div>
    <div class="home-pricings row q-py-xl q-my-xl">
      <CardPricing
        v-for="i in pricingPlans"
        :key="i.pk"
        class="home-pricing"
        :dataPricing="i"
        @buyPlan="buyPlan"
      />

      <q-img
        src="../assets/icon/navalha2.svg"
        height="9rem"
        width="9rem"
        class="home-icon-navalha2"
      />
      <q-img
        src="../assets/icon/barbearia.svg"
        height="9rem"
        width="9rem"
        class="home-icon-barbearia"
      />
      <q-img
        src="../assets/icon/escova-barbear.svg"
        height="9rem"
        width="9rem"
        class="home-icon-escova-barbear"
      />
    </div>
    <div class="home-footer row full-width q-pa-md q-mt-xl">
      <div class="col column justify-end">
        <div class="col row items-end">
          <a href="https://www.instagram.com/horadocorte.real/" target="_blank">
            <i class="bx bxl-instagram" />
          </a>
        </div>
        <div class="col text-subtitle1 row items-end">
          Contato: contato@gmail.com
        </div>
        <div class="col text-subtitle2 row items-end">
          Hora do Corte, 2024. All Rights Reserved.
        </div>
      </div>
      <div class="col row justify-end">
        <q-img
          height="10rem"
          width="10rem"
          src="../assets/logo/logo.png"
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
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    color: $whiteColorPrimary;

    h1 {
      font-size: 5rem;
      font-weight: 500;
      z-index: 2;

    }
    p {
      text-align: center;
      font-size: 1.3rem;
      color: $grey-3;
      z-index: 2;

    }
    .q-btn {
      width: 100%;

    }
    .home-icon-navalha {
      position: absolute;
      top: 15%;
      left: 5%;
      opacity: 0.4;

    }
    .home-icon-maquina-cortar-cabelo {
      position: absolute;
      bottom: 10%;
      right: 10%;
      opacity: 0.5;

    }
  }
  .home-works {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    width: 80%;

    h3 {
      color: $grey-2;
      font-weight: 500;

    }
    .home-work-profesional {
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        width: 50%;
        font-size: 1rem;
        color: $grey-2;

      }
    }
    .home-work-services {
      display: flex;
      flex-direction: row-reverse;
      justify-content: center;
      align-items: center;

      p {
        width: 50%;
        font-size: 1rem;
        color: $grey-2;

      }
    }
  }
  .home-pricings {
    position: relative;
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    gap: 0.5rem;
    width: 80%;

    .home-pricing {
      z-index: 2;

    }
    .home-icon-navalha2 {
      position: absolute;
      top: 10%;
      left: 10%;
      opacity: 0.5;

    }
    .home-icon-barbearia {
      position: absolute;
      bottom: 0;
      left: 40%;
      opacity: 0.5;

    }
    .home-icon-escova-barbear {
      position: absolute;
      bottom: 5%;
      right: 5%;
      opacity: 0.5;

    }
  }
  .home-footer {
    background-color: $darkColorSecondary;
    border-top: 2px solid $brown-8;
    box-shadow: 0px -1px 3px 1px $brown-7;

    i {
      font-size: 2.5rem;
      color: $brown-10;

      &:hover {
        color: $brown-8;

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
    .home-works {
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
      .home-work-profesional {
        flex-direction: column-reverse;

        p {
          width: 100%;

        }
      }
      .home-work-services {
        flex-direction: column-reverse;

        p {
          width: 100%;

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
        font-size: 3rem;

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