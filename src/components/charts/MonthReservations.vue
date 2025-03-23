<script setup>
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';
const props = defineProps(['title', 'legend', 'txtColor', 'dataChart', 'icon']);

const config = {
    type: 'line',
    data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [{
                label: props.legend || 'Legenda',
                data: props.dataChart,
                borderWidth: 2,
                borderColor: props.txtColor || 'white',
                backgroundColor: props.txtColor || 'white'
        }]
    },
    options: {
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: props.txtColor || 'white'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: props.txtColor || 'white'
                },
                grid: {
                    color: (props.txtColor || '#eeeeee') + '50'
                },
                beginAtZero: true
            },
            y: {
                ticks: {
                    color: props.txtColor || 'white'
                },
                grid: {
                    color: (props.txtColor || '#eeeeee') + '50'
                },
                beginAtZero: true
            }
        }
    }
}
onMounted(() => {
    const ctx = document.getElementById('myChartMonth');
    new Chart(ctx, config);

})
</script>
<template>
  <div id="chart-month-reservations">
    <div class="chart-month-reservations q-pa-md">
        <h5 class="q-pb-md" :style="'color:' + (props.txtColor || '#eeeeee')">
            <i :class="props.icon" />
            <q-separator class="q-ml-sm q-mr-sm" vertical size="1px" :style="'background-color:' + (props.txtColor || '#eeeeee')" />
            {{ props. title }}
        </h5>
        <canvas id="myChartMonth"></canvas>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#chart-month-reservations{
    .chart-month-reservations{
        h5{
            display: flex;
            align-items: center;

            i{
                font-size: 2.5rem;

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
}
@media only screen and (max-width: 720px) {
}
@media only screen and (max-width: 481px) {
}
@media only screen and (max-width: 360px) {
}
</style>