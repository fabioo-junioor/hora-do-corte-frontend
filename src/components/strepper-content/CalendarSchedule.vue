<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { verifySchedulesAvailable, sumTimeService } from '../../utils/formatters.js';
import { getDateToday } from '../../utils/dataUtils.js';
import { TimeSchedule } from '../../components';
const props = defineProps(['schedules', 'timesAvailable', 'durationInterval']);
const emit = defineEmits(['checkScheduleDate', 'checkScheduleTime']);
const isLoaderTimes = defineModel('isLoaderTimes');

const splitterModel = ref(40);
const date = ref(null);
const timeCheck = ref('');
const isResolution = ref(false);
const options = reactive([]);
const myLocale = reactive({
    days: 'Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sábado'.split('_'),
    daysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
    months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
    monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
    firstDayOfWeek: 0,
    format24h: true,
    pluralDay: 'dias'
});
const verifySchedules = () => {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    day = (day < 10) ? `0${day}` : `${day}`;

    for(let i = 1; i <= 12; i++){
        for(let j = 1; j <= 31; j++){
            if(j < 10 && i < 10){
                if(verifySchedulesAvailable(`${year}/0${i}/0${j}`, props.schedules) && `${year}/0${i}/0${j}` >= `${year}/0${month}/${day}`){
                    options.push(`${year}/0${i}/0${j}`);
    
                };
            };
            if(j < 10 && i >= 10){
                if(verifySchedulesAvailable(`${year}/${i}/0${j}`, props.schedules) && `${year}/${i}/0${j}` >= `${year}/${month}/${day}`){
                    options.push(`${year}/${i}/0${j}`);
                    
                };
            };
            if(j >= 10 && i < 10){
                if(verifySchedulesAvailable(`${year}/0${i}/${j}`, props.schedules) && `${year}/0${i}/${j}` >= `${year}/0${month}/${day}`){
                    options.push(`${year}/0${i}/${j}`);
                    
                };
            };
            if(j >= 10 && i >= 10){
                if(verifySchedulesAvailable(`${year}/${i}/${j}`, props.schedules) && `${year}/${i}/${j}` >= `${year}/${month}/${day}`){
                    options.push(`${year}/${i}/${j}`);
    
                };
            };
        }
    };
};
const checkScheduleTime = (data) => {
    if(!data){
        timeCheck.value = data.time;
        emit('checkScheduleTime', '');
        return true;

    };
    if(!data?.isReserved){
        timeCheck.value = data.time;
        emit('checkScheduleTime', data.time);
        return true;

    };
    return false;

};
const checkDateExists = (dateReservation, schedule) => {
    let parts = dateReservation.split('-');
    dateReservation = new Date(parts[2], parts[1] - 1, parts[0]);
    let newFormatDate = `${parts[2]}/${parts[1]}/${parts[0]}`;

    return verifySchedulesAvailable(newFormatDate, schedule);
    
};
const verifyTimeBeforeToday = (timeSchedule) => {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();

    if(date.value == getDateToday()){
        if(timeSchedule <= `${hours}:${minutes}`){
            return false;

        }
        return true;

    }
    return true;

};
window.addEventListener("resize", () => {
  const viewportWidth = window.innerWidth;
  
  if(viewportWidth <= 720){
    isResolution.value = true;
    return;

  };
  isResolution.value = false;
  return;

});
watch(date, () => {
    emit('checkScheduleDate', date.value);
    checkScheduleTime('');

});
onMounted(() => {
    date.value = getDateToday();
    verifySchedules();

});
</script>
<template>
  <div id="calendar-schedules">
    <q-splitter
        :horizontal="isResolution"
        v-model="splitterModel"
        :limits="[50, 50]"
        separator-class="bg-white"
        separator-style="width: 2px;">
        <template v-slot:before>
            <q-date
                dark
                bordered
                style="width: 100%"
                color="brown-10"
                text-color="white"
                today-btn
                v-model="date"
                :options="options"
                mask="DD-MM-YYYY"
                :locale="myLocale" />
        </template>
        <template v-slot:separator>
            <q-avatar color="brown-10" text-color="white" size="2rem" icon="drag_indicator" />
        </template>
        <template v-slot:after>
            <q-tab-panels
                class="bg-brown-10 text-white"
                style="width: 100%"
                v-model="date"
                animated
                transition-prev="jump-up"
                transition-next="jump-up">
                <q-tab-panel :name="date">
                    <div class="text-h4 text-center">{{ date }}</div>
                    <q-separator class="q-my-md" color="white" />
                    <div v-if="!props.isLoaderTimes" 
                        class="calendar-schedules-times">
                        <slot />
                    </div>
                    <div v-if="!!props.isLoaderTimes"
                        class="calendar-schedules-times">
                        <div v-if="checkDateExists(date, props.schedules)"
                            class="calendar-schedules-times">
                            <TimeSchedule
                                @click="!verifyTimeBeforeToday(i) || checkScheduleTime(i)"
                                v-for='i in props.timesAvailable' :key='i'
                                :time="{start: i.time, end: sumTimeService(i.time, props.durationInterval)}"
                                v-model:timeCheck='timeCheck'
                                :isAvailable='verifyTimeBeforeToday(i.time)'
                                :isReserved='i.isReserved' />
                        </div>
                        <div v-else>Essa data não contem horários!</div>
                    </div>
                </q-tab-panel>
            </q-tab-panels>    
        </template>  
    </q-splitter>
  </div>
</template>
<style lang="scss" scoped>
#calendar-schedules{
    width: 100%;
    
    .calendar-schedules-times{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: .5rem;

    }
    .q-date, .q-tab-panels{
        border-radius: 5px;
        
    }
}
</style>