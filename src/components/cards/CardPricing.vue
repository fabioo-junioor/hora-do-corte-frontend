<script setup>
const props = defineProps(['dataPricing']);

</script>
<template>
  <div id="card-pricing">
    <q-card dark class="my-card q-pa-sm">
      <q-card-section class="flex-column items-center">
        <div class="pricing-about">
            <div class="text-h4 q-mb-sm">{{ props.dataPricing.name }}</div>
            <div class="text-subtitle2 q-my-xs">{{ props.dataPricing.about }}</div>
            <div class="text-h5 q-my-md">R$ {{ props.dataPricing.price }}</div>
        </div>
        <q-separator inset size=".1rem" spaced="1.5rem" color="white" />
        <q-btn
            push
            class="full-width"
            size="lg"
            label="Teste 30 dias gratis"
            color="brown-6"
            text-color="grey-3"  />
        <div class="pricing-details">
            <div class="pricing-detail flex items-center q-my-md"
                v-for="i in props.dataPricing.benefits" :key="i" >
                <q-icon class="q-mr-sm" name="check" />
                <p class="q-ma-none">{{ i }}</p>
            </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#card-pricing {
    .my-card{
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
@media only screen and (max-width: 960px) {
}
@media only screen and (max-width: 768px) {
}
@media only screen and (max-width: 480px) {
}
@media only screen and (max-width: 320px) {
}
</style>