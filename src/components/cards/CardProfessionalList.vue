<script setup>
import { onMounted, ref } from 'vue';
const emit = defineEmits(['editFormProfessional', 'editScheduleProfessional', 'editServicesProfessional', 'deleteProfessional']);
const props = defineProps(['dataProfessional']);
import { mainColors, numberRandom, firstCaracterName } from '../../utils/dataUtils.js';
import userDefault from '../../assets/imgsDefault/user.png';

const numberRandomColor = ref(0);
const editFormProfessional = () => {
    emit('editFormProfessional', props.dataProfessional);

};
const editScheduleProfessional = () => {
  emit('editScheduleProfessional', props.dataProfessional);

};
const editServicesProfessional = () => {
  emit('editServicesProfessional', props.dataProfessional);

};
const deleteProfessional = (pkProfessional) => {
  emit('deleteProfessional', pkProfessional);

};
onMounted(() => {
  numberRandomColor.value = numberRandom(mainColors.length);

});
</script>
<template>
  <div id="card-professional-list">
    <q-card
      dark
      bordered
      class="my-card bg-brown-9 text-white column items-center">
      <q-avatar rounded :style="'width: 100%; height: 10rem;' +
        `background-color: ${mainColors[numberRandomColor].color};`">
        <p :style="'font-size: 5rem;' +
          `color: ${mainColors[numberRandomColor].colorContrast};`"
          class="q-ma-none">
          {{ firstCaracterName(props.dataProfessional.name) }}
        </p>
      </q-avatar>
      <q-card-section class="row justify-between items-center full-width">
        <div class="row items-center">
          <q-icon class="q-mr-sm" name="person" size="1.5rem" color="white" />
          <div class="text-h6">{{ props.dataProfessional.name }}</div>
        </div>
        <a v-if="!!props.dataProfessional.instagram" 
          :href="props.dataProfessional.instagram"
          target="_blank" >
          <i class='bx bxl-instagram' />
        </a>
      </q-card-section>

      <q-card-actions class="column full-width">
        <q-btn
          push
          @click="editFormProfessional"
          class="full-width q-mb-sm"
          icon="person"
          label="Editar usuário"
          color="brown-5" /> 
        <q-btn
          push 
          @click="editScheduleProfessional"
          class="full-width q-mb-sm"
          icon="schedule"
          label="Editar horários"
          color="brown-5" />
        <q-btn
          push 
          @click="editServicesProfessional"
          class="full-width"
          icon="content_cut"
          label="Editar serviços"
          color="brown-5" />
      </q-card-actions>
      <q-btn
        dark round push
        @click="deleteProfessional(props.dataProfessional.pkProfessional)"
        class="card-professional-list-btn-delete-professional"
        size="md"
        color="brown-5"
        icon="delete" />
    </q-card>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#card-professional-list{
  .my-card{
    position: relative;
    width: 20rem;
    
    a{
      text-decoration: none;

      i{
        color: $whiteColorPrimary;
        font-size: 2rem;

      }
      &:hover i{
        color: $brown-4;

      }
    }
    .card-professional-list-btn-delete-professional{
      position: absolute;
      top: -.5rem;
      right: -1rem;

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

}
@media only screen and (max-width: 360px) {
  
}
</style>