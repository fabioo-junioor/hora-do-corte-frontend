<script setup>
const props = defineProps(['loaderColor']);

</script>
<template>
    <div id="loader">
        <q-spinner-hourglass
            :color="!!props.loaderColor ? props.loaderColor : 'brown-10'"
            size="5em" />
    </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");
</style>