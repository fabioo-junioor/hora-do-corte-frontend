<script setup>
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';
const props = defineProps(['title', 'legend', 'txtColor', 'color', 'dataChart', 'professionals', 'icon']);

const config = {
    type: 'bar',
    data: {
        labels: props.professionals,
        datasets: [{
                label: props.legend || 'Legenda!',
                data: props.dataChart,
                borderWidth: 2,
                backgroundColor: props.color.map((elem) => {
                    return (elem.slice(0, -2)) + '50';

                }),
                borderColor: props.color.map((elem) => {
                    return elem.slice(0, -2);

                })
        }]
    },
    options: {
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: props.txtColor || 'white',
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
    const ctx = document.getElementById('myChartBestProfessional');
    new Chart(ctx, config);

})
</script>
<template>
  <div id="chart-best-professional">
    <div class="chart-best-professional q-pa-md">
        <h5 class="q-pb-md" :style="'color:' + (props.txtColor || '#eeeeee')">
            <i :class="props.icon" />
            <q-separator class="q-ml-sm q-mr-sm" vertical size="1px" :style="'background-color:' + (props.txtColor || '#eeeeee')" />
            {{ props. title }}
        </h5>
        <canvas id="myChartBestProfessional"></canvas>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#chart-best-professional{
    .chart-best-professional{
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