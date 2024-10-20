<script setup>
import { reactive, ref, onMounted } from 'vue';
import { fielsRequired, fielsCheckSize } from '../../utils/inputValidators.js';
import { CardNotice } from '../../components';

const props = defineProps(['newServices']);
const emit = defineEmits(['saveFormServices', 'addService', 'deleteService']);
const isDialogServices = defineModel('isDialogServices');
const dataEditServices = defineModel('dataEditServices');
const isNotice = ref(false);
const rulesUser = reactive({
    required: v => fielsRequired(v) || 'Campo obrigatório',
    requiredNumber: v => v > 0 || 'Campo obrigatório!',
    isInteger: v => (v % 1 === 0) || 'Numero deve ser inteiro!',
    fielsSize: v => fielsCheckSize(v) || 'Campo deve conter no minimo 3 caracteres!',
    checkNameIquals: v => !checkName(v) || 'O nome já existe!'

});
const noticeList = reactive([
    '1. Campos com (*) são obrigatórios!',
    '2. Definir nomes diferentes para cada serviço!',
    '3. A duração do serviço deve ser informado em (minutos). Ex.: 1:30 é igual a 90min!'

]);
const saveFormServices = () => {
  emit('saveFormServices');
    
};
const deleteService = (data) => {
    emit('deleteService', data)

};
const onSubmit = () => {
  emit('addService');

};
const checkName = (name) => {
  for(let i in props.newServices){
    if(props.newServices[i].name === name){
      return true;

    };
  };
  return false;

};
onMounted(() => {
  isNotice.value = noticeList.length != 0 || false;

});
</script>
<template>
  <div id="form-dialog-add-services">
    <q-dialog
      v-model="isDialogServices"
      full-height
      backdrop-filter="blur(1px)">
      <q-card 
        class="bg-brown-6 text-white full-height"
        style="width: 50%; max-width: 80%;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">EDITAR SERVIÇOS</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
          <CardNotice
            class="full-width q-pa-md"
            v-if="isNotice"
            v-model:isNotice="isNotice"
            :noticeList='noticeList' />
        <q-card-section>
          <q-form @submit="onSubmit">
            <div class="form-edit-services-inputs row justify-between">
              <div class="form-edit-services-input col">
                <q-input
                  dark
                  filled
                  color="white"
                  bg-color="brown-8"
                  v-model="dataEditServices.name"
                  type="text"
                  label="Nome *"
                  :rules="[rulesUser.required, rulesUser.fielsSize, rulesUser.checkNameIquals]"
                  lazy-rules >
                  <template v-slot:prepend>
                    <q-icon name="content_cut" color="white" />
                  </template>
                </q-input>
              </div>
              <div class="form-edit-services-input col q-mx-xs">
                <q-input
                  dark
                  filled
                  color="white"
                  bg-color="brown-8"
                  v-model="dataEditServices.price"
                  type="number"
                  label="Valor *"
                  lazy-rules
                  :rules="[rulesUser.requiredNumber]">
                  <template v-slot:prepend>
                    <q-icon name="attach_money" color="white" />
                  </template>
                </q-input>
              </div>
              <div class="form-edit-services-input col">
                <q-input
                  dark
                  filled
                  color="white"
                  bg-color="brown-8"
                  v-model="dataEditServices.time"
                  type="number"
                  label="Duração *"
                  lazy-rules
                  :rules="[rulesUser.requiredNumber, rulesUser.isInteger]">
                  <template v-slot:prepend>
                    <q-icon name="timer" color="white" />
                  </template>
                </q-input>
              </div>
              <div class="form-edit-services-input">
                <q-btn
                  round
                  class="q-mx-xs q-my-sm"
                  color="brown-9"
                  icon="add"
                  type="submit" />    
              </div>
            </div>
            <div class="form-dialog-add-services-list q-my-md">
              <q-list dark separator>
                <q-item
                  v-ripple
                  v-for="i in props.newServices" :key="i">
                  <q-item-section>
                    <q-item-label>
                      <q-icon name="content_cut" color="grey-3" size="sm" />
                      Nome: {{ i.name }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      <q-icon name="attach_money" color="grey-3" size="sm" />
                      Preço: {{ i.price }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      <q-icon name="timer" color="grey-3" size="sm" />
                      Duração: {{ i.time }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section class="items-center">
                    <q-btn
                      round push
                      style="width: 1rem; height: 1rem;"
                      @click="deleteService(i.name)"
                      color="brown-9"
                      icon="delete" />
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
            <q-btn
              push
              :disable="props.newServices.length == 0"
              @click="saveFormServices()"
              class="q-my-lg full-width"
              size="lg"
              color="brown-9"
              label="Salvar alterações" />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

</style>