<script setup>
import { reactive } from 'vue';
import { CardReservation, CardReservationBack } from '../../components';

const selectedId = reactive([]);
const dataCustomerReservation = reactive([
    { 
        id: 1,
        image: null,
        name: 'Fabio',
        professional: 'Sousa',
        week: 'sun',
        date: '01/10/2025',
        time: '10:00',
        price: '20',
        services: ['corte', 'barba', 'pezin']
    },
    {
        id: 2,
        image: null,
        name: 'Maria',
        professional: 'Sousa',
        week: 'fri',
        date: '15/10/2025',
        time: '15:30',
        price: '50',
        services: ['depilação']
    },
    {
        id: 3,
        image: null,
        name: 'Maria',
        professional: 'Sousa',
        week: 'sun',
        date: '15/10/2025',
        time: '15:30',
        price: '150',
        services: ['depilação']
    }
]);
const cancelReservation = (data) => {
    console.log(data);

};
const orderByDate = (array) => {
    return array.sort((a, b) => {
        const dataA = new Date(a.date.split('/').reverse().join('-'));
        const dataB = new Date(b.date.split('/').reverse().join('-'));
        return dataA - dataB;
    });
};
const getId = (id) => {
    for(let i in selectedId){
        if(selectedId[i] === id){
            return false;

        }
    }
    selectedId.push(id);
    return true;
};
const groupByDate = (array, date) => {
   
    return array;
}
</script>
<template>
    <div id="reservations">
        <CardReservationBack
            v-for="i in orderByDate(dataCustomerReservation)" :key="i"
            :dateTime='i.date'>
            <CardReservation
                v-for="j in groupByDate(dataCustomerReservation, i.date)" :key="j"
                :dataCustomerReservation='j'
                @cancelReservation='cancelReservation' />
        </CardReservationBack>
    </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

</style>