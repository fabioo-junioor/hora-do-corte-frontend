<script setup>
const props = defineProps(["dataPricing"]);
const emit = defineEmits(["buyPlan"]);

const buyPlan = () => {
  emit("buyPlan", props.dataPricing.pk);
};
</script>
<template>
  <div id="card-pricing">
    <q-card dark class="my-card q-pa-sm">
      <q-card-section class="flex-column items-center">
        <div class="pricing-about">
          <q-badge
            v-if="props.dataPricing.pk === 3"
            class="badge-discount q-pa-sm"
            color="red-8"
            >-10%</q-badge
          >
          <div class="text-h4 q-mb-sm">{{ props.dataPricing.name }}</div>
          <div class="text-subtitle2 q-my-xs">
            {{ props.dataPricing.about }}
          </div>
          <div class="text-h5 q-my-md">R$ {{ props.dataPricing.price }}</div>
        </div>
        <q-separator inset size=".1rem" spaced="1.5rem" color="white" />
        <q-btn
          push
          @click="buyPlan"
          class="full-width q-mb-md"
          size="lg"
          :label="props.dataPricing.pk == 0 ? 'Teste grátis' : 'Adquirir plano'"
          color="brown-6"
          text-color="grey-3"
        />
        <div class="pricing-details">
          <div
            class="pricing-detail flex items-center q-my-md"
            v-for="i in props.dataPricing.benefits"
            :key="i"
          >
            <q-icon class="q-mr-sm" size="xs" name="check_circle" />
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
  .my-card {
    width: 25rem;
    border-radius: 10px;
    background-color: $brown-8;

    .pricing-about {
      position: relative;

      .badge-discount {
        position: absolute;
        top: -25%;
        right: -8%;
        font-size: 1rem;
        
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
}
@media only screen and (max-width: 481px) {
  #card-pricing {
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