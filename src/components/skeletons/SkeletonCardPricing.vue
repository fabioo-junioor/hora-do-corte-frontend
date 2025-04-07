<script setup>
</script>
<template>
  <div id="skeleton-card-pricing">
    <q-card dark flat class="my-card q-pa-sm">
      <q-card-section class="flex-column items-center">
        <div class="pricing-about">
          <q-skeleton bordered class="q-mb-sm" type="rect" width="7rem" height="3rem"/>
          <q-skeleton bordered class="q-my-xs" type="text" />
          <q-skeleton bordered class="q-my-xs" type="text" />
          <q-skeleton bordered class="q-my-xs" type="text" />
          <q-skeleton bordered class="q-my-md" type="QToggle" width="5rem" height="2.5rem" />
        </div>
        <q-skeleton bordered class="q-my-lg" type="text" height=".5rem" />
        <q-skeleton bordered class="q-mb-md" type="QBtn" width="100%" height="3rem" />
        <div class="pricing-details flex column">
          <div
            class="pricing-detail q-my-xs"
            v-for="i in 3"
            :key="i">
            <q-skeleton bordered type="QToggle" width="7rem" height="1rem" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#skeleton-card-pricing {
  .my-card {
    width: 25rem;
    border-radius: 10px;
    background-color: $brown-8;

    
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
  #skeleton-card-pricing {
    display: flex;
    justify-content: center;

    .my-card {
      width: 95%;

    }
  }
}
@media only screen and (max-width: 360px) {
}
</style>