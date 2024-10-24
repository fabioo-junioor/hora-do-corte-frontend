<script setup>
import { reactive, ref, watch } from 'vue';

const props = defineProps(['time', 'isAvailable', 'isReserved']);
const timeCheck = defineModel('timeCheck');
const isHovered = ref(false);

const verifyReservationColorBg = (data, time) =>{
  if(data){
    return 'red';

  }
  if(!data && time == timeCheck.value){
    return 'grey';

  };
  if(!data && time != timeCheck.value){
    return 'green';

  }
};
</script>
<template>
  <div id="time-schedules">
    <q-badge
        :style="'cursor: '+ (!props.isReserved ? 'pointer' : 'not-allowed')"
        class="q-py-xs q-px-sm text-h6"
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
        :color="verifyReservationColorBg(props.isReserved, props.time)"
        text-color="white">
        {{ props.time }}
        <q-icon
          v-if="(timeCheck == props.time && !props.isReserved)" 
          class="icon-check" 
          size="1.1rem" 
          name="done_outline" 
          color="white" />
    </q-badge>
  </div>
</template>
<style lang="scss" scoped>
#time-schedules{
  .q-badge{
    position: relative;

    .icon-check{
      position: absolute;
      right: -5px;
      top: -5px;
    }
  }
}
</style>