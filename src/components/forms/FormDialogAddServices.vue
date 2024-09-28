<script setup>
import { reactive } from 'vue';
import { fielsRequired } from '../../utils/inputValidators.js';

const props = defineProps(['servicesByProfesional']);
const emit = defineEmits(['saveFormServices', 'addService', 'deleteService']);
const isDialogServices = defineModel('isDialogServices');
const dataEditServices = defineModel('dataEditServices');
const rulesUser = reactive({
    required: v => fielsRequired(v) || 'Campo obrigatório',
    requiredNumber: v => v > 0 || 'Campo obrigatório'
    
});
const saveFormServices = () => {
    emit('saveFormServices');

};
const deleteService = (data) => {
    emit('deleteService', data)

};
const onSubmit = () => {
  emit('addService');

};
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
          <div class="text-h6">Adicionar serviços</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form @submit="onSubmit">
            <div class="form-edit-services-inputs row justify-between">
              <div class="form-edit-services-input col">
                <q-input
                  dark
                  filled
                  class="q-mb-sm"
                  color="white"
                  bg-color="brown-8"
                  v-model="dataEditServices.name"
                  type="text"
                  label="Nome *"
                  lazy-rules
                  hint="Definir nomes diferentes para cada serviço!"
                  :rules="[rulesUser.required]" >
                  <template v-slot:prepend>
                    <q-icon name="content_cut" color="white" />
                  </template>
                </q-input>
              </div>
              <div class="form-edit-services-input col q-mx-xs">
                <q-input
                  dark
                  filled
                  class="q-mb-sm"
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
                  class="q-mb-sm"
                  color="white"
                  bg-color="brown-8"
                  v-model="dataEditServices.time"
                  type="number"
                  label="Duração *"
                  lazy-rules
                  hint="Em minutos!"
                  :rules="[rulesUser.requiredNumber]">
                  <template v-slot:prepend>
                    <q-icon name="timer" color="white" />
                  </template>
                </q-input>
              </div>
              <div class="form-edit-services-input">
                <q-btn
                  round
                  class="q-ma-xs"
                  color="brown-9"
                  icon="add"
                  type="submit" />    
              </div>
            </div>
            <div class="form-dialog-add-services-list q-my-md">
              <q-list dark separator>
                <q-item
                  v-ripple
                  v-for="i in props.servicesByProfesional" :key="i">
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
                      round
                      style="width: 1rem; height: 1rem;"
                      @click="deleteService(i.name)"
                      color="brown-9"
                      icon="delete" />
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
            <q-btn
              :disable="props.servicesByProfesional.length == 0"
              @click="saveFormServices"
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

#form-dialog-add-services{
  }
</style>