<script setup>
import { onBeforeMount, onMounted, reactive, ref, watch } from "vue";
import { MonthReservations, WeekReservations, BestProfessional, CardContent, CardStatusAccount, SkeletonCharts, SkeletonStatus } from '../../components';
import { getStatsReservations, getLastPurchasePlan, getBestProfessionals } from '../../services/api/api.dashboard.js';
import { numberRandom, mainColors, getDateToday, checkDaysUntilDate } from '../../utils/dataUtils.js';
import { getDataUser } from '../../services/storage/settingSession.js';

const isDataChartWeek = ref(false);
const isDataChartMonth = ref(false);
const isDataChartBestProfesional = ref(false);
const isDataStatusPlan = ref(false);
const dataReservations = reactive([]);
const dataPurchasePlan = reactive([]);
const dataBestProfessionals = reactive([]);
const dataStatusPlan = reactive({
    pkUser: null,
    purchaseDate: '',
    purchaseTime: '',
    namePlan: '',
    pricePlan: '',
    purchaseValidity: '',
    closeToExpiration: false
})
const dataCardTop = reactive([
    {title: 'Reservas do dia!', value: 0, icon: 'bx bx-user-check', color: 'blue-9'},
    {title: 'Reservas do mês!', value: 0, icon: 'bx bx-chart', color: 'red-9'},
    {title: 'Faturamento total!', value: 0, icon: 'bx bx-dollar', color: 'orange-9'},
    {title: 'Total de reservas!', value: 0, icon: 'bx bx-group', color: 'green-9'}
]);
const dataChartWeek = reactive({
    title: 'Reservas na semana!',
    legend: 'Total de reservas a cada dia!',
    txtColor: '#EEEEEE',
    dataChart: Array(7).fill(0),
    icon: 'bx bx-line-chart'
});
const dataChartMonth = reactive({
    title: 'Reservas no ano!',
    legend: 'Total de reservas a cada mês!',
    txtColor: '#EEEEEE',
    dataChart: Array(12).fill(0),
    icon: 'bx bx-line-chart'
});
const dataChartBestProfessional = reactive({
    title: 'Profissionais do mês!',
    legend: 'Profissionais com mais reservas!',
    txtColor: '#EEEEEE',
    color: [],
    dataChart: [],
    professionals: [],
    icon: 'bx bx-bar-chart-alt-2'
});
const sortColor = () => {
    let numberRandomColor = numberRandom(mainColors.length);
    let jsonColors = { color: mainColors[numberRandomColor].color, textColor: mainColors[numberRandomColor].colorContrast };
    return jsonColors;

};
const statsReservations = async (data) => {
    let today = getDateToday();
    let month = (new Date()).getMonth() + 1;
    month = (month < 10) ? `0${month}` : `${month}`;
    
    data.filter((elem) => {
        if(elem.dateReservation == today){
            dataCardTop[0].value += 1;

        };
        let monthReservation = (elem.dateReservation).split('-');
        monthReservation = monthReservation[1];
        if(monthReservation == month){
            dataCardTop[1].value += 1;

        };
        dataCardTop[2].value += Number(elem.price);
        dataCardTop[3].value += 1;

    });
};
const statsReservationsWeek = async (data) => {
    let today = new Date();
    let firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - (today.getDate() === 0 ? 6 : today.getDay() - 1));
    firstDayOfWeek.setHours(0, 0, 0, 0);
    let lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

    data.forEach(elem => {
        let [day, month, year] = elem.dateReservation.split('-').map(Number);
        let date = new Date(year, month - 1, day);
        date.setHours(0, 0, 0, 0);

        if(date >= firstDayOfWeek && date <= lastDayOfWeek){
            let weekDay = (date.getDay() === 0 ? 6 : date.getDay() - 1);
            dataChartWeek.dataChart[weekDay]++;

        };
    });
    //isDataChartWeek.value = true;

};
const statsReservationsMonth = async (data) => {
    data.forEach(elem => {
        let reservation = new Date(elem.dateReservation.split('-').reverse().join('-'));
        let month = reservation.getMonth();
        dataChartMonth.dataChart[month]++;

    });
    //isDataChartMonth.value = true;

};
const bestProfessionals = async (data) => {
    data.filter((elem) => {
        dataChartBestProfessional.color.push(sortColor().color);
        dataChartBestProfessional.dataChart.push(elem.total);
        dataChartBestProfessional.professionals.push(elem.name);

    });
    //isDataChartBestProfesional.value = true;

};
const lastPurchasePlan = async (data) => {
    dataStatusPlan.pkUser = data[0].fkUser;
    dataStatusPlan.purchaseDate = data[0].purchaseDate;
    dataStatusPlan.purchaseTime = data[0].purchaseTime;
    dataStatusPlan.namePlan = data[0].namePlan;
    dataStatusPlan.pricePlan = data[0].pricePlan;
    dataStatusPlan.purchaseValidity = data[0].purchaseValidity;
    dataStatusPlan.closeToExpiration = checkDaysUntilDate(data[0].purchaseValidity, data[0].purchaseTime, 5);
    //isDataStatusPlan.value = true;
    
};
onMounted(async () => {
    let dataUser = getDataUser();
    let dataStats = await getStatsReservations(dataUser?.pkUser);
    if(dataStats?.statusCode == 200 && dataStats?.data.length !== 0){
        await statsReservations(dataStats?.data);
        await statsReservationsMonth(dataStats?.data);
        await statsReservationsWeek(dataStats?.data);

    };
    isDataChartWeek.value = true;
    isDataChartMonth.value = true; 
    
    let lastPurchase = await getLastPurchasePlan(dataUser?.pkUser);
    if(lastPurchase?.statusCode === 200 && lastPurchase?.data.length !== 0){
        await lastPurchasePlan(lastPurchase?.data);

    };
    isDataStatusPlan.value = true;

    let bestProfessional = await getBestProfessionals(dataUser?.pkUser);
    if(bestProfessional?.statusCode === 200 && bestProfessional?.data.length !== 0){
        await bestProfessionals(bestProfessional?.data);
        
    };
    isDataChartBestProfesional.value = true;

});
</script>
<template>
  <div id="dashboard">
    <div class="dashboard-data-top q-pa-md">
        <CardContent
            v-for="i in dataCardTop" :key="i"
            class="dashboard-data-top-card"
            :title='i.title'
            :value='i.value'
            :icon='i.icon'
            :color="i.color" />
    </div>
    <div class="dashboard-data-charts q-px-md q-py-xl">
        <div class="dashboard-data-charts-status-account">
            <CardStatusAccount
                v-if="isDataStatusPlan"
                :purchaseDate='dataStatusPlan.purchaseDate'
                :purchaseTime='dataStatusPlan.purchaseTime'
                :namePlan='dataStatusPlan.namePlan'
                :pricePlan='dataStatusPlan.pricePlan'
                :purchaseValidity="dataStatusPlan.purchaseValidity"
                :closeToExpiration='dataStatusPlan.closeToExpiration' />
            <SkeletonStatus
                v-else />
        </div>
        <div class="">
            <WeekReservations
                v-if="isDataChartWeek"
                class="dashboard-data-charts-chart"
                :title='dataChartWeek.title'
                :legend='dataChartWeek.legend'
                :txtColor='dataChartWeek.txtColor'
                :dataChart='dataChartWeek.dataChart'
                :icon='dataChartWeek.icon' />
            <SkeletonCharts
                v-else />
        </div>
        <div class="">
            <MonthReservations
                v-if="isDataChartMonth"
                class="dashboard-data-charts-chart"
                :title='dataChartMonth.title'
                :legend='dataChartMonth.legend'
                :txtColor='dataChartMonth.txtColor'
                :dataChart='dataChartMonth.dataChart'
                :icon='dataChartMonth.icon' />
            <SkeletonCharts
                v-else />
        </div>
        <div class="">
            <BestProfessional
                v-if="isDataChartBestProfesional"
                class="dashboard-data-charts-chart"
                :title="dataChartBestProfessional.title"
                :legend='dataChartBestProfessional.legend'
                :textColor='dataChartBestProfessional.textColor'
                :color='dataChartBestProfessional.color'
                :dataChart='dataChartBestProfessional.dataChart'
                :professionals='dataChartBestProfessional.professionals'
                :icon='dataChartBestProfessional.icon' />
            <SkeletonCharts
                v-else />
        </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#dashboard {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 5rem);
  font-family: "Fredoka", sans-serif;

  .dashboard-data-top{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #EEEEEE;
    gap: 1rem;

    .dashboard-data-top-card{
        width: 22%;

    }
  }
  .dashboard-data-charts{
    display: grid;
    grid-template-columns: repeat(3, 33%);
    justify-content: center;
    gap: .8rem;

    div{
        .dashboard-data-charts-chart{
            border: 1px solid #EEEEEEA6;
            box-shadow: 2px 2px 0px 0px #EEEEEE;
            border-radius: 5px;
            width: 100%;

        }
    }
  }
}

/* Breakpoints - response*/
@media only screen and (max-width: 1560px) {
}
@media only screen and (max-width: 1200px) {
}
@media only screen and (max-width: 992px) {
    #dashboard {
        .dashboard-data-top{
            flex-direction: column;
            gap: .5rem;
            padding: .5rem;

            .dashboard-data-top-card{
                width: 100%;

            }
        }
        .dashboard-data-charts{
            padding: 1rem .5rem;
            grid-template-columns: repeat(2, 50%);

        }
    }
}
@media only screen and (max-width: 720px) {
    #dashboard {
        .dashboard-data-charts{
            grid-template-columns: repeat(1, 98%);

        }
    }
}
@media only screen and (max-width: 481px) {
}
@media only screen and (max-width: 360px) {
}
</style>