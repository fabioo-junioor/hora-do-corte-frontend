<script setup>
import { reactive } from 'vue';
import { fielsRequired } from '../../utils/inputValidators.js';
import userDefault from '../../assets/imgsDefault/user.png';

const emit = defineEmits(['saveFormProfessional']);
const isDialogAdd = defineModel('isDialogAdd');
const dataEditProfessional = defineModel('dataEditProfessional');
const rulesUser = reactive({
    required: v => fielsRequired(v) || 'Campo obrigatório'
    
});
const onSubmit = () => {
    emit('saveFormProfessional');

}
</script>
<template>
  <div id="form-dialog-add-professional">
    <q-dialog
      v-model="isDialogAdd"
      full-height
      backdrop-filter="blur(1px)">
      <q-card 
        class="bg-brown-6 text-white full-height"
        style="width: 50%; max-width: 80%;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Adicionar profissional</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="edit-professional-image q-my-md row justify-center">
            <q-avatar style="width: 10rem; height: 10rem">
              <q-img :src="dataEditProfessional.image || userDefault"
                fit="cover" :ratio="1" />
            </q-avatar>
          </div>
          <q-form @submit="onSubmit">
            <div class="form-edit-professional-inputs">
              <q-file
                dark
                filled
                class="q-mb-md"
                v-model="dataEditProfessional.image"
                label="Adicionar nova imagem"
                color="white"
                bg-color="brown-8"
                hint="A nova imagem aparecerá após salvar!"
                max-files="1">
                <template v-if="dataEditProfessional.image" v-slot:append>
                  <q-icon
                    name="cancel"
                    @click.stop.prevent="dataEditProfessional.image = null"
                    class="cursor-pointer" />
                </template>
                <template v-slot:prepend>
                  <q-icon name="add_photo_alternate" color="white" />
                </template>
              </q-file>
            </div>
            <div class="form-edit-professional-inputs">
              <q-input
                dark
                filled
                class="q-mb-sm"
                color="white"
                bg-color="brown-8"
                v-model="dataEditProfessional.name"
                type="text"
                label="Nome do profissional"
                lazy-rules
                :rules="[rulesUser.required]" >
                <template v-slot:prepend>
                  <q-icon name="person" color="white" />
                </template>
              </q-input>
            </div>
            <div class="form-edit-professional-inputs">
              <q-input
                dark
                filled
                class="q-mb-sm"
                color="white"
                bg-color="brown-8"
                v-model="dataEditProfessional.instagram"
                type="text"
                label="Link do instagram"
                lazy-rules>
                <template v-slot:prepend>
                  <i class='bx bxl-instagram' />
                </template>
              </q-input>
            </div>
            <q-btn
              class="q-my-lg full-width"
              size="lg"
              color="brown-9"
              label="Salvar dados"
              type="submit" />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

</style>