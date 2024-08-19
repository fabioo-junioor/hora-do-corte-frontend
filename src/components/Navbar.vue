<script setup>
const getPageLogin = () => {
    console.log('page');

};
</script>
<template>
  <div id="navbar">
    <q-layout view="hHh lpR fFf">
      <q-header elevated class="bg-grey-9 text-grey-3 q-pl-md q-pr-md">
        <q-toolbar class="q-py-sm">
          <q-toolbar-title>
                <i class='bx bx-calendar q-px-sm' />
                Agenda estilo
          </q-toolbar-title>
        <div class="btn-area-user">
            <q-btn 
                outline 
                color="grey-2"
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
        .q-toolbar__title{
            display: flex;

            i{
                font-size: 2rem;

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