<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isUserLogin = ref(false);

const checkLoginUser = () => {
  isUserLogin.value = true;

};
const getLogin = () => {
   router.push({ path: '/loginUser' });
   
};
const getLogout = () => {
   console.log('sair');
   
};
const getEditUser = () => {
   router.push({ path: '/editUser' });

};
const getEditPassword = () => {
  router.push({ path: '/editPasswordUser' });

};
const getEditProfessional = () => {
   router.push({ path: '/editProfessional' });

};
const getReservations = () => {
   
};
onMounted(() => {
  //checkLoginUser();

});
</script>
<template>
  <div id="navbar">
    <q-layout view="hHh lpR fFf">
      <q-header elevated class="q-px-md q-py-xs">
        <q-toolbar>
          <div class="navbar-logo">
            <router-link to="/">
              <q-toolbar-title>
                <q-img src="../assets/logo/logo.png" height="4rem" width="4rem" />
              </q-toolbar-title>
            </router-link>
          </div>
          <div class="navbar-area-user">
            <div
              v-if="isUserLogin" 
              class="navbar-area-user-login">
              <q-btn 
                  outline
                  @click="getLogin"
                  color="brown-10"
                  icon="login"
                  label="Área do usuário" />
            </div>
            <div v-else class="navbar-area-user-notLogin row">
              <div class="col" />
              <div class="col">
                <q-btn 
                  outline
                  @click="getReservations"
                  color="brown-10"
                  icon="event_available"
                  label="Agendamentos" />
              <q-btn-dropdown
                  outline
                  color="brown-10"
                  icon="settings"
                  label="Configuração">
                  <q-list class="bg-brown-5">
                    <q-item
                      clickable
                      v-close-popup
                      @click="getEditUser">
                      <q-item-section avatar>
                        <q-icon name="settings_applications" size="md" color="white"/>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="text-white text-h6">Estabelecimento</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      v-close-popup
                      @click="getEditPassword">
                      <q-item-section avatar>
                        <q-icon name="password" size="md" color="white"/>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="text-white text-h6">Alterar senha</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>  
                </q-btn-dropdown>
              <q-btn 
                  outline
                  @click="getEditProfessional"
                  color="brown-10"
                  icon="manage_accounts"
                  label="Profissionais" />
              </div>
              <div class="col">
                <q-btn 
                  outline
                  @click="getLogout"
                  color="brown-10"
                  icon="logout"
                  label="Sair" />
              </div>
            </div>
          </div>          
        </q-toolbar>
      </q-header>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<style lang="scss" scoped>
#navbar{
    .q-header{
      height: 5rem;
      display: flex;
      background-color: $darkColorSecondary;

      .q-toolbar{
        display: flex;
        justify-content: space-between;
        align-items: center;

        .navbar-logo{
          height: 100%;
          width: 4.5rem;
          display: flex;
          justify-content: center;
          align-items: center;

        }
        .navbar-area-user{
          height: 100%;
          display: flex;
          width: calc(100% - 5rem);

          .navbar-area-user-login{
            width: 100%;
            display: flex;
            justify-content: flex-end;

          }
          .navbar-area-user-notLogin{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            div{
              height: 100%;

              .q-btn{
                height: 100%;

              }
            }
          }
          .navbar-area-user-notLogin div:nth-child(2){
           display: flex;
           gap: .5rem;

          }
          .navbar-area-user-notLogin div:nth-child(3){
           display: flex;
           justify-content: flex-end;      

          }
          .q-btn:hover{
            background-color: $brown-5 !important;

          }
        }        
        a{
          text-decoration: none;
          border: 2px solid $brown-5;
          border-radius: 5px;

          &:hover{
            border: 2px solid $brown-10;

          }
        }
      }
    }
}
</style>