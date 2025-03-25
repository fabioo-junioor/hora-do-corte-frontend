<script setup>
import { onMounted } from 'vue';

</script>
<template>
  <div id="skeleton-charts">
    <q-card dark flat class="my-card q-pa-sm">
      <q-item>
        <q-item-section>
          <q-item-label>
            <q-skeleton bordered width="70%" height="2rem" type="rect" class="bg-grey-6 q-mb-lg" />
          </q-item-label>
          <q-item-label>
            <q-skeleton bordered width="60%" height="2rem" type="text" class="bg-grey-6" />
          </q-item-label>
          <q-item-label>
            <q-skeleton bordered width="60%" height="2rem" type="text" class="bg-grey-6" />
          </q-item-label>
          <q-item-label>
            <q-skeleton bordered width="60%" height="2rem" type="text" class="bg-grey-6" />
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-card-actions align="right">
        <q-skeleton type="QToggle" class="bg-grey-6" />
      </q-card-actions>
    </q-card>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#skeleton-charts{
  height: 100%;

    .my-card{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: transparent;
      border: 1px solid #EEEEEEA6;
      border-radius: 5px;
      height: 100%;

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