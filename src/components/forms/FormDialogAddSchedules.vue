<script setup>
import { reactive } from 'vue';
import { fielsRequired } from '../../utils/inputValidators.js';

const emit = defineEmits(['saveFormSchedules']);
const isDialogSchedules = defineModel('isDialogSchedules');
const dataEditSchedules = defineModel('dataEditSchedules');
const rulesUser = reactive({
    required: v => fielsRequired(v) || 'Campo obrigatório'
    
});
const onSubmit = () => {
  emit('saveFormSchedules');

};
</script>
<template>
  <div id="form-dialog-add-schedules">
    <q-dialog
      v-model="isDialogSchedules"
      full-height
      backdrop-filter="blur(1px)">
      <q-card 
        class="bg-brown-6 text-white full-height"
        style="width: 50%; max-width: 80%;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Adicionar horários</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form @submit="onSubmit">
            <div class="form-edit-schedules-inputs">
              <h6 class="q-my-xs">Segunda</h6>
              <div class="row">
                <div class="col q-pa-xs bg-brown-5 rounded-borders">
                  <p class="q-ma-none">Manha</p>
                  <div class="row">
                    <q-input
                      dark
                      filled
                      class="col q-mx-xs"
                      color="white"
                      bg-color="brown-8"
                      v-model="dataEditSchedules[0]['mon']['morning']['open']"
                      mask="time"
                      label="Abre"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time
                              dark
                              format24h 
                              v-model="dataEditSchedules[0]['mon']['morning']['open']"
                              color="brown-9">
                              <div class="row items-center justify-end">
                                <q-btn flat v-close-popup label="Fechar" color="white" />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                    <q-input
                      dark
                      filled
                      class="col q-mx-xs"
                      color="white"
                      bg-color="brown-8"
                      v-model="dataEditSchedules[0]['mon']['morning']['close']"
                      mask="time"
                      label="Fecha"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time 
                              dark
                              format24h 
                              v-model="dataEditSchedules[0]['mon']['morning']['close']"
                              color="brown-9">
                              <div class="row items-center justify-end">
                                <q-btn flat v-close-popup label="Fechar" color="white" />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>
                <div class="col q-pa-xs q-mx-xs bg-brown-5 rounded-borders">
                  <p class="q-ma-none">Tarde</p>
                  <div class="row">
                    <q-input
                      dark
                      filled
                      class="col q-mx-xs"
                      color="white"
                      bg-color="brown-8"
                      v-model="dataEditSchedules[0]['mon']['afternoon']['open']"
                      mask="time"
                      label="Abre"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time
                              dark
                              format24h 
                              v-model="dataEditSchedules[0]['mon']['afternoon']['open']"
                              color="brown-9">
                              <div class="row items-center justify-end">
                                <q-btn flat v-close-popup label="Fechar" color="white" />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                    <q-input
                      dark
                      filled
                      class="col q-mx-xs"
                      color="white"
                      bg-color="brown-8"
                      v-model="dataEditSchedules[0]['mon']['afternoon']['close']"
                      mask="time"
                      label="Fecha"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time 
                              dark
                              format24h  
                              v-model="dataEditSchedules[0]['mon']['afternoon']['close']"
                              color="brown-9">
                              <div class="row items-center justify-end">
                                <q-btn flat v-close-popup label="Fechar" color="white" />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>
                <div class="col q-pa-xs bg-brown-5 rounded-borders">
                  <p class="q-ma-none">Noite</p>
                  <div class="row">
                    <q-input
                      dark
                      filled
                      class="col q-mx-xs"
                      color="white"
                      bg-color="brown-8"
                      v-model="dataEditSchedules[0]['mon']['night']['open']"
                      mask="time"
                      label="Abre"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time
                              dark
                              format24h 
                              v-model="dataEditSchedules[0]['mon']['night']['open']"
                              color="brown-9">
                              <div class="row items-center justify-end">
                                <q-btn flat v-close-popup label="Fechar" color="white" />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                    <q-input
                      dark
                      filled
                      class="col q-mx-xs"
                      color="white"
                      bg-color="brown-8"
                      v-model="dataEditSchedules[0]['mon']['night']['close']"
                      mask="time"
                      label="Fecha"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time 
                              dark 
                              format24h 
                              v-model="dataEditSchedules[0]['mon']['night']['close']"
                              color="brown-9">
                              <div class="row items-center justify-end">
                                <q-btn flat v-close-popup label="Fechar" color="white" />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>
              </div>  
            </div>
            <div class="form-edit-schedules-inputs">
              <h6 class="q-my-xs">Terça</h6>
              <div class="row">
                <div class="col q-pa-xs bg-brown-5 rounded-borders">
                  <p class="q-ma-none">Manha</p>
                  <div class="row">
                    <q-input
                      dark
                      filled
                      class="col q-mx-xs"
                      color="white"
                      bg-color="brown-8"
                      v-model="dataEditSchedules[1]['tue']['morning']['open']"
                      mask="time"
                      label="Abre"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time
                              dark
                              format24h 
                              v-model="dataEditSchedules[1]['tue']['morning']['open']"
                              color="brown-9">
                              <div class="row items-center justify-end">
                                <q-btn flat v-close-popup label="Fechar" color="white" />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                    <q-input
                      dark
                      filled
                      class="col q-mx-xs"
                      color="white"
                      bg-color="brown-8"
                      v-model="dataEditSchedules[1]['tue']['morning']['close']"
                      mask="time"
                      label="Fecha"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time 
                              dark
                              format24h 
                              v-model="dataEditSchedules[1]['tue']['morning']['close']"
                              color="brown-9">
                              <div class="row items-center justify-end">
                                <q-btn flat v-close-popup label="Fechar" color="white" />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>
                <div class="col q-pa-xs q-mx-xs bg-brown-5 rounded-borders">
                  <p class="q-ma-none">Tarde</p>
                  <div class="row">
                    <q-input
                      dark
                      filled
                      class="col q-mx-xs"
                      color="white"
                      bg-color="brown-8"
                      v-model="dataEditSchedules[1]['tue']['afternoon']['open']"
                      mask="time"
                      label="Abre"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time
                              dark
                              format24h 
                              v-model="dataEditSchedules[1]['tue']['afternoon']['open']"
                              color="brown-9">
                              <div class="row items-center justify-end">
                                <q-btn flat v-close-popup label="Fechar" color="white" />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                    <q-input
                      dark
                      filled
                      class="col q-mx-xs"
                      color="white"
                      bg-color="brown-8"
                      v-model="dataEditSchedules[1]['tue']['afternoon']['close']"
                      mask="time"
                      label="Fecha"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time 
                              dark
                              format24h  
                              v-model="dataEditSchedules[1]['tue']['afternoon']['close']"
                              color="brown-9">
                              <div class="row items-center justify-end">
                                <q-btn flat v-close-popup label="Fechar" color="white" />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>
                <div class="col q-pa-xs bg-brown-5 rounded-borders">
                  <p class="q-ma-none">Noite</p>
                  <div class="row">
                    <q-input
                      dark
                      filled
                      class="col q-mx-xs"
                      color="white"
                      bg-color="brown-8"
                      v-model="dataEditSchedules[1]['tue']['night']['open']"
                      mask="time"
                      label="Abre"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time
                              dark
                              format24h 
                              v-model="dataEditSchedules[1]['tue']['night']['open']"
                              color="brown-9">
                              <div class="row items-center justify-end">
                                <q-btn flat v-close-popup label="Fechar" color="white" />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                    <q-input
                      dark
                      filled
                      class="col q-mx-xs"
                      color="white"
                      bg-color="brown-8"
                      v-model="dataEditSchedules[1]['tue']['night']['close']"
                      mask="time"
                      label="Fecha"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time 
                              dark 
                              format24h 
                              v-model="dataEditSchedules[1]['tue']['night']['close']"
                              color="brown-9">
                              <div class="row items-center justify-end">
                                <q-btn flat v-close-popup label="Fechar" color="white" />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>
              </div>  
            </div>
            <q-btn
              class="q-my-lg full-width"
              size="lg"
              color="brown-9"
              label="Salvar alterações"
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