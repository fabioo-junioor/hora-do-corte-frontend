<script setup>
import { onBeforeMount, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { AlertUser } from "../components";
import { authUser } from '../services/api/api.user.js';
import { getDataUser, deleteDataUser } from "../services/storage/settingSession.js";

const store = useStore();
const router = useRouter();
const isUserLogin = ref(false);

const checkLoginUser = async () => {
  let validAuth = await authUser();
  let dataUser = getDataUser();
  if(!dataUser){
    store.commit('setStateUser', { login: false });
    isUserLogin.value = false;
    return;

  }
  if(validAuth?.statusCode === 200){
      store.commit('setStateUser', { login: true });
      store.commit('setAlertNotice', { isAlertNotice: !!dataUser?.isBlocked || false, message: 'Serviços indisponiveis no momento!' });
      isUserLogin.value = true;
      console.log(validAuth?.statusCode);
      return;
      
  };
  if(validAuth?.statusCode === 403){
    deleteDataUser();
    store.commit('setStateUser', { login: false });
    isUserLogin.value = false;
    location.reload();
    console.log(validAuth?.statusCode);
    return;

  };
  if(validAuth?.statusCode === 401){
    store.commit('setStateUser', { login: false });
    isUserLogin.value = false;
    console.log(validAuth?.statusCode);
    return;

  };  
};
const getLogin = () => {
  router.push({ path: "/loginUser" });
  return;

};
const getLogout = () => {
  deleteDataUser();
  //router.push({ path: "/" });
  store.commit("setAlertConfig", { message: "Saindo!", type: "positive" });
  //store.commit('setStateUser', { login: false });
  reloadPage();
  return;

};
const getEditUser = () => {
  router.push({ path: "/editUser" });
  return;

};
const getEditPassword = () => {
  router.push({ path: "/editPasswordUser" });
  return;

};
const getEditProfessional = () => {
  router.push({ path: "/editProfessional" });
  return;

};
const getReservations = () => {
  router.push({ path: "/reservations" });
  return;

};
const verifyResponseNavbar = () => {
  const navbar = document.querySelector(".navbar-area-user");
  if(navbar){
    navbar.classList.toggle("active");

  };
};
const reloadPage = () => {
  setTimeout(() => {
    location.reload();
    
  }, 3000);

};
watch(() => store.getters.getStateUser.isUserLogin, (val) => {
    isUserLogin.value = val;

  }
);
onBeforeMount(async () => {
  await checkLoginUser();
  
});

</script>
<template>
  <div id="navbar">
    <q-layout view="hHh lpR fFf">
      <q-header elevated class="q-px-xs">
        <q-toolbar class="row justify-between">
          <div class="navbar-logo col-1">
            <router-link to="/">
              <q-toolbar-title>
                <q-img
                  style="border-radius: 5px"
                  src="../assets/logo/logo.png"
                  height="4rem"
                  width="4rem"
                />
              </q-toolbar-title>
            </router-link>
          </div>
          <q-btn flat dense
            class="navbar-menu-toggle"
            @click="verifyResponseNavbar()">
            <q-icon name="menu" size="md" color="brown-10" />
          </q-btn>
          <div class="col-11 navbar-area-user">
            <div
              v-if="!isUserLogin"
              class="navbar-area-user-login row justify-end">
              <q-btn
                push
                stack
                @click="getLogin"
                color="brown-10"
                icon="login"
                label="Área do usuário"
              />
            </div>
            <div v-else class="navbar-area-user-notLogin row">
              <div class="col-11 row justify-center">
                <q-btn
                  push
                  stack
                  @click="getReservations"
                  color="brown-8"
                  icon="event_available"
                  label="Agendamentos"/>
                <q-btn-dropdown
                  push
                  stack
                  color="brown-8"
                  icon="settings"
                  label="Configuração">
                  <q-list class="bg-brown-5">
                    <q-item clickable v-close-popup @click="getEditUser">
                      <q-item-section avatar>
                        <q-icon
                          name="settings_applications"
                          size="md"
                          color="white"
                        />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="text-white text-h6"
                          >Estabelecimento</q-item-label
                        >
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="getEditPassword">
                      <q-item-section avatar>
                        <q-icon name="password" size="md" color="white" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="text-white text-h6"
                          >Alterar senha</q-item-label
                        >
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
                <q-btn
                  push
                  stack
                  @click="getEditProfessional"
                  color="brown-8"
                  icon="manage_accounts"
                  label="Profissionais"/>
              </div>
              <div class="col-1 row justify-center">
                <q-btn
                  push
                  stack
                  @click="getLogout"
                  color="brown-10"
                  icon="logout"
                  label="Sair"/>
              </div>
            </div>
          </div>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <router-view />
      </q-page-container>
      <AlertUser v-if="store.getters.getAlertConfig.isAlert" />
    </q-layout>
  </div>
</template>

<style lang="scss" scoped>
#navbar {
  .q-header {
    display: flex;
    min-height: 5rem;
    background-color: $darkColorSecondary;
    
    .q-toolbar {
      .navbar-logo {
        display: flex;
        justify-content: center;
        align-items: center;

      }
      .navbar-menu-toggle{
        display: none;

      }
      .navbar-area-user {
        display: flex;

        .navbar-area-user-login {
          width: 100%;
          margin: 0.3rem 0;

        }
        .navbar-area-user-notLogin {
          width: 100%;
          margin: 0.3rem 0;

          div {
            gap: 0.3rem;

          }
        }
      }
      a {
        text-decoration: none;
        border: 1px solid $brown-6;
        border-radius: 5px;

        &:hover {
          border: 1px solid $brown-10;
          border-radius: 5px;
          box-shadow: 1px 1px 0px 0px $brown-10;

        }
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
}
@media only screen and (max-width: 720px) {
  #navbar {
    .q-header {
      .q-toolbar {
        .navbar-menu-toggle{
          display: block;

        }
        .navbar-area-user {
          display: none;
          position: absolute;
          top: 100%;
          right: 0;
          width: 100%;
          background: $darkColorSecondary;
          flex-direction: column;
          align-items: center;
          padding: 1rem 0;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          border-radius: 0 0 10px 10px;

          .navbar-area-user-login {
            width: 95%;
            justify-content: center;

            .q-btn{
              width: 100%;

            }
          }
          .navbar-area-user-notLogin {
            align-items: center;
            flex-direction: column;
            width: 100%;

            .col-11 {
              width: 95%;
              padding: 0;
              flex-direction: column;
              
              .q-btn{
                width: 100%;

              }
            }
            .col-1{
              width: 80%;
              margin: 1rem 0 .3rem 0;

              .q-btn{
                width: 100%;

              }
            }
          }
        }
        .navbar-area-user.active{
          display: flex;

        }
      }
    }
  }
}
@media only screen and (max-width: 481px) {
  #navbar {
    .q-header {
      .q-toolbar {
        padding: 0 1.5rem;

        .navbar-area-user {
          .navbar-area-user-login {
            justify-content: center;

            button {
              width: 100%;

            }
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 360px) {
}
</style>