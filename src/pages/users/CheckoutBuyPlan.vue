<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { getDateToday, getCurrentTime } from '../../utils/dataUtils.js';

const store = useStore();

const checkoutVerify = () => {
    if(!store.getters.getStateBuyPlan.pkPlan || !store.getters.getStateBuyPlan.pkUser){
        console.log('algo deu errado!');
        return;

    }
    let { pkPlan, pkUser, details } = store.getters.getStateBuyPlan;
    let dateToday = getDateToday();
    let timeToday = getCurrentTime();
    console.log(details[0].benefits);
    
};
onMounted(() => {
    checkoutVerify();

});
</script>
<template>
  <div id="checkout-buy-plan">
    page checkout
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

</style>