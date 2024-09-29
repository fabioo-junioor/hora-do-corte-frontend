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
const getEditUser = () => {
   router.push({ path: '/editUser' });

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
          <router-link to="/">
            <q-toolbar-title>
              <q-img src="../assets/logo/logo.png" height="4rem" width="4rem" />
            </q-toolbar-title>
          </router-link>
          <div class="btn-area-user"
            v-if="isUserLogin">
              <q-btn 
                  outline
                  @click="getLogin"
                  color="brown-10"
                  icon="login"
                  label="Área do usuário" />
          </div>
          <div v-else class="btn-area-user">
              <q-btn 
                  outline
                  @click="getReservations"
                  color="brown-10"
                  icon="event_available"
                  label="Agendamentos" />
              <q-btn 
                  outline
                  @click="getEditUser"
                  color="brown-10"
                  icon="settings"
                  label="Configuração" />
              <q-btn 
                  outline
                  @click="getEditProfessional"
                  color="brown-10"
                  icon="manage_accounts"
                  label="Profissionais" />
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
        
        a{
          text-decoration: none;
          border: 2px solid $brown-5;
          border-radius: 5px;

          &:hover{
            border: 2px solid $brown-10;

          }
        }
      }
        .btn-area-user{
          height: 4rem;
          display: flex;
          gap: .5rem;
          
          .q-btn:hover{
            background-color: $brown-10 !important;
            color: $whiteColorPrimary !important;

          }
        }
    }
}
</style>