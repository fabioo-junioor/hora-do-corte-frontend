<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { fielsRequired, fielsCheckSize } from '../../utils/inputValidators.js';
import { CardNotice } from '../../components';
import { mainColors, numberRandom, firstCaracterName } from '../../utils/dataUtils.js';

const emit = defineEmits(['saveFormProfessional', 'previewImage']);
const props = defineProps(['imageProfile']);
const isDialogAdd = defineModel('isDialogAdd');
const dataEditProfessional = defineModel('dataEditProfessional');
const isNotice = ref(false);
const numberRandomColor = ref(0);
const rulesUser = reactive({
    required: v => fielsRequired(v) || 'Campo obrigatório!',
    fielsSize: v => fielsCheckSize(v) || 'Campo deve conter no minimo 3 caracteres!'
    
});
const noticeList = reactive([
    '1. Campos com (*) são obrigatórios!'

]);
const onSubmit = () => {
  emit('saveFormProfessional', dataEditProfessional.value.pkProfessional);

};
const previewImage = (event) => {
    emit('previewImage', event);

};
watch(() => isDialogAdd.value, (val) => {
    if(val){
      numberRandomColor.value = numberRandom(mainColors.length);

    };
});
onMounted(() => {
  isNotice.value = noticeList.length != 0 || false;

});
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
          <div class="text-h6">EDITAR PROFISSIONAL</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <CardNotice
          class="full-width q-pa-md"
          v-if="isNotice"
          v-model:isNotice="isNotice"
          :noticeList='noticeList' />
        
        <q-card-section>
          <div class="edit-professional-image q-my-md row justify-center">
            <q-avatar :style="'height: 10rem; width: 10rem;' +
              `background-color: ${mainColors[numberRandomColor].color};`">
              <p :style="'font-size: 4rem;' +
                `color: ${mainColors[numberRandomColor].colorContrast};`"
                class="q-ma-none">
                {{!!dataEditProfessional.name ? firstCaracterName(dataEditProfessional.name) : 'Hc'}}
              </p>
            </q-avatar>
          </div>
          <q-form @submit="onSubmit">
            <div v-if="false" class="form-edit-professional-inputs">
              <q-file
                dark
                filled
                class="q-mb-md"
                @input="previewImage"
                v-model="dataEditProfessional.image"
                label="Adicionar nova imagem"
                color="white"
                bg-color="brown-8"
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
                label="Nome do profissional *"
                lazy-rules
                :rules="[rulesUser.required, rulesUser.fielsSize]" >
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
                hint="Exemplo: https://www.instagram.com/fulano"
                lazy-rules>
                <template v-slot:prepend>
                  <i class='bx bxl-instagram' />
                </template>
              </q-input>
            </div>
            <div class="form-edit-professional-inputs">
              <q-checkbox
                dark
                keep-color
                color="brown-10"
                v-model="dataEditProfessional.isUnavailable"
                label="Temporariamente indisponivel!" />
            </div>
            <q-btn
              push
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