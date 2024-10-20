<script setup>
const emit = defineEmits(['editFormProfessional', 'editScheduleProfessional', 'editServicesProfessional', 'deleteProfessional']);
const props = defineProps(['dataProfessional']);
import userDefault from '../../assets/imgsDefault/user.png';

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
</script>
<template>
  <div id="card-professional-list">
    <q-card
      dark
      bordered 
      style="width: 20rem;"
      class="my-card bg-brown-9 text-white column items-center">
       <q-img class="q-ma-md" height="15rem" width="15rem" :src="props.dataProfessional.image || userDefault" />
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
@media only screen and (max-width: 960px) {
}
@media only screen and (max-width: 768px) {
}
@media only screen and (max-width: 480px) {
}
@media only screen and (max-width: 320px) {
}
</style>