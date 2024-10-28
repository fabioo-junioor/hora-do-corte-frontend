<script setup>
import { ref } from 'vue';
import userDefault from '../../assets/imgsDefault/user.png';
import { formatString } from '../../utils/formatters.js';

const props = defineProps(['dataProfessionals', 'professionalEnable']);
const emit = defineEmits(['checkProfessional']);
const pkProfessional = defineModel('pkProfessional');

const onSubmit = () => {
  if(props.professionalEnable){
    emit('checkProfessional', props.dataProfessionals);
    return;

  };
};
</script>
<template>
  <div id="card-professional">
    <q-card
      :style="'cursor: '+ (props.professionalEnable ? 'pointer' : 'not-allowed')"
      :class="'my-card text-white bg-' + (props.professionalEnable ? 'brown-8' : 'brown-5')"
      @click="onSubmit" >
      <q-badge v-if="!props.professionalEnable" color="red-8" floating>Indisponivel</q-badge>
      <q-card-section>
        <q-avatar>
          <img :src="props.dataProfessionals?.image || userDefault">
        </q-avatar>
        <q-separator vertical class="q-mx-sm" color="white" />
        <div class="text-h6">{{ formatString(props.dataProfessionals.name) }}</div>
      </q-card-section>
      <q-card-section>
        <q-icon
          v-if="(pkProfessional === props.dataProfessionals.pkProfessional && props.professionalEnable)" 
          name="task_alt" size="1.3rem" />
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
    border: 1px solid rgba(0, 0, 0, .5);

    .q-card__section{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      
    }
    &:hover{
      box-shadow: 1px 1px 0px 1px black;

    }
  }
}
</style>