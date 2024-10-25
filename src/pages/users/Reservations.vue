<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { CardReservation } from '../../components';
import { getReservation, deleteReservation } from '../../services/api/api.reservation.js';
import { getDataUser } from '../../services/storage/settingSession.js';

const store = useStore();
const dataCustomerReservation = reactive([]);

const cancelReservation = async (pkReservation) => {
    let dataReservaions = await deleteReservation(pkReservation);
    if(dataReservaions.statusCode !== 200){
        store.commit('setAlertConfig', {message: dataReservaions.message, type: 'warning'});
        return;

    };
    store.commit('setAlertConfig', {message: dataReservaions.message, type: 'positive'});
    reloadPage();
    return;

};
const orderbyDate = (array) => {
    return array.sort((a, b) => {
        const dataA = new Date(a.dateReservation.split('-').reverse().join('-'));
        const dataB = new Date(b.dateReservation.split('-').reverse().join('-'));
        
        return dataA - dataB;
    });
};
const groupByDate = (array) => {
    return array.reduce((grupo, item) => {
        (grupo[item.dateReservation] = grupo[item.dateReservation] || []).push(item);
        
        return grupo;

    }, {});
};
const getReservations = async () =>{
    let dataUser = getDataUser();
    let dataReservaions = await getReservation(dataUser.pkUser);
    if(dataReservaions.statusCode === 200 & dataReservaions.data.length === 0){
        return;

    };
    if(dataReservaions.statusCode === 200 & dataReservaions.data.length !== 0){
        dataCustomerReservation.push(...dataReservaions.data);
        return;

    };
};
const reloadPage = () => {
    setTimeout(() => {
        location.reload();

    }, 3000);

};
onMounted( async () => {
    await getReservations();

});
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