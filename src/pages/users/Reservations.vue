<script setup>
import { reactive } from 'vue';
import { CardReservation } from '../../components';

const dataCustomerReservation = reactive([
    { 
        id: 1,
        name: 'Fabio',
        phone: '(55) 1234 - 55556',
        email: 'fabio@bol.com',
        professional: 'Sousa',
        week: 'sun',
        date: '01/10/2025',
        time: '10:00',
        price: '20',
        services: ['corte', 'barba', 'pezin'],
        observation: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
        id: 2,
        name: 'Maria',
        phone: '(55) 1234 - 11556',
        email: '',
        professional: 'Sousa',
        week: 'fri',
        date: '15/10/2025',
        time: '15:30',
        price: '50',
        services: ['depilação'],
        observation: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
        id: 3,
        name: 'Carla',
        phone: '(15) 1234 - 55556',
        email: 'maria@hotmail.com',
        professional: 'Sousa',
        week: 'sun',
        date: '15/10/2025',
        time: '15:30',
        price: '150',
        services: ['depilação'],
        observation: ''
    }
]);
const cancelReservation = (data) => {
    console.log(data);

};
const orderbyDate = (array) => {
    return array.sort((a, b) => {
        const dataA = new Date(a.date.split('/').reverse().join('-'));
        const dataB = new Date(b.date.split('/').reverse().join('-'));
        
        return dataA - dataB;
    });
};
const groupByDate = (array) => {
    return array.reduce((grupo, item) => {
        (grupo[item.date] = grupo[item.date] || []).push(item);
        
        return grupo;

    }, {});
};
</script>
<template>
    <div id="reservations" class="column items-center q-mt-md">
        <h4 class="text-white q-my-lg">Lista de agendamentos</h4>
        <CardReservation
            v-for="i in groupByDate(orderbyDate(dataCustomerReservation))" :key="i"
            :dataCustomerReservation='i'
            @cancelReservation='cancelReservation' />
    </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

</style>