<script setup>
const props = defineProps(['loaderColor', 'loaderSize']);

</script>
<template>
    <div id="loader">
        <q-spinner-hourglass
            :color="!!props.loaderColor ? props.loaderColor : 'brown-10'"
            :size="!!props.loaderSize ? props.loaderSize : '5em'" />
    </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");
</style>