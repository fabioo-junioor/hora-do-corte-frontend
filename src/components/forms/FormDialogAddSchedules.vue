<script setup>
import { reactive, ref } from 'vue';
import { fielsRequired, isAnyShiftOpen } from '../../utils/inputValidators.js';

const emit = defineEmits(['saveFormSchedules']);
const isDialogSchedules = defineModel('isDialogSchedules');
const dataEditSchedules = defineModel('dataEditSchedules');
const isShiftOpen = ref(true);
const rulesUser = reactive({
    required: v => fielsRequired(v) || 'Campo obrigatório'
    
});
const saveFormSchedules = () => {
  if(isAnyShiftOpen(dataEditSchedules.value)){
    emit('saveFormSchedules');
    return;

  };
  console.log('definir horarios');

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
        style="width: 70%; max-width: 80%;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">EDITAR HORÁRIOS</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form>
            <div class="form-edit-schedules-inputs">
              <h6 class="q-my-xs">Segunda-feira</h6>
              <div class="row">
                <div class="col q-pa-xs bg-brown-5 rounded-borders">
                  <p class="q-ma-none">Manhã</p>
                  <div class="row">
                    <q-input
                      dark
                      filled
                      class="col q-mx-xs"
                      color="white"
                      bg-color="brown-8"
                      v-model="dataEditSchedules[0]['mon']['morning']['open']"
                      mask="time"
                      label="Abrir"
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
                      label="Fechar"
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
                      label="Abrir"
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
                      label="Fechar"
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
                      label="Abrir"
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
                      label="Fechar"
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
              <h6 class="q-my-xs">Terça-feira</h6>
              <div class="row">
                <div class="col q-pa-xs bg-brown-5 rounded-borders">
                  <p class="q-ma-none">Manhã</p>
                  <div class="row">
                    <q-input
                      dark
                      filled
                      class="col q-mx-xs"
                      color="white"
                      bg-color="brown-8"
                      v-model="dataEditSchedules[1]['tue']['morning']['open']"
                      mask="time"
                      label="Abrir"
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
                      label="Fechar"
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
                      label="Abrir"
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
                      label="Fechar"
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
                      label="Abrir"
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
                      label="Fechar"
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
            <div class="form-edit-schedules-inputs">
              <h6 class="q-my-xs">Quarta-feira</h6>
              <div class="row">
                <div class="col q-pa-xs bg-brown-5 rounded-borders">
                  <p class="q-ma-none">Manhã</p>
                  <div class="row">
                    <q-input
                      dark
                      filled
                      class="col q-mx-xs"
                      color="white"
                      bg-color="brown-8"
                      v-model="dataEditSchedules[2]['wed']['morning']['open']"
                      mask="time"
                      label="Abrir"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time
                              dark
                              format24h 
                              v-model="dataEditSchedules[2]['wed']['morning']['open']"
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
                      v-model="dataEditSchedules[2]['wed']['morning']['close']"
                      mask="time"
                      label="Fechar"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time 
                              dark
                              format24h 
                              v-model="dataEditSchedules[2]['wed']['morning']['close']"
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
                      v-model="dataEditSchedules[2]['wed']['afternoon']['open']"
                      mask="time"
                      label="Abrir"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time
                              dark
                              format24h 
                              v-model="dataEditSchedules[2]['wed']['afternoon']['open']"
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
                      v-model="dataEditSchedules[2]['wed']['afternoon']['close']"
                      mask="time"
                      label="Fechar"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time 
                              dark
                              format24h  
                              v-model="dataEditSchedules[2]['wed']['afternoon']['close']"
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
                      v-model="dataEditSchedules[2]['wed']['night']['open']"
                      mask="time"
                      label="Abrir"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time
                              dark
                              format24h 
                              v-model="dataEditSchedules[2]['wed']['night']['open']"
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
                      v-model="dataEditSchedules[2]['wed']['night']['close']"
                      mask="time"
                      label="Fechar"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time 
                              dark 
                              format24h 
                              v-model="dataEditSchedules[2]['wed']['night']['close']"
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
              <h6 class="q-my-xs">Quinta-feira</h6>
              <div class="row">
                <div class="col q-pa-xs bg-brown-5 rounded-borders">
                  <p class="q-ma-none">Manhã</p>
                  <div class="row">
                    <q-input
                      dark
                      filled
                      class="col q-mx-xs"
                      color="white"
                      bg-color="brown-8"
                      v-model="dataEditSchedules[3]['thu']['morning']['open']"
                      mask="time"
                      label="Abrir"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time
                              dark
                              format24h 
                              v-model="dataEditSchedules[3]['thu']['morning']['open']"
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
                      v-model="dataEditSchedules[3]['thu']['morning']['close']"
                      mask="time"
                      label="Fechar"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time 
                              dark
                              format24h 
                              v-model="dataEditSchedules[3]['thu']['morning']['close']"
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
                      v-model="dataEditSchedules[3]['thu']['afternoon']['open']"
                      mask="time"
                      label="Abrir"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time
                              dark
                              format24h 
                              v-model="dataEditSchedules[3]['thu']['afternoon']['open']"
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
                      v-model="dataEditSchedules[3]['thu']['afternoon']['close']"
                      mask="time"
                      label="Fechar"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time 
                              dark
                              format24h  
                              v-model="dataEditSchedules[3]['thu']['afternoon']['close']"
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
                      v-model="dataEditSchedules[3]['thu']['night']['open']"
                      mask="time"
                      label="Abrir"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time
                              dark
                              format24h 
                              v-model="dataEditSchedules[3]['thu']['night']['open']"
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
                      v-model="dataEditSchedules[3]['thu']['night']['close']"
                      mask="time"
                      label="Fechar"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time 
                              dark 
                              format24h 
                              v-model="dataEditSchedules[3]['thu']['night']['close']"
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
              <h6 class="q-my-xs">Sexta-feira</h6>
              <div class="row">
                <div class="col q-pa-xs bg-brown-5 rounded-borders">
                  <p class="q-ma-none">Manhã</p>
                  <div class="row">
                    <q-input
                      dark
                      filled
                      class="col q-mx-xs"
                      color="white"
                      bg-color="brown-8"
                      v-model="dataEditSchedules[4]['fri']['morning']['open']"
                      mask="time"
                      label="Abrir"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time
                              dark
                              format24h 
                              v-model="dataEditSchedules[4]['fri']['morning']['open']"
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
                      v-model="dataEditSchedules[4]['fri']['morning']['close']"
                      mask="time"
                      label="Fechar"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time 
                              dark
                              format24h 
                              v-model="dataEditSchedules[4]['fri']['morning']['close']"
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
                      v-model="dataEditSchedules[4]['fri']['afternoon']['open']"
                      mask="time"
                      label="Abrir"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time
                              dark
                              format24h 
                              v-model="dataEditSchedules[4]['fri']['afternoon']['open']"
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
                      v-model="dataEditSchedules[4]['fri']['afternoon']['close']"
                      mask="time"
                      label="Fechar"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time 
                              dark
                              format24h  
                              v-model="dataEditSchedules[4]['fri']['afternoon']['close']"
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
                      v-model="dataEditSchedules[4]['fri']['night']['open']"
                      mask="time"
                      label="Abrir"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time
                              dark
                              format24h 
                              v-model="dataEditSchedules[4]['fri']['night']['open']"
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
                      v-model="dataEditSchedules[4]['fri']['night']['close']"
                      mask="time"
                      label="Fechar"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time 
                              dark 
                              format24h 
                              v-model="dataEditSchedules[4]['fri']['night']['close']"
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
              <h6 class="q-my-xs">Sábado</h6>
              <div class="row">
                <div class="col q-pa-xs bg-brown-5 rounded-borders">
                  <p class="q-ma-none">Manhã</p>
                  <div class="row">
                    <q-input
                      dark
                      filled
                      class="col q-mx-xs"
                      color="white"
                      bg-color="brown-8"
                      v-model="dataEditSchedules[5]['sat']['morning']['open']"
                      mask="time"
                      label="Abrir"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time
                              dark
                              format24h 
                              v-model="dataEditSchedules[5]['sat']['morning']['open']"
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
                      v-model="dataEditSchedules[5]['sat']['morning']['close']"
                      mask="time"
                      label="Fechar"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time 
                              dark
                              format24h 
                              v-model="dataEditSchedules[5]['sat']['morning']['close']"
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
                      v-model="dataEditSchedules[5]['sat']['afternoon']['open']"
                      mask="time"
                      label="Abrir"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time
                              dark
                              format24h 
                              v-model="dataEditSchedules[5]['sat']['afternoon']['open']"
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
                      v-model="dataEditSchedules[5]['sat']['afternoon']['close']"
                      mask="time"
                      label="Fechar"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time 
                              dark
                              format24h  
                              v-model="dataEditSchedules[5]['sat']['afternoon']['close']"
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
                      v-model="dataEditSchedules[5]['sat']['night']['open']"
                      mask="time"
                      label="Abrir"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time
                              dark
                              format24h 
                              v-model="dataEditSchedules[5]['sat']['night']['open']"
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
                      v-model="dataEditSchedules[5]['sat']['night']['close']"
                      mask="time"
                      label="Fechar"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time 
                              dark 
                              format24h 
                              v-model="dataEditSchedules[5]['sat']['night']['close']"
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
              <h6 class="q-my-xs">Domingo</h6>
              <div class="row">
                <div class="col q-pa-xs bg-brown-5 rounded-borders">
                  <p class="q-ma-none">Manhã</p>
                  <div class="row">
                    <q-input
                      dark
                      filled
                      class="col q-mx-xs"
                      color="white"
                      bg-color="brown-8"
                      v-model="dataEditSchedules[6]['sun']['morning']['open']"
                      mask="time"
                      label="Abrir"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time
                              dark
                              format24h 
                              v-model="dataEditSchedules[6]['sun']['morning']['open']"
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
                      v-model="dataEditSchedules[6]['sun']['morning']['close']"
                      mask="time"
                      label="Fechar"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time 
                              dark
                              format24h 
                              v-model="dataEditSchedules[6]['sun']['morning']['close']"
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
                      v-model="dataEditSchedules[6]['sun']['afternoon']['open']"
                      mask="time"
                      label="Abrir"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time
                              dark
                              format24h 
                              v-model="dataEditSchedules[6]['sun']['afternoon']['open']"
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
                      v-model="dataEditSchedules[6]['sun']['afternoon']['close']"
                      mask="time"
                      label="Fechar"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time 
                              dark
                              format24h  
                              v-model="dataEditSchedules[6]['sun']['afternoon']['close']"
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
                      v-model="dataEditSchedules[6]['sun']['night']['open']"
                      mask="time"
                      label="Abrir"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time
                              dark
                              format24h 
                              v-model="dataEditSchedules[6]['sun']['night']['open']"
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
                      v-model="dataEditSchedules[6]['sun']['night']['close']"
                      mask="time"
                      label="Fechar"
                      :rules="['time']" >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer" color="white">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time 
                              dark 
                              format24h 
                              v-model="dataEditSchedules[6]['sun']['night']['close']"
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
              push
              @click="saveFormSchedules"
              class="q-my-xl full-width"
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