<script setup>
import { reactive, ref, watch } from 'vue';

const props = defineProps(['time', 'isAvailable', 'isReserved']);
const timeCheck = defineModel('timeCheck');
const isHovered = ref(false);

const verifyReservationColorBg = (data, time) =>{
  if(data){
    return 'red-8';

  }
  if(!data && time == timeCheck.value){
    return 'grey-8';

  };
  if(!data && time != timeCheck.value){
    return 'green-8';

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
        :color="(isHovered && !props.isReserved) ? 'grey-2' : verifyReservationColorBg(props.isReserved, props.time)"
        :text-color="(isHovered && !props.isReserved) ? 'grey-8' : 'grey-2'">
        {{ props.time }}
        <q-icon
          v-if="(timeCheck == props.time && !props.isReserved)" 
          class="icon-check" 
          size="1.1rem" 
          name="done_outline" 
          color="green-5" />
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