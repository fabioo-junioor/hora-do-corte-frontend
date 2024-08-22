<script setup>
import { ref } from "vue";

const props = defineProps(['professional']);
const emit = defineEmits(['checkProfessional']);
const teste = ref('');

const onSubmit = () => {
    emit('checkProfessional', props.professional);

};
</script>
<template>
  <div id="card-professional">
    <q-card class="my-card">
      <q-card-section>
        <q-radio  @click="onSubmit" v-model="teste" :val="props.professional" :label="props.professional" />
      </q-card-section>
    </q-card>
  </div>
</template>
<style lang="scss" scoped>
</style>