<script setup>
const emit = defineEmits(['editFormProfessional']);
const props = defineProps(['dataProfessional']);
import userDefault from '../../assets/user/userDefault.png';

const editFormProfessional = () => {
    emit('editFormProfessional', props.dataProfessional);

};
</script>
<template>
  <div id="card-professional-list">
    <q-card dark bordered class="my-card bg-brown-9 text-white">
       <q-img height="15rem" width="15rem" :src="props.dataProfessional.image || userDefault" />
      <q-card-section class="row items-center">
        <q-icon class="q-mr-sm" name="person" size="1.5rem" color="white" />
        <div class="text-h6">{{ props.dataProfessional.name }}</div>
      </q-card-section>

      <q-separator dark color="white" />

      <q-card-actions class="row justify-between q-py-sm">
        <a
          v-if="!!props.dataProfessional.instagram" 
          :href="props.dataProfessional.instagram"
          target="_blank" >
          <i class='bx bxl-instagram' />
        </a>
        <q-btn 
          :class="props.dataProfessional.instagram == '' ? 'full-width' : ''" 
          color="brown-5" @click="editFormProfessional">Editar dados</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#card-professional-list{  
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