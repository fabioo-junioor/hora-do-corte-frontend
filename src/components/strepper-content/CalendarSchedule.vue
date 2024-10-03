<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { verifySchedulesAvailable, getDateToday } from '../../utils/formatters.js';
import { TimeSchedule } from '../../components';
const props = defineProps(['schedules', 'timesAvailable']);
const emit = defineEmits(['checkScheduleDate', 'checkScheduleTime']);

const splitterModel = ref(40);
const date = ref(null);
const timeCheck = ref('');
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
    
    for(let i = 1; i <= 31; i++){
        if(i < 10 && month < 10){
            if(verifySchedulesAvailable(`${year}/0${month}/0${i}`, props.schedules) && `${year}/0${month}/0${i}` >= `${year}/0${month}/${day}`){
                options.push(`${year}/0${month}/0${i}`);

            }
        }
        if(i < 10 && month >= 10){
            if(verifySchedulesAvailable(`${year}/${month}/0${i}`, props.schedules) && `${year}/${month}/0${i}` >= `${year}/${month}/${day}`){
                options.push(`${year}/${month}/0${i}`);

            }
        }
        if(i >= 10 && month < 10){
            if(verifySchedulesAvailable(`${year}/0${month}/${i}`, props.schedules) && `${year}/0${month}/${i}` >= `${year}/0${month}/${day}`){
                options.push(`${year}/0${month}/${i}`);
                
            }
        }
        if(i >= 10 && month >= 10){
            if(verifySchedulesAvailable(`${year}/${month}/${i}`, props.schedules) && `${year}/${month}/${i}` >= `${year}/${month}/${day}`){
                options.push(`${year}/${month}/${i}`);

            }
        }
    }
};
const checkScheduleTime = (data) => {
    timeCheck.value = data;
    emit('checkScheduleTime', data);

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
        v-model="splitterModel"
        :limits="[40, 50]"
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
                    <div class="calendar-schedules-times">
                        <TimeSchedule
                            @click="!verifyTimeBeforeToday(i) || checkScheduleTime(i)"
                            v-for='i in props.timesAvailable' :key='i'
                            :time='i'
                            v-model:timeCheck='timeCheck'
                            :isAvailable='verifyTimeBeforeToday(i)' />
                    </div>
                </q-tab-panel>
            </q-tab-panels>    
        </template>  
    </q-splitter>
  </div>
</template>
<style lang="scss" scoped>
#calendar-schedules{
    width: 70%;
    
    .calendar-schedules-times{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: .5rem;

    }
    .q-date, .q-tab-panels{
        border-radius: 5px;
        
    }
}
</style>