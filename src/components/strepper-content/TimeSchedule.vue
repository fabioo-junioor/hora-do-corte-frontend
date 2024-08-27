<script setup>
const props = defineProps(['time', 'isAvailable']);
const timeCheck = defineModel('timeCheck');

</script>
<template>
  <div id="time-schedules">
    <q-badge
        class="q-py-xs q-px-sm text-h6"
        :color="(props.isAvailable && (timeCheck != props.time)) ? 'green-8' : 'grey-5'"
        :text-color="(props.isAvailable && (timeCheck != props.time)) ? 'white' : 'grey-10'">
        {{ props.time }}
    </q-badge>
  </div>
</template>
<style lang="scss" scoped>
#time-schedules{
  .q-badge{
    cursor: pointer;

    &:hover{
      background-color: $brown-5 !important;

    }
  }
}
</style>