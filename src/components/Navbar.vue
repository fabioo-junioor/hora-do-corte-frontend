<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const getPageLogin = () => {
    router.push({ name: 'loginUser' });

};
</script>
<template>
  <div id="navbar">
    <q-layout view="hHh lpR fFf">
      <q-header elevated class="q-px-md q-py-xs">
        <q-toolbar class="q-py-sm">
          <router-link class="q-pa-xs" to="/">
            <q-toolbar-title>
              <i class='bx bx-calendar q-px-sm' />
              Agenda estilo        
            </q-toolbar-title>
          </router-link>
        <div class="btn-area-user">
            <q-btn 
                outline 
                color="brown-10"
                @click="getPageLogin" >
                <i class='bx bx-log-in q-pr-md' />
                Área do cliente
            </q-btn>
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
      background-color: $darkColorSecondary;

      .q-toolbar{
        display: flex;
        justify-content: space-between;

        a{
          text-decoration: none;
          color: $brown-10;

          .q-toolbar__title{
              display: flex;

              i{
                  font-size: 2rem;
                  color: $brown-10;

              }
          }
          &:hover{
            background-color: rgba(255, 255, 255, .3);
            border-radius: 5px;

          }
        }
      }
        .btn-area-user{
            i{
                font-size: 1.5rem;


            }
        }
    }
}
</style>