<script setup>
import { reactive, ref, watch } from 'vue';

const props = defineProps(['time', 'isAvailable']);
const timeCheck = defineModel('timeCheck');
const isHovered = ref(false);

</script>
<template>
  <div id="time-schedules">
    <q-badge
        :style="'background-color: '+ ((isHovered && props.isAvailable) ? 'grey' : '') +' !important;' +
          'color: '+ ((isHovered && props.isAvailable) ? 'black' : '') +' !important;' +
          'cursor: '+ ((isHovered && props.isAvailable) ? 'pointer' : 'not-allowed')"
        class="q-py-xs q-px-sm text-h6"
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
        :color="(props.isAvailable && (timeCheck != props.time)) ? 'green-8' : 'grey-6'"
        :text-color="(props.isAvailable && (timeCheck != props.time)) ? 'white' : 'black'">
        {{ props.time }}
        <q-icon
          v-if="timeCheck == props.time" 
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