<script setup>
import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { AlertUser } from "../components";
import { getDataUser,deleteDataUser } from "../services/storage/settingSession.js";

const store = useStore();
const router = useRouter();
const isUserLogin = ref(false);

const checkLoginUser = () => {
  let dataUser = getDataUser();
  if (!dataUser) {
    isUserLogin.value = false;
    return;
    
  }
  isUserLogin.value = true;
  return;

};
const getLogin = () => {
  router.push({ path: "/loginUser" });

};
const getLogout = () => {
  deleteDataUser();
  store.commit("setAlertConfig", { message: "Saindo!", type: "positive" });
  store.commit('setStateUser', {login: false});
  reloadPage();

};
const getEditUser = () => {
  router.push({ path: "/editUser" });

};
const getEditPassword = () => {
  router.push({ path: "/editPasswordUser" });

};
const getEditProfessional = () => {
  router.push({ path: "/editProfessional" });

};
const getReservations = () => {
  router.push({ path: "/reservations" });

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
onMounted(() => {
  checkLoginUser();
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
          <div class="col-11 navbar-area-user">
            <div
              v-if="!isUserLogin"
              class="navbar-area-user-login row justify-end"
            >
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
                  label="Agendamentos"
                />
                <q-btn-dropdown
                  push
                  stack
                  color="brown-8"
                  icon="settings"
                  label="Configuração"
                >
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
                  label="Profissionais"
                />
              </div>
              <div class="col-1 row justify-center">
                <q-btn
                  push
                  stack
                  @click="getLogout"
                  color="brown-10"
                  icon="logout"
                  label="Sair"
                />
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
      .navbar-area-user {
        .navbar-area-user-login {
          margin: 0.3rem 0;

        }
        .navbar-area-user-notLogin {
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
        .navbar-area-user {
          .navbar-area-user-login {
            padding: 0 1rem;

          }
          .navbar-area-user-notLogin {
            .col-11 {
              padding: 0 1rem;
              flex-direction: column;

            }
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 481px) {
  #navbar {
    .q-header {
      .q-toolbar {
        flex-direction: column;
        padding: 0;

        .navbar-area-user {
          .navbar-area-user-login {
            justify-content: center;
            padding: 0;

            button {
              width: 100%;

            }
          }
          .navbar-area-user-notLogin {
            flex-direction: column;
            width: 100%;

            .col-11 {
              padding: 0 1rem;
              width: 100%;

            }
            .col-1 {
              width: 100%;

              button {
                width: 100%;
                margin: 1rem 0;
                
              }
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