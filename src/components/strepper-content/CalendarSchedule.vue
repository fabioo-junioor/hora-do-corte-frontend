<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { TimeSchedule } from '../../components';
import { dividirHorariosEmIntervalos } from '../../utils/dataTests.js';
import { verifySchedulesAvailable, getDateToday } from '../../utils/dateTimeFormatters.js';
const props = defineProps(['schedules']);
const emit = defineEmits(['checkScheduleDate']);

const splitterModel = ref(40);
const date = ref(null);
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
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    for(let i = 1; i <= 31; i++){
        if(i < 10 && month < 10){
            if(verifySchedulesAvailable(`${year}/0${month}/0${i}`, props.schedules)){
                options.push(`${year}/0${month}/0${i}`);

            }
        }
        if(i < 10 && month >= 10){
            if(verifySchedulesAvailable(`${year}/${month}/0${i}`, props.schedules)){
                options.push(`${year}/${month}/0${i}`);

            }
        }
        if(i >= 10 && month < 10){
            if(verifySchedulesAvailable(`${year}/0${month}/${i}`, props.schedules)){
                options.push(`${year}/0${month}/${i}`);
                
            }
        }
        if(i >= 10 && month >= 10){
            if(verifySchedulesAvailable(`${year}/${month}/${i}`, props.schedules)){
                options.push(`${year}/${month}/${i}`);

            }
        }
    }
};
watch(date, () => {
    emit('checkScheduleDate', date.value);

})
onMounted(() => {
    date.value = getDateToday();
    verifySchedules();
    console.log(dividirHorariosEmIntervalos(props.schedules))

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
                    <div class="row">
                        <TimeSchedule
                            v-for='i in 15' :key='i'
                            :time='i'
                            :isAvailable='false' />
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
    
    .q-date, .q-tab-panels{
        border-radius: 5px;
        
    }
}
</style>