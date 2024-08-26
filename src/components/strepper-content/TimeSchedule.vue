<script setup>
const props = defineProps(['time', 'isAvailable']);

</script>
<template>
  <div id="time-schedules">
    <q-badge
        class="q-ma-xs q-py-xs q-px-sm text-h6"
        :color="props.isAvailable ? 'green' : 'grey'"
        :text-color="props.isAvailable ? 'white' : 'black'">
        {{ props.time }}
    </q-badge>
  </div>
</template>
<style lang="scss" scoped>
#time-schedules{

}
</style>