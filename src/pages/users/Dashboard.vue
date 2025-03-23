<script setup>
import { onBeforeMount, reactive, ref } from "vue";
import { MonthReservations, WeekReservations, BestProfessional, CardContent, CardStatusAccount } from '../../components';
import { numberRandom, mainColors } from '../../utils/dataUtils.js';

const dataStatusUser = reactive({
    pkUser: 1,
    purchaseDate: '23-03-2025',
    purchaseTime: '12:00',
    namePlan: 'Basic',
    pricePlan: '25',
    purchaseValidity: '22-04-2025'
})
const dataCardTop = reactive([
    {title: 'Reservas do dia!', value: '20', icon: 'bx bx-user-check', color: 'blue-9'},
    {title: 'Reservas do mês!', value: '300', icon: 'bx bx-chart', color: 'red-9'},
    {title: 'Faturamento total!', value: '10000', icon: 'bx bx-dollar', color: 'orange-9'},
    {title: 'Total de reservas!', value: '5000', icon: 'bx bx-group', color: 'green-9'}
]);
const dataChartWeek = reactive({
    title: 'Reservas na semana!',
    legend: 'Total de reservas a cada dia!',
    txtColor: '#EEEEEE',
    dataChart: [40, 15, 4, 55, 7, 40, 15],
    icon: 'bx bx-line-chart'
});
const dataChartMonth = reactive({
    title: 'Reservas no ano!',
    legend: 'Total de reservas a cada mês!',
    txtColor: '#EEEEEE',
    dataChart: [40, 0, 4, 55, 7, 40, 15, 70, 5, 13, 100, 2],
    icon: 'bx bx-line-chart'
});
const dataChartBestProfessional = reactive({
    title: 'Profissionais da semana!',
    legend: 'Total de reservas por profissional!',
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
onBeforeMount(() => {
    dataChartBestProfessional.color.push(sortColor().color);
    dataChartBestProfessional.color.push(sortColor().color);
    dataChartBestProfessional.dataChart.push(10, 25);
    dataChartBestProfessional.professionals.push('João', 'Maria');
    
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
    <div class="dashboard-data-status-account q-px-md q-pt-md">
        <CardStatusAccount
            :purchaseDate='dataStatusUser.purchaseDate'
            :purchaseTime='dataStatusUser.purchaseTime'
            :namePlan='dataStatusUser.namePlan'
            :pricePlan='dataStatusUser.pricePlan'
            :purchaseValidity="dataStatusUser.purchaseValidity" />
    </div>
    <div class="dashboard-data-charts q-px-md q-py-xl">
        <div class="">
            <MonthReservations
                class="dashboard-data-charts-chart"
                :title='dataChartMonth.title'
                :legend='dataChartMonth.legend'
                :txtColor='dataChartMonth.txtColor'
                :dataChart='dataChartMonth.dataChart'
                :icon='dataChartMonth.icon' />
        </div>
        <div class="">
            <WeekReservations
                class="dashboard-data-charts-chart"
                :title='dataChartWeek.title'
                :legend='dataChartWeek.legend'
                :txtColor='dataChartWeek.txtColor'
                :dataChart='dataChartWeek.dataChart'
                :icon='dataChartWeek.icon' />
        </div>
        <div class="">
            <BestProfessional
                class="dashboard-data-charts-chart"
                :title="dataChartBestProfessional.title"
                :legend='dataChartBestProfessional.legend'
                :textColor='dataChartBestProfessional.textColor'
                :color='dataChartBestProfessional.color'
                :dataChart='dataChartBestProfessional.dataChart'
                :professionals='dataChartBestProfessional.professionals'
                :icon='dataChartBestProfessional.icon' />
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
    gap: .5rem;

    div{
        .dashboard-data-charts-chart{
            border: 1px solid rgba(0, 0, 0, .3);
            border-radius: 5px;
            box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, .2);
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