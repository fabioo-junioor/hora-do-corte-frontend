<script setup>
import { ref } from 'vue';
import userDefault from '../../assets/user/userDefault.png';
import { formatString } from '../../utils/formatters.js';

const props = defineProps(['dataServices']);
const emit = defineEmits(['checkProfessional']);
const idProfessional = defineModel('idProfessional');

const onSubmit = () => {
    emit('checkProfessional', props.dataServices);

};
</script>
<template>
  <div id="card-professional">
    <q-card
      bordered
      :class="'my-card text-white bg-' + (idProfessional === props.dataServices.idProfessional ? 'brown-10' : 'brown-8')"
      @click="onSubmit" >
      <q-card-section>
        <q-avatar>
          <img :src="props.dataServices.image || userDefault">
        </q-avatar>
        <q-separator vertical class="q-mx-sm" color="white" />
        <div class="text-h6">{{ formatString(props.dataServices.professional) }}</div>
      </q-card-section>
      <q-card-section>
        <q-icon
          v-if="idProfessional === props.dataServices.idProfessional" 
          name="task_alt" size="1.5rem" />
      </q-card-section>
    </q-card>
  </div>
</template>
<style lang="scss" scoped>
#card-professional{
  min-width: 15rem !important;

  .my-card{
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    .q-card__section{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      
    }
    &:hover{
      border: 1px solid $brown-10;
      box-shadow: 0px 0px 5px 1px $brown-7;

    }
  }
}
</style>