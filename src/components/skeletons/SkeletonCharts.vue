<script setup>
import { onMounted } from 'vue';

</script>
<template>
  <div id="skeleton-charts">
    <q-card dark flat class="my-card q-pa-sm">
      <q-item>
        <q-item-section avatar>
          <q-skeleton bordered height="3rem" type="QToggle" class="bg-grey-6" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <q-skeleton bordered width="80%" height="2rem" type="rect" class="bg-grey-6" />
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-skeleton bordered height="20rem" class="bg-grey-6" />
    </q-card>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#skeleton-charts{
    .my-card{
        background-color: transparent;
        border: 1px solid #EEEEEEA6;

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
}
@media only screen and (max-width: 481px) {
}
@media only screen and (max-width: 360px) {
}
</style>